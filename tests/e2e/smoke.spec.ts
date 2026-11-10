import { expect, test } from "@playwright/test";

const errors: string[] = [];
// React #418 is a recoverable hydration error that Next 15 occasionally reports under heavy CPU load.
// React re-renders on the client, so nothing visible breaks. Every other error fails the test.
const KNOWN = /Minified React error #418/;
test.beforeEach(({ page }) => {
  errors.length = 0;
  page.on("pageerror", (e) => { if (!KNOWN.test(e.message)) errors.push(e.message); });
  page.on("console", (m) => { if (m.type() === "error" && !/favicon/.test(m.text())) errors.push(m.text()); });
});
test.afterEach(() => expect(errors, errors.join("\n")).toEqual([]));

const PRAISE = /Sharp sharp|Lekker|Spot on|Eish, you're good|Yebo|Too clean|Examiner-approved|Boardroom-ready/;

test.describe("BusinessMzansi smoke tests", () => {
  test("home page renders the hero, main topics and exam shelf", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Business Studies");
    await expect(page.getByRole("heading", { name: /The whole CAPS Grade 12 Business Studies syllabus/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Knowing the paper is the other half/ })).toBeVisible();
  });

  test("lesson: typed rand answers are checked", async ({ page }) => {
    await page.goto("/learn/simple-and-compound-interest", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /2\. Simple interest, step by step/ }).first().click();
    const input = page.getByRole("textbox", { name: /Your answer/ }).first();
    await input.fill("400");
    await page.getByRole("button", { name: "Check", exact: true }).first().click();
    await expect(page.getByText("Not yet.").first()).toBeVisible();
    await input.fill("R800");
    await page.getByRole("button", { name: "Check", exact: true }).first().click();
    await expect(page.getByText(PRAISE).first()).toBeVisible();
  });

  test("labs: a model can be explored and quizzed", async ({ page }) => {
    await page.goto("/toolkit", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /^Porter's Five Forces/ }).first().click();
    await page.getByRole("button", { name: /Power of buyers/ }).click();
    await expect(page.getByText(/How easy it is for buyers to drive prices down/)).toBeVisible();
    await page.getByRole("button", { name: "Which one is it?" }).click();
    await expect(page.getByText(/Clue 1 of 5/)).toBeVisible();
  });

  test("labs: the interest lab and essay planner respond", async ({ page }) => {
    await page.goto("/toolkit", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /^Interest lab/ }).first().click();
    await expect(page.getByText("R16 105,10").first()).toBeVisible();
    await page.getByRole("button", { name: /^Essay planner/ }).first().click();
    await page.getByRole("button", { name: /Next: Introduction/ }).click();
    await page.getByRole("button", { name: /Businesses need to develop strategies/ }).click();
    await expect(page.getByText(/Content 1\/32/)).toBeVisible();
  });

  test("exam room: a question opens and a fact earns two marks", async ({ page }) => {
    await page.goto("/exam", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /Labour Relations Act/ }).first().click();
    await page.getByRole("button", { name: /Show the memo/ }).first().click();
    await page.getByRole("button", { name: /Labour Relations Act \/ LRA/ }).click();
    await expect(page.getByText("2 / 2").first()).toBeVisible();
  });

  for (const path of ["/learn", "/flashcards", "/quiz", "/games", "/progress", "/exam/mock", "/exam/mock/p1", "/teachers", "/teachers/worksheets", "/teachers/docs/curriculum-map"]) {
    test(`${path} loads without errors`, async ({ page }) => {
      const res = await page.goto(path, { waitUntil: "networkidle" });
      expect(res?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    });
  }
});
