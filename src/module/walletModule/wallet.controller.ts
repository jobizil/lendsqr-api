import { Request, Response } from "express";
import Joi from "joi";
import { depositFundService, withdrawFundService, transferFundService } from "./wallet.service";
import db from "../../database/db";

// Validate amount to be positive integer only.
const validAmount = (amount: number) => {
	const schema = Joi.object({
		amount: Joi.number().required().positive().precision(2),
		receiverId: Joi.number().optional(),
	});
	return schema.validate(amount);
};

const depositFund = async (req: Request, res: Response) => {
	try {
		const amountValidation = validAmount(req.body);
		if (amountValidation.error) return res.status(400).json({ message: amountValidation.error.details[0].message });

		let { amount } = amountValidation.value;
		amount = parseFloat(amount.toFixed(2));

		const userId = res.locals.user.id;
		const user = await db("users").where({ id: userId }).first();

		if (!user) return res.status(404).json({ message: "User not found!" });
		const newBalance = await depositFundService(amount, userId);

		return res.status(200).json({
			status: 200,
			message: "Funds deposited successfully",
			data: { newBalance },
		});
	} catch (error: any) {
		return res.status(500).json({ error });
	}
};

const withdrawFund = async (req: Request, res: Response) => {
	try {
		const amountValidation = validAmount(req.body);
		if (amountValidation.error) return res.status(400).json({ message: amountValidation.error.details[0].message });

		let { amount } = amountValidation.value;
		amount = parseFloat(amount.toFixed(2));

		const userId = res.locals.user.id;
		const user = await db("users").where({ id: userId }).first();

		if (!user) return res.status(404).json({ message: "User not found!" });

		const newBalance = await withdrawFundService(amount, userId);

		return res.status(200).json({
			data: newBalance,
		});
	} catch (error: any) {
		return res.status(500).json({ error });
	}
};

// Transfer fund from one user to another.
const transferFund = async (req: Request, res: Response) => {
	const { receiverId } = req.body;
	const amountValidation = validAmount(req.body);
	if (amountValidation.error) return res.status(400).json({ message: amountValidation.error.details[0].message });

	let { amount } = amountValidation.value;
	amount = parseFloat(amount.toFixed(2));

	const transfer = await transferFundService(amount, res.locals.user.id, receiverId);
	return res.status(200).json({
		data: transfer,
	});
};
export { depositFund, withdrawFund, transferFund };
