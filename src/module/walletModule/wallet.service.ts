import db from "../../database/db";

// Generate random reference alphabetically
const reference = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

// Deposit Funds to Wallet Service
const depositFundService = async (amount: number, userId: number) => {
	const trx = await db.transaction();
	try {
		const wallet = await trx("wallets").where({ user_id: userId }).first();
		const updatedBalance = (Number(wallet.balance) + amount).toFixed(2);

		const transactionExist = await trx("transactions").where({ wallet_id: wallet.id }).first();

		if (!transactionExist) {
			// Create initial transaction for wallet on first deposit
			await trx("transactions").insert({
				wallet_id: wallet.id,
				balance_before: wallet.balance,
				current_balance: updatedBalance,
				trx_id: reference,
			});
		}

		await trx("wallets").where({ user_id: userId }).update({ balance: updatedBalance });

		// Create transaction for wallet
		await trx("transactions").insert({
			wallet_id: wallet.id,
			trans_type: "Credit",
			balance_before: wallet.balance,
			current_balance: updatedBalance,
			trx_id: reference,
		});
		await trx.commit();

		return {
			balance: updatedBalance,
		};
	} catch (error: any) {
		await trx.rollback();
		return { message: error.message };
	}
};

// Withdraw funds Service
const withdrawFundService = async (amount: number, userId: number) => {
	const trx = await db.transaction();
	try {
		const wallet = await trx("wallets").where({ user_id: userId }).first();

		if (amount > wallet.balance) {
			await trx.rollback();
			return { message: "Cannot process withdrawal due to insufficient funds." };
		}

		const newBalance = (Number(wallet.balance) - amount).toFixed(2);

		// Checks for existing transaction
		const transactionExist = await trx("transactions").where({ wallet_id: wallet.id }).first();

		if (!transactionExist) {
			await trx.rollback();
			return;
		}
		await trx("wallets").where({ user_id: userId }).update({ balance: newBalance });

		// Create withdrawal transaction for wallet
		await trx("transactions").insert({
			wallet_id: wallet.id,
			trans_type: "Debit",
			balance_before: wallet.balance,
			current_balance: newBalance,
			trx_id: reference,
		});
		await trx.commit();

		return {
			status: 200,
			message: "Funds withdrawal was successful.",
			newBalance,
		};
	} catch (error: any) {
		await trx.rollback();
		return { message: error.message };
	}
};

// Transfer funds to another wallet Service
const transferFundService = async (amount: number, senderId: number, receiverId: number) => {
	const trx = await db.transaction();
	try {
		const senderWallet = await trx("wallets").where({ user_id: senderId }).first();
		const receiverWallet = await trx("wallets").where({ user_id: receiverId }).first();

		if (!receiverWallet) {
			await trx.rollback();
			return { message: "Wallet not found." };
		}

		if (amount > senderWallet.balance) {
			return { message: "Cannot process transfer due to insufficient funds." };
		}

		const senderNewBalance = (Number(senderWallet.balance) - amount).toFixed(2);
		const receiverNewBalance = (Number(receiverWallet.balance) + amount).toFixed(2);

		await trx("wallets").where({ user_id: senderId }).update({ balance: senderNewBalance });
		await trx("wallets").where({ user_id: receiverId }).update({ balance: receiverNewBalance });

		// Create transaction for sender wallet
		await trx("transactions").insert({
			trans_type: "Debit",
			trx_id: reference,
			wallet_id: senderWallet.id,
			balance_before: senderWallet.balance,
			current_balance: senderNewBalance,
		});

		// Create transaction for receiver wallet
		await trx("transactions").insert({
			wallet_id: receiverWallet.id,
			trans_type: "Credit",
			trx_id: reference,
			balance_before: receiverWallet.balance,
			current_balance: receiverNewBalance,
		});
		await trx.commit();

		return {
			status: 200,
			message: "Funds transfer was successful.",
			senderNewBalance,
			receiverNewBalance,
		};
	} catch (error: any) {
		await trx.rollback();
		return { message: error.message };
	}
};

export { depositFundService, withdrawFundService, transferFundService };
