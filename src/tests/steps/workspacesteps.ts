import { Given, When, Then, DataTable } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import workspacePage from "../pages/workspacepage";


let wspage = new workspacePage();

Given('User navigate to workspace page', async function () {
    await wspage.clickWorkspace();
    await wspage.waitForLoad();
  });

When('I click on edit in input section', async function () {
    await wspage.clickEditInput();
  });

When('I enter the randon name in name textbox', async function () {
    await wspage.enterFullName();
  });