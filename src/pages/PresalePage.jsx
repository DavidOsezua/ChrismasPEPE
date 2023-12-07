import { useEffect, useState } from "react";
import styles from "./Presale.module.css";
import { Navbar, Timer, Footer, Card } from "../components";
import { writeContract } from "@wagmi/core";
import { parseEther } from "viem";
import { getAllowance, getTokenBalance } from "../funcs/utils";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { fetchBalance, waitForTransaction, erc20ABI } from "@wagmi/core";

import contractAbi from "../contractAbi.json";

const contractAddress = "0x51b2F04b476381055E9f17Ce6B4D5633A49ACfB1";

const USDTAddress = "0x55d398326f99059fF775485246999027B3197955"; // 18 decimals
const BUSDAdrress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"; // 18 decimals

const PresalePage = () => {
  const { address } = useAccount();
  const { open } = useWeb3Modal();

  const [selectedToken, setSelectedToken] = useState("BNB");
  const [inputAmount, setInputAmount] = useState("0");
  const [outputAmount, setOutputAmount] = useState("0");

  useEffect(() => {
    if (selectedToken == "BNB") {
      const outPut = parseFloat(inputAmount) * 235 * 1000;
      setOutputAmount(outPut ? outPut.toString() : "0");
    } else {
      const output = parseFloat(inputAmount) * 1000;
      setOutputAmount(output ? output.toString() : "0");
    }
  }, [selectedToken, inputAmount]);

  const handleBuy = async () => {
    if (!inputAmount || parseFloat(inputAmount) == 0) {
      toast.warn("Invalid Input");
      return;
    }
    if (selectedToken == "BNB") {
      const balance = await fetchBalance({ address, chainId: 56 });
      const buyAmount = parseEther(inputAmount);

      if (balance.value < buyAmount) {
        toast.warn("Insufficient Balance");
        return;
      }
      const hash = await writeContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: "buyPresaleBNB",
        value: parseEther(inputAmount),
      });
      toast.promise(waitForTransaction({ hash: hash }), {
        pending: "Buying presale",
        success: "Token Bought",
        error: "Error Buying Presale",
      });
      console.log(hash);
    } else {
      const tokenAddress = selectedToken == "USDT" ? USDTAddress : BUSDAdrress;
      const buyAmount = parseEther(inputAmount);
      const balance = await getTokenBalance(tokenAddress, address);
      console.log(`Balance ${balance}`);
      if (balance < buyAmount) {
        toast.warn("Insufficient Balance");
        return;
      }
      const allowance = await getAllowance(
        tokenAddress,
        address,
        contractAddress
      );
      if (allowance < buyAmount) {
        const approvalHash = await writeContract({
          address: tokenAddress,
          abi: erc20ABI,
          functionName: "approve",
          args: [contractAddress, address],
        });
        await toast.promise(waitForTransaction({ hash: approvalHash }), {
          pending: "Approving Token",
          success: "Token Approved",
          error: "Error approving Token",
        });
      }
      const hash = await writeContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: "buyPresale",
        args: [tokenAddress, buyAmount],
      });
      console.log(hash);
      const res = await toast.promise(waitForTransaction(hash), {
        pending: "Buying presale",
        success: "Token Bought",
        error: "Error Buying Presale",
      });
      console.log(res);
    }
  };

  return (
    <div className={`${styles.section}`}>
      <Navbar />

      <main className={`text-center text-[#fff] ${styles.main} mb-[4rem]`}>
        <h2 className={`${styles.title}`}>BUY CHRISTMAS PEPE</h2>

        <Timer />

        <Card
          className={`flex justify-between px-[1rem] py-[0.8rem] items-center`}
        >
          <div className={`flex flex-col`}>
            <label>You Send</label>
            <input
              type="number"
              className={`${styles.input}`}
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
            />
          </div>

          <select
            className="text-[#FFF] bg-[#39A94A] p-[0.5rem]"
            onChange={(e) => setSelectedToken(e.target.value)}
          >
            <option value="BNB" className="text-[#FFF]" selected>
              BNB
            </option>
            <option value="USDT" className="text-[#FFF]">
              USDT
            </option>
            <option value="BUSD" className="text-[#FFF]">
              BUSD
            </option>
          </select>
        </Card>

        <h2 className="text-[#39A94A]">
          1 USDT = <span>1000 </span> PEPEMAS
        </h2>

        <Card
          className={`flex justify-between px-[1rem] py-[0.8rem] items-center`}
        >
          <div className={`flex flex-col`}>
            <label>You Receive</label>
            <input
              type="text"
              className={`${styles.input}`}
              value={outputAmount}
            />
          </div>

          <select className="text-[#FFF] bg-[#39A94A] p-[0.5rem]">
            <option value="BUSD" className="text-[#FFF]">
              PEPMAS
            </option>
          </select>
        </Card>

        {address ? (
          <button className={styles.button} onClick={handleBuy}>
            BUY PEPMAS
          </button>
        ) : (
          <button className={styles.button} onClick={open}>
            Connect Wallet
          </button>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PresalePage;
