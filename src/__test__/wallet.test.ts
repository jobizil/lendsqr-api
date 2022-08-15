import supertest from "supertest";
import * as WalletServices from "../module/walletModule/wallet.service";
import createServer from "../server";

const app = createServer();
const walletPayload = {
	id: 1,
	balance: 1000,
	userId: 1,
};

const walletData = {
	amount: 1000,
};

describe("Fund wallet", () => {
	describe("given amount or userId are invalid", () => {
		it("should not run deposit Service", async () => {
			// @ts-ignore
			const fundWalletServiceSpy = jest.spyOn(WalletServices, "depositFundService").mockReturnValueOnce(walletPayload);
			const { statusCode } = await supertest(app).post("/api/v1/wallet/deposit").send({});
			expect(fundWalletServiceSpy).not.toHaveBeenCalled();
		});
	});
});

describe("Transfer funds", () => {
	describe("given amount or receiverId is invalid", () => {
		it("should not run transfer Service", async () => {
			// @ts-ignore
			const transferFundServiceSpy = jest.spyOn(WalletServices, "transferFundService");
			const { statusCode } = await supertest(app).post("/api/v1/wallet/transfer").send({});
			expect(transferFundServiceSpy).not.toHaveBeenCalled();
		});
	});
});

describe("Withdraw funds", () => {
	describe("given amount and userId are invalid", () => {
		it("should return 400 status", async () => {
			// @ts-ignore
			const withdrawFundServiceSpy = jest.spyOn(WalletServices, "withdrawFundService");

			const { statusCode } = await supertest(app).post("/api/v1/wallet/withdraw").send({});
			expect(statusCode).toBe(403);
			expect(withdrawFundServiceSpy).not.toHaveBeenCalled();
		});
	});
});
