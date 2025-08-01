import { test } from "@dhlab/e2e-autogen/playwright";
import { expect } from "@playwright/test";

test("[TC-1.1] 유저 ID를 입력하면 로그인되어야 한다", async ({ page }) => {
  await test.step("[TC-1.1.1] 로그인 페이지 로드 -> id 입력 폼이 표시되어야 한다", async () => {
    // 📍 UI Path: /login
    // 🎬 When: 로그인 페이지 로드
    await page.goto("http://localhost:5173/login");
    // ✅ Then: id 입력 폼이 표시되어야 한다
    await expect(page.getByRole("textbox", { name: "사용자 ID" })).toBeEmpty();
  });

  await test.step("[TC-1.1.2] 로그인 버튼이 비활성화 상태여야 한다", async () => {
    // ✅ Then: 로그인 버튼이 비활성화 상태여야 한다
    await expect(page.getByRole("button", { name: "로그인" })).toBeDisabled();
  });

  await test.step("[TC-1.1.3] id 입력 폼에 3fa85f64-5717-4562-b3fc-2c963f66afa6 입력 -> 로그인 버튼이 활성화 상태여야 한다", async () => {
    // 🎬 When: id 입력 폼에 3fa85f64-5717-4562-b3fc-2c963f66afa6 입력
    await page
      .getByRole("textbox", { name: "사용자 ID" })
      .fill("3fa85f64-5717-4562-b3fc-2c963f66afa6");
    // ✅ Then: 로그인 버튼이 활성화 상태여야 한다
    await expect(page.getByRole("button", { name: "로그인" })).toBeEnabled();
  });

  await test.step("[TC-1.1.4] 제출 버튼 클릭 -> 메인 페이지로 이동해야 한다", async () => {
    // 🎬 When: 제출 버튼 클릭
    await page.getByRole("button", { name: "로그인" }).click();
    // ✅ Then: 메인 페이지로 이동해야 한다
    await expect(page.getByRole("heading")).toContainText("블로그 포스트");
  });
});

test("[TC-1.2] 존재하지 않는 id로 로그인을 시도하는 경우 실패 모달이 떠야 한다", async ({
  page,
}) => {
  await test.step("[TC-1.2.1] id 입력 폼에 0 입력 후 제출 버튼 클릭 -> 모달(존재하지 않는 아이디입니다)이 떠야 한다", async () => {
    // 📍 UI Path: /login
    await page.goto("http://localhost:5173/login");
    // 🎬 When: id 입력 폼에 0 입력 후 제출 버튼 클릭
    await page.getByRole("textbox", { name: "사용자 ID" }).fill("0");
    await page.getByRole("button", { name: "로그인" }).click();
    // ✅ Then: 모달(존재하지 않는 사용자입니다)이 떠야 한다
    await expect(page.getByText("존재하지 않는 사용자입니다")).toBeVisible();
  });
});
