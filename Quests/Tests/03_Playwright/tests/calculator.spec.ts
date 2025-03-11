//@ts-check
const { test, expect } = require("@playwright/test");

test("Calculator works", async ({ page }) => {
	await page.goto("https://www.desmos.com/scientific?lang=fr");
	// await page.pause();

	await page.getByRole("button", { name: "1" }).click();
	await page.getByRole("button", { name: "Plus" }).click();
	await page.getByRole("button", { name: "2" }).click();

	await page.getByLabel("Liste d'expressions").getByText("3", { exact: true });
});
