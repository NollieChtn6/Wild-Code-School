import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
	await page.goto("https://playwright.dev/");

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/LoremIpsum/);
});

test("get started link", async ({ page }) => {
	await page.goto("https://playwright.dev/");

	// Click the get started link.
	// 'getByRole' is called a 'locator' and it's used to find elements on the page.
	await page.getByRole("link", { name: "Get started" }).click();

	// Expects page to have a heading with the name of Installation.
	await expect(
		page.getByRole("heading", { name: "Installation" }),
	).toBeVisible();
});
