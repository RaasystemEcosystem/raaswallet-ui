// src/pages/rabex.js
"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RABEX_ADDRESS = "0x9445E9B6C5696B10a7326ebF4765732aE79F81d2";
const RABEX_ABI = [ /* ABI pasted here */ ];

export default function RabexPage() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [tokenInfo, setTokenInfo] = useState({});
  const [balance, setBalance] = useState("0");

  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  const [approveSpender, setApproveSpender] = useState("");
  const [approveAmount, setApproveAmount] = useState("");
  const [allowanceCheck, setAllowanceCheck] = useState("");
  const [allowanceValue, setAllowanceValue] = useState("");

  useEffect(() => {
    if (window.ethereum) {
      const p = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(p);
    }
  }, []);

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const signerInstance = provider.getSigner();
    const contractInstance = new ethers.Contract(RABEX_ADDRESS, RABEX_ABI, signerInstance);

    setSigner(signerInstance);
    setAccount(accounts[0]);
    setContract(contractInstance);

    const name = await contractInstance.name();
    const symbol = await contractInstance.symbol();
    const decimals = await contractInstance.decimals();
    const totalSupply = await contractInstance.totalSupply();

    setTokenInfo({ name, symbol, decimals, totalSupply: ethers.utils.formatUnits(totalSupply, decimals) });

    const userBalance = await contractInstance.balanceOf(accounts[0]);
    setBalance(ethers.utils.formatUnits(userBalance, decimals));
  };

  const handleTransfer = async () => {
    const tx = await contract.transfer(transferTo, ethers.utils.parseUnits(transferAmount, tokenInfo.decimals));
    await tx.wait();
    alert("Transfer complete.");
  };

  const handleApprove = async () => {
    const tx = await contract.approve(approveSpender, ethers.utils.parseUnits(approveAmount, tokenInfo.decimals));
    await tx.wait();
    alert("Approval successful.");
  };

  const checkAllowance = async () => {
    const allowed = await contract.allowance(account, allowanceCheck);
    setAllowanceValue(ethers.utils.formatUnits(allowed, tokenInfo.decimals));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">RABEX Token Dashboard</h1>

      {!account ? (
        <Button onClick={connectWallet}>Connect Wallet</Button>
      ) : (
        <p className="text-green-600">Connected: {account}</p>
      )}

      {tokenInfo.name && (
        <Card>
          <CardContent className="space-y-2 pt-4">
            <p><strong>Name:</strong> {tokenInfo.name}</p>
            <p><strong>Symbol:</strong> {tokenInfo.symbol}</p>
            <p><strong>Decimals:</strong> {tokenInfo.decimals}</p>
            <p><strong>Total Supply:</strong> {tokenInfo.totalSupply}</p>
            <p><strong>Your Balance:</strong> {balance}</p>
          </CardContent>
        </Card>
      )}

      {/* Transfer */}
      <Card>
        <CardContent className="space-y-4 pt-4">
          <h2 className="font-semibold text-lg">Transfer Tokens</h2>
          <div>
            <Label>To Address</Label>
            <Input value={transferTo} onChange={(e) => setTransferTo(e.target.value)} />
          </div>
          <div>
            <Label>Amount</Label>
            <Input value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} />
          </div>
          <Button onClick={handleTransfer}>Transfer</Button>
        </CardContent>
      </Card>

      {/* Approve */}
      <Card>
        <CardContent className="space-y-4 pt-4">
          <h2 className="font-semibold text-lg">Approve Spender</h2>
          <div>
            <Label>Spender Address</Label>
            <Input value={approveSpender} onChange={(e) => setApproveSpender(e.target.value)} />
          </div>
          <div>
            <Label>Amount</Label>
            <Input value={approveAmount} onChange={(e) => setApproveAmount(e.target.value)} />
          </div>
          <Button onClick={handleApprove}>Approve</Button>
        </CardContent>
      </Card>

      {/* Allowance */}
      <Card>
        <CardContent className="space-y-4 pt-4">
          <h2 className="font-semibold text-lg">Check Allowance</h2>
          <div>
            <Label>Spender Address</Label>
            <Input value={allowanceCheck} onChange={(e) => setAllowanceCheck(e.target.value)} />
          </div>
          <Button onClick={checkAllowance}>Check</Button>
          {allowanceValue && (
            <p><strong>Allowance:</strong> {allowanceValue} {tokenInfo.symbol}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
