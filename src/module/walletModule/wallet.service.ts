import db from "../../database/db";

// Deposit Funds to Wallet
const depositFundService = async (amount: number, userId: number) => {
	const wallet = await db("wallets").where({ user_id: userId }).first();
	const updatedBalance = (Number(wallet.balance) + amount).toFixed(2);

	await db("wallets").where({ user_id: userId }).update({ balance: updatedBalance });
	return updatedBalance;
};

// Transfer funds to another wallet

// Withdraw funds

export { depositFundService };
