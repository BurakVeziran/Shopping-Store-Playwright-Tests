import { Page } from "@playwright/test";
import { fixture } from "../features/support/hooks";
import { MyAccountPage } from "./myAccountPage";
import {Logger} from "winston";

export class apiLogin {
  private page: Page;
  private logger: Logger;
  private myAccount: MyAccountPage;

  constructor(page: Page) {
    this.page = page;
    this.myAccount = new MyAccountPage(page);
  }

  mockApi = async (): Promise<void> => {
    await fixture.page.route("**/api/user**", (route) => {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ message: "PLAYWRIGHT ERROR FROM MOCKING" }),
      });
    });
  };

  goToMyAccount = async (loginToken: string): Promise<void> => {
    await this.page.evaluate(
      ([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode;
      },
      [loginToken]
    );
    await this.myAccount.visit();
  };
}
