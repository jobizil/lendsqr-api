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
	const wallet = await db("wallets").insert({ user_id: id, balance: 0.0 });

	return id;
};

const loginUserService = async ({ email, password }: { email: string; password: string }) => {
	const retrievedUser = await db("users").where({ email }).first();
	if (!retrievedUser) {
		return { message: "Invalid Credentials!" };
	}
	const validPassword = await bcrypt.compare(password, retrievedUser.password);
	if (!validPassword) {
		return { message: "Invalid Credentials!" };
	}
	return retrievedUser;
};

const getUserService = async (id: number) => {
	const user = await db("users").where({ id }).first();
	return user;
};

export { createUserService, loginUserService, getUserService };
