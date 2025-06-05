import { useState } from "react";
import { ethers } from "ethers";
import raaskoinAbi from "../abis/Raaskoin.json";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; // Importing toast from sonner

const CONTRACT_ADDRESS = "0x1f1ddc9ecC8a82267188c699f472B70D599a3055";

export default function RabexDashboard() {
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenInfo, setTokenInfo] = useState({ name: "", balance: null });
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  const [transferData, setTransferData] = useState({ to: "", amount: "" });
  const [approvalData, setApprovalData] = useState({ spender: "", amount: "" });
  const [allowanceCheck, setAllowanceCheck] = useState({ spender: "", result: null });

  // Connect wallet and load token info
  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const userAddress = accounts[0];
      setWalletAddress(userAddress);

      const _provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = _provider.getSigner();
      const _contract = new ethers.Contract(CONTRACT_ADDRESS, raaskoinAbi, signer);

      setProvider(_provider);
      setContract(_contract);

      const name = await _contract.name();
      const decimals = await _contract.decimals();
      const rawBalance = await _contract.balanceOf(userAddress);

      setTokenInfo({ name, balance: ethers.utils.formatUnits(rawBalance, decimals) });
      toast.success("Wallet connected successfully!");
    } catch (err) {
      console.error("Wallet connection failed:", err);
      toast.error("Wallet connection failed.");
    }
  };

  const handleTransfer = async () => {
    if (!contract) return;
    try {
      const decimals = await contract.decimals();
      const tx = await contract.transfer(
        transferData.to,
        ethers.utils.parseUnits(transferData.amount, decimals)
      );
      await tx.wait();
      toast.success("Transfer successful!");
    } catch (err) {
      console.error("Transfer failed:", err);
      toast.error("Transfer failed.");
    }
  };

  const handleApprove = async () => {
    if (!contract) return;
    try {
      const decimals = await contract.decimals();
      const tx = await contract.approve(
        approvalData.spender,
        ethers.utils.parseUnits(approvalData.amount, decimals)
      );
      await tx.wait();
      toast.success("Approval successful!");
    } catch (err) {
      console.error("Approval failed:", err);
      toast.error("Approval failed.");
    }
  };

  const handleCheckAllowance = async () => {
    if (!contract || !walletAddress) return;
    try {
      const decimals = await contract.decimals();
      const result = await contract.allowance(walletAddress, allowanceCheck.spender);
      setAllowanceCheck((prev) => ({
        ...prev,
        result: ethers.utils.formatUnits(result, decimals),
      }));
      toast.success("Allowance checked successfully!");
    } catch (err) {
      console.error("Check allowance failed:", err);
      toast.error("Check failed.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4 md:px-20">
      <h1 className="text-3xl font-bold mb-8 text-center">RABEX Token Dashboard</h1>

      <Card className="mb-8">
        <CardContent className="flex flex-col gap-4">
          <Label className="text-lg">Connect Wallet</Label>
          <Button onClick={connectWallet}>
            {walletAddress ? "Wallet Connected" : "Connect Wallet"}
          </Button>
          {walletAddress && (
            <div className="text-sm text-gray-700">
              <p>Address: {walletAddress}</p>
              <p>
                {tokenInfo.name} Balance: <strong>{tokenInfo.balance}</strong>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="grid gap-4">
          <Label className="text-lg">Transfer Tokens</Label>
          <Input
            placeholder="To Address"
            value={transferData.to}
            onChange={(e) => setTransferData({ ...transferData, to: e.target.value })}
          />
          <Input
            placeholder="Amount"
            type="number"
            value={transferData.amount}
            onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
          />
          <Button onClick={handleTransfer}>Transfer</Button>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="grid gap-4">
          <Label className="text-lg">Approve Spender</Label>
          <Input
            placeholder="Spender Address"
            value={approvalData.spender}
            onChange={(e) => setApprovalData({ ...approvalData, spender: e.target.value })}
          />
          <Input
            placeholder="Amount"
            type="number"
            value={approvalData.amount}
            onChange={(e) => setApprovalData({ ...approvalData, amount: e.target.value })}
          />
          <Button onClick={handleApprove}>Approve</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid gap-4">
          <Label className="text-lg">Check Allowance</Label>
          <Input
            placeholder="Spender Address"
            value={allowanceCheck.spender}
            onChange={(e) =>
              setAllowanceCheck({ ...allowanceCheck, spender: e.target.value })
            }
          />
          <Button onClick={handleCheckAllowance}>Check</Button>
          {allowanceCheck.result !== null && (
            <p className="text-sm text-blue-600">Allowance: {allowanceCheck.result}</p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
