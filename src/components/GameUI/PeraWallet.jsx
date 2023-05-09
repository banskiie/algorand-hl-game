import React, { useState, useEffect, useContext } from "react";
import { Button } from "@mui/material";
import { PeraWalletContext } from "../../context/PeraWalletContext";

function PeraWallet() {
  const pera = useContext(PeraWalletContext);
  return (
    <>
      <Button
        variant="contained"
        onClick={
          pera.isConnectedToPeraWallet
            ? pera.handleDisconnectWalletClick
            : pera.handleConnectWalletClick
        }
        sx={{
          marginY: 2,
          backgroundColor: "transparent",
          boxShadow: 0,
          border: "solid 1px yellow",
          color: "yellow",
          font: "inherit",
          fontWeight: 400,
          fill: "yellow",
          ":hover": {
            bgcolor: "yellow",
            color: "#252525",
            border: "solid 1px yellow",
          },
        }}
      >
        {pera.isConnectedToPeraWallet ? "Disconnect" : "Connect to Pera Wallet"}
      </Button>
      <Button
        variant="contained"
        onClick={() => pera.optInToApp()}
        sx={{
          backgroundColor: "transparent",
          boxShadow: 0,
          border: "solid 1px orange",
          color: "orange",
          font: "inherit",
          fontWeight: 400,
          fill: "orange",
          ":hover": {
            bgcolor: "orange",
            color: "#252525",
            border: "solid 1px orange",
          },
        }}
      >
        OPT-IN
      </Button>
    </>
  );
}

export default PeraWallet;
