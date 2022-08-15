import supertest from "supertest";
import * as UserServices from "../module/userModule/user.service";
import createServer from "../app";

const app = createServer();
const userPayload = {
	id: 1,
	username: "Job",
};

const userData = {
	email: "ugbej@eail.com",
	username: "Job",
	password: "password123",
};

const invalidUserData = {
	email: "ugbej@eail.com",
	password: "password123",
};

const userLoginData = {
	email: "ugbej@eail.com",
	password: "password123",
};

const invalidUserLoginData = {
	email: "ugbej@eail.com",
};
describe("Create user data", () => {
	describe("User signup given that username and email are unique", () => {
		it("should create a new user payload", async () => {
			// @ts-ignore
			const createUserServiceSpy = jest.spyOn(UserServices, "createUserService").mockReturnValueOnce(userPayload);

			const { statusCode, body } = await supertest(app).post("/api/v1/auth/signup").send(userData);
			expect(statusCode).toBe(201);
			expect(body).toHaveProperty("data");
			expect(createUserServiceSpy).toHaveBeenCalled();
		});
	});

	describe("User service throws if all fields are not inserted", () => {
		it("should return 400 status ", async () => {
			// @ts-ignore
			const createUserServiceSpy = jest.spyOn(UserServices, "createUserService").mockReturnValueOnce(userPayload);

			const { statusCode } = await supertest(app).post("/api/v1/auth/signup").send(invalidUserData);
			expect(statusCode).toBe(400);
			expect(createUserServiceSpy).not.toHaveBeenCalled();
		});
	});
});

describe("Login user", () => {
	describe("given username and password are valid", () => {
		it("should return a valid token", async () => {
			// @ts-ignore
			const loginUserServiceSpy = jest.spyOn(UserServices, "loginUserService").mockReturnValueOnce(userPayload);
			const { statusCode, body } = await supertest(app).post("/api/v1/auth/login").send(userLoginData);
			expect(statusCode).toBe(200);
			expect(body.data).toHaveProperty("accessToken");
			expect(loginUserServiceSpy).toHaveBeenCalled();
		});
	});
	describe("given username or password is not valid", () => {
		it("should return status 400", async () => {
			// @ts-ignore
			const loginUserServiceSpy = jest.spyOn(UserServices, "loginUserService").mockReturnValueOnce(userPayload);
			const { statusCode, body } = await supertest(app).post("/api/v1/auth/login").send(invalidUserLoginData);
			expect(statusCode).toBe(400);
			expect(loginUserServiceSpy).not.toHaveBeenCalled();
		});
	});
});
