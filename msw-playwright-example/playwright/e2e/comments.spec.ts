import { expect } from "@playwright/test";
import { test } from "../setup";

test.describe("댓글 작성", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/login");
    await page
      .getByRole("textbox", { name: "사용자 ID" })
      .fill("3fa85f64-5717-4562-b3fc-2c963f66afa6");
    await page.getByRole("button", { name: "로그인" }).click();
  });

  test("[TC-3.1] 댓글 작성 성공", async ({ page }) => {
    await test.step("[TC-3.1.1] 하단으로 스크롤 -> 댓글창이 떠야 한다", async () => {
      // 📍 UI Path: /:postId
      await page.goto("http://localhost:5173/posts");
      await page.locator(".bg-card").first().click();

      // 🎬 When: 하단으로 스크롤
      // ✅ Then: 댓글창이 떠야 한다
      await expect(
        page.getByRole("heading", { name: "댓글 작성" })
      ).toBeVisible();
    });

    await test.step("[TC-3.1.2] 제출 버튼이 비활성화 상태여야 한다", async () => {
      // ✅ Then: 제출 버튼이 비활성화 상태여야 한다
      await expect(
        page.getByRole("button", { name: "댓글 등록" })
      ).toBeDisabled();
    });

    await test.step("[TC-3.1.3] 댓글창에 아아아 입력 -> 제출 버튼이 활성화 상태여야 한다", async () => {
      // 🎬 When: 댓글창에 아아아 입력
      await page
        .getByRole("textbox", { name: "댓글을 입력하세요" })
        .fill("아아아");

      // ✅ Then: 제출 버튼이 활성화 상태여야 한다
      await expect(
        page.getByRole("button", { name: "댓글 등록" })
      ).toBeEnabled();
    });

    await test.step("[TC-3.1.4] 제출 버튼 클릭 -> 댓글 리스트의 첫번째에 아아아가 표시되어야 한다", async () => {
      // 🎬 When: 제출 버튼 클릭
      await page.getByRole("button", { name: "댓글 등록" }).click();
      // ✅ Then: 댓글 리스트의 첫번째에 아아아가 표시되어야 한다
      await expect(page.getByTestId("comment-item").first()).toContainText(
        "아아아"
      );
    });
  });

  test("[TC-3.2] 댓글 작성 실패 (500)", async ({ page }) => {
    await test.step("[TC-3.2.1] 댓글창에 아아아 입력 후 제출 버튼 클릭 -> 에러 토스트가 떠야 한다", async () => {
      // 📍 UI Path: /:postId
      await page.goto("http://localhost:5173/posts");
      await page.locator(".bg-card").first().click();
      // 🎬 When: 댓글창에 아아아 입력 후 제출 버튼 클릭
      await page
        .getByRole("textbox", { name: "댓글을 입력하세요" })
        .fill("아아아");
      await page.getByRole("button", { name: "댓글 등록" }).click();

      // ✅ Then: 에러 토스트가 떠야 한다
      await expect(page.getByText("댓글 등록에 실패했습니다")).toBeVisible();
    });
  });
});
