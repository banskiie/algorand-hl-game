import React, { useState, useEffect, createContext } from "react";
import algosdk, { waitForConfirmation } from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";

const peraWallet = new PeraWalletConnect();
const appIndex = 210614285;
const algod = new algosdk.Algodv2(
  "",
  "https://testnet-api.algonode.cloud",
  443
);

export const PeraWalletContext = createContext({
  handleConnectWalletClick: () => {},
  handleDisconnectWalletClick: () => {},
  optInToApp: () => {},
  checkLocalCounterState: () => {},
  callCounterApplication: () => {},
  isConnectedToPeraWallet: "",
  localCount: 0,
});

function PeraWalletProvider(props) {
  const [localCount, setLocalCount] = useState(null);
  const [accountAddress, setAccountAddress] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress;

  useEffect(() => {
    checkLocalCounterState();
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        peraWallet.connector.on("disconnect", handleDisconnectWalletClick);

        if (accounts.length) {
          setAccountAddress(accounts[0]);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  function handleConnectWalletClick() {
    peraWallet
      .connect()
      .then((newAccounts) => {
        peraWallet.connector.on("disconnect", handleDisconnectWalletClick);

        setAccountAddress(newAccounts[0]);
      })
      .catch((error) => {
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          console.log(error);
        }
      });
  }

  function handleDisconnectWalletClick() {
    peraWallet.disconnect();

    setAccountAddress(null);
  }

  async function optInToApp() {
    const suggestedParams = await algod.getTransactionParams().do();
    const optInTxn = algosdk.makeApplicationOptInTxn(
      accountAddress,
      suggestedParams,
      appIndex
    );

    const optInTxGroup = [{ txn: optInTxn, signers: [accountAddress] }];

    const signedTx = await peraWallet.signTransaction([optInTxGroup]);
    console.log(signedTx);
    const { txId } = await algod.sendRawTransaction(signedTx).do();
    const result = await waitForConfirmation(algod, txId, 2);
  }

  async function checkLocalCounterState() {
    try {
      const accountInfo = await algod
        .accountApplicationInformation(accountAddress, appIndex)
        .do();
      if (!!accountInfo["app-local-state"]["key-value"][0].value.uint) {
        setLocalCount(
          accountInfo["app-local-state"]["key-value"][0].value.uint
        );
      } else {
        setLocalCount(0);
      }
      console.log(accountInfo["app-local-state"]["key-value"][0].value.uint);
    } catch (e) {
      console.error("There was an error connecting to the algorand node: ", e);
    }
  }

  async function callCounterApplication(action) {
    try {
      // get suggested params
      const suggestedParams = await algod.getTransactionParams().do();
      const appArgs = [new Uint8Array(Buffer.from(action))];

      const actionTx = algosdk.makeApplicationNoOpTxn(
        accountAddress,
        suggestedParams,
        appIndex,
        appArgs
      );

      const actionTxGroup = [{ txn: actionTx, signers: [accountAddress] }];

      const signedTx = await peraWallet.signTransaction([actionTxGroup]);
      console.log(signedTx);
      const { txId } = await algod.sendRawTransaction(signedTx).do();
      const result = await waitForConfirmation(algod, txId, 2);
      // checkCounterState();
      checkLocalCounterState();
    } catch (e) {
      console.error(`There was an error calling the counter app: ${e}`);
    }
  }

  return (
    <PeraWalletContext.Provider
      value={{
        handleConnectWalletClick,
        handleDisconnectWalletClick,
        optInToApp,
        checkLocalCounterState,
        callCounterApplication,
        isConnectedToPeraWallet,
        localCount,
      }}
    >
      {props.children}
    </PeraWalletContext.Provider>
  );
}

export default PeraWalletProvider;
