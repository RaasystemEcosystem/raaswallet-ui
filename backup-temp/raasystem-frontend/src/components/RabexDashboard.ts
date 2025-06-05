import { useState } from "react";
import { ethers } from "ethers";
import { useRaaskoin } from "@/hooks/useRaaskoin";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function RabexDashboard() {
  const {
    walletAddress,
    balance,
    tokenName,
    contract,
    decimals,
    connectWallet,
  } = useRaaskoin();

  const [toAddress, setToAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [spenderAddress, setSpenderAddress] = useState("");
  const [approveAmount, setApproveAmount] = useState("");
  const [checkedSpender, setCheckedSpender] = useState("");
  const [allowance, setAllowance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isValidAddress = (addr: string) => ethers.utils.isAddress(addr);

  const handleTransfer = async () => {
    if (!contract || !isValidAddress(toAddress)) return toast.error("Invalid input");
    try {
      setLoading(true);
      const tx = await contract.transfer(toAddress, ethers.utils.parseUnits(transferAmount, decimals));
      await tx.wait();
      toast.success("Transfer successful");
    } catch (err) {
      toast.error("Transfer failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!contract || !isValidAddress(spenderAddress)) return toast.error("Invalid input");
    try {
      setLoading(true);
      const tx = await contract.approve(spenderAddress, ethers.utils.parseUnits(approveAmount, decimals));
      await tx.wait();
      toast.success("Approval successful");
    } catch (err) {
      toast.error("Approval failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckAllowance = async () => {
    if (!contract || !walletAddress || !isValidAddress(checkedSpender)) return toast.error("Invalid input");
    try {
      const result = await contract.allowance(walletAddress, checkedSpender);
      setAllowance(ethers.utils.formatUnits(result, decimals));
    } catch (err) {
      toast.error("Allowance check failed");
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4 md:px-20">
      <h1 className="text-3xl font-bold mb-8 text-center">RABEX Token Dashboard</h1>

      <Card className="mb-8">
        <CardContent className="flex flex-col gap-4">
          <Label className="text-lg">Connect Wallet</Label>
          <Button onClick={connectWallet} disabled={!!walletAddress}>
            {walletAddress ? "Wallet Connected" : "Connect Wallet"}
          </Button>
          {walletAddress && (
            <div className="text-sm text-gray-700">
              <p>Address: {walletAddress}</p>
              <p>
                {tokenName} Balance: <strong>{balance}</strong>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="grid gap-4">
          <Label className="text-lg">Transfer Tokens</Label>
          <Input placeholder="To Address" value={toAddress} onChange={(e) => setToAddress(e.target.value)} />
          <Input placeholder="Amount" type="number" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} />
          <Button onClick={handleTransfer} disabled={loading}>Transfer</Button>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="grid gap-4">
          <Label className="text-lg">Approve Spender</Label>
          <Input placeholder="Spender Address" value={spenderAddress} onChange={(e) => setSpenderAddress(e.target.value)} />
          <Input placeholder="Amount" type="number" value={approveAmount} onChange={(e) => setApproveAmount(e.target.value)} />
          <Button onClick={handleApprove} disabled={loading}>Approve</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid gap-4">
          <Label className="text-lg">Check Allowance</Label>
          <Input placeholder="Spender Address" value={checkedSpender} onChange={(e) => setCheckedSpender(e.target.value)} />
          <Button onClick={handleCheckAllowance}>Check</Button>
          {allowance && <p className="text-sm text-blue-600">Allowance: {allowance}</p>}
        </CardContent>
      </Card>
    </main>
  );
}
