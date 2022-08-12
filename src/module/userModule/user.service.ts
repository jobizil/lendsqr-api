import db from "../../database";
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
	return id;
};

/*
const loginService = async ({ email, password }: { email: string; password: string }) => {
	const [id]: any = await db("users")
		.where({
			email,
		})
		.first();
	console.log(id);
	return id;
}; */
export { createUserService };
