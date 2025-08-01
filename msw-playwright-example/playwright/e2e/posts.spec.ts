import { expect } from "@playwright/test";
import { scenarioTest as test } from "../fixture";

test.describe("게시글 목록", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/login");
    await page
      .getByRole("textbox", { name: "사용자 ID" })
      .fill("3fa85f64-5717-4562-b3fc-2c963f66afa6");
    await page.getByRole("button", { name: "로그인" }).click();
  });

  test("[TC-2.1] 게시글 목록 > 게시글 조회 성공", async ({ page }) => {
    await test.step("[TC-2.1.1] 게시글 목록 페이지 로드 -> 제목(블로그 포스트)이 표시되어야 한다", async () => {
      // 📍 UI Path: /posts
      // 🎬 When: 게시글 목록 페이지 로드
      await page.goto("http://localhost:5173/posts");
      // ✅ Then: 제목(블로그 포스트)이 표시되어야 한다
      await expect(page.getByRole("heading")).toContainText("블로그 포스트");
    });

    await test.step("[TC-2.1.2] 게시글이 1개 이상 표시되어야 한다", async () => {
      // ✅ Then: 게시글이 1개 이상 표시되어야 한다
      await expect(page.locator(".bg-card").first()).toBeVisible();
    });

    await test.step("[TC-2.1.3] 첫번째 게시글을 클릭한다 -> 제목이 표시되어야 한다", async () => {
      // 📍 UI Path: /:postId
      // 🎬 When: 첫번째 게시글을 클릭한다
      await page.locator(".bg-card").first().click();
      // ✅ Then: 제목이 표시되어야 한다
      await expect(page.getByRole("heading")).toBeVisible();
    });
  });

  test("[TC-2.2] 존재하지 않는 게시글에 접근했을 때 메시지가 떠야 한다", async ({
    page,
  }) => {
    await test.step("[TC-2.2.1] 존재하지 않는 게시글 url 접근 -> 메시지(게시글을 찾을 수 없습니다)가 떠야 한다", async () => {
      // 📍 UI Path: /:postId
      await page.goto("http://localhost:5173/posts/0");
      // 🎬 When: 존재하지 않는 게시글 url 접근
      // ✅ Then: 메시지(게시글을 찾을 수 없습니다)가 떠야 한다
      await expect(page.getByText("게시글을 찾을 수 없습니다")).toBeVisible();
    });
  });
});
