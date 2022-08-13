import db from "../../database/db";
import bcrypt from "bcrypt";

const createUserService = async ({
	username,
	email,
	password,
}: {
	username: string;
	email: string;
	password: string;
}) => {
	const [id]: any = await db("users").insert({
		username,
		email,
		password: bcrypt.hashSync(password, 10),
	});

	// Create wallet for user
	await db("wallets").insert({ user_id: id, balance: 0.0 });

	return id;
};

export { createUserService };
