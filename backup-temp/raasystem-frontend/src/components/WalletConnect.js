import { useEffect } from "react";

export default function WalletConnect({ onConnect }) {
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", () => {
        onConnect();
      });
    }
  }, [onConnect]);

  const connectWallet = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      onConnect();
    } catch (error) {
      console.error("MetaMask connection failed:", error);
    }
  };

  return (
    <button
      onClick={connectWallet}
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      Connect MetaMask
    </button>
  );
}
