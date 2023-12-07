import { erc20ABI, readContract } from "@wagmi/core";

export const getTokenBalance = async (token, owner) => {
  const balance = await readContract({
    address: token,
    abi: erc20ABI,
    functionName: "balanceOf",
    args: [owner],
  });
  return balance;
};

export const getAllowance = async (token, owner, spender) => {
  const allowance = await readContract({
    address: token,
    abi: erc20ABI,
    functionName: "allowance",
    args: [owner, spender],
  });
  return allowance;
};
