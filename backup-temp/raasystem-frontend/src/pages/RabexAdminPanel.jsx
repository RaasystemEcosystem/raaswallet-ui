import { useState, useEffect } from "react";
import { ethers } from "ethers";
import raaskoinAbi from "../abis/Raaskoin.json";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function RabexAdminPanel() {
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setContract] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);

  const [mintAmount, setMintAmount] = useState("");
  const [burnAmount, setBurnAmount] = useState("");
  const [approveAmount, setApproveAmount] = useState("");
  const [spenderAddress, setSpenderAddress] = useState("");

  const [aiStrategy, setAiStrategy] = useState({
    riskTolerance: "",
    stopLoss: "",
    takeProfit: "",
    tradingPairs: "",
    strategyNotes: "",
  });

  const [simulationResults, setSimulationResults] = useState(null);
  const contractAddress = "0x1f1ddc9ecC8a82267188c699f472B70D599a3055";

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const address = accounts[0];
        setWalletAddress(address);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const raaskoinContract = new ethers.Contract(contractAddress, raaskoinAbi, signer);
        setContract(raaskoinContract);

        const supply = await raaskoinContract.totalSupply();
        setTotalSupply(ethers.utils.formatUnits(supply, await raaskoinContract.decimals()));
      } catch (err) {
        console.error("Wallet connection error:", err);
      }
    } else {
      alert("Please install MetaMask.");
    }
  };

  const handleMint = async () => {
    if (!contract || !mintAmount) return;
    try {
      const decimals = await contract.decimals();
      const tx = await contract.mint(walletAddress, ethers.utils.parseUnits(mintAmount, decimals));
      await tx.wait();
      alert("Mint successful");
      const supply = await contract.totalSupply();
      setTotalSupply(ethers.utils.formatUnits(supply, await contract.decimals()));
    } catch (err) {
      alert("Mint failed");
      console.error(err);
    }
  };

  const handleBurn = async () => {
    if (!contract || !burnAmount) return;
    try {
      const decimals = await contract.decimals();
      const tx = await contract.burn(ethers.utils.parseUnits(burnAmount, decimals));
      await tx.wait();
      alert("Burn successful");
      const supply = await contract.totalSupply();
      setTotalSupply(ethers.utils.formatUnits(supply, await contract.decimals()));
    } catch (err) {
      alert("Burn failed");
      console.error(err);
    }
  };

  const handleApprove = async () => {
    if (!contract || !approveAmount || !spenderAddress) return;
    try {
      const decimals = await contract.decimals();
      const tx = await contract.approve(spenderAddress, ethers.utils.parseUnits(approveAmount, decimals));
      await tx.wait();
      alert("Approval successful");
    } catch (err) {
      alert("Approval failed");
      console.error(err);
    }
  };

  const simulateTrading = () => {
    const { riskTolerance, stopLoss, takeProfit } = aiStrategy;
    if (!riskTolerance || !stopLoss || !takeProfit) return alert("Fill in AI strategy fields");
    const result = `Simulating with ${riskTolerance} risk, SL at ${stopLoss}%, TP at ${takeProfit}%...`;
    setSimulationResults(result);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 md:px-20">
      <h1 className="text-3xl font-bold mb-8 text-center">RABEX Admin Panel</h1>

      {/* Connect Wallet */}
      <Card className="mb-6">
        <CardContent className="flex flex-col gap-4">
          <Label className="text-lg">Connect Wallet</Label>
          <Button onClick={connectWallet}>{walletAddress ? "Wallet Connected" : "Connect Wallet"}</Button>
          {walletAddress && (
            <div className="text-sm text-gray-700">
              <p>Address: {walletAddress}</p>
              <p>Total Supply: <strong>{totalSupply}</strong></p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mint */}
      <Card className="mb-6">
        <CardContent className="grid gap-4">
          <Label className="text-lg">Mint Tokens</Label>
          <Input type="number" placeholder="Amount to Mint" value={mintAmount} onChange={(e) => setMintAmount(e.target.value)} />
          <Button onClick={handleMint}>Mint</Button>
        </CardContent>
      </Card>

      {/* Burn */}
      <Card className="mb-6">
        <CardContent className="grid gap-4">
          <Label className="text-lg">Burn Tokens</Label>
          <Input type="number" placeholder="Amount to Burn" value={burnAmount} onChange={(e) => setBurnAmount(e.target.value)} />
          <Button onClick={handleBurn}>Burn</Button>
        </CardContent>
      </Card>

      {/* Approve */}
      <Card className="mb-6">
        <CardContent className="grid gap-4">
          <Label className="text-lg">Approve Spender</Label>
          <Input placeholder="Spender Address" value={spenderAddress} onChange={(e) => setSpenderAddress(e.target.value)} />
          <Input type="number" placeholder="Amount to Approve" value={approveAmount} onChange={(e) => setApproveAmount(e.target.value)} />
          <Button onClick={handleApprove}>Approve</Button>
        </CardContent>
      </Card>

      {/* AI Trading Strategy Config */}
      <Card className="mb-6">
        <CardContent className="grid gap-4">
          <Label className="text-lg">AI Strategy Configuration</Label>
          <Input placeholder="Risk Tolerance (Low/Medium/High)" value={aiStrategy.riskTolerance} onChange={(e) => setAiStrategy({ ...aiStrategy, riskTolerance: e.target.value })} />
          <Input placeholder="Stop-Loss %" value={aiStrategy.stopLoss} onChange={(e) => setAiStrategy({ ...aiStrategy, stopLoss: e.target.value })} />
          <Input placeholder="Take-Profit %" value={aiStrategy.takeProfit} onChange={(e) => setAiStrategy({ ...aiStrategy, takeProfit: e.target.value })} />
          <Input placeholder="Preferred Trading Pairs (comma-separated)" value={aiStrategy.tradingPairs} onChange={(e) => setAiStrategy({ ...aiStrategy, tradingPairs: e.target.value })} />
          <Textarea placeholder="Notes or Strategy Description" value={aiStrategy.strategyNotes} onChange={(e) => setAiStrategy({ ...aiStrategy, strategyNotes: e.target.value })} />
          <Button onClick={simulateTrading}>Simulate Strategy</Button>
          {simulationResults && <p className="text-sm text-green-600">{simulationResults}</p>}
        </CardContent>
      </Card>
    </main>
  );
}
