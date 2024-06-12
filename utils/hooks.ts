import {Before, After, setDefaultTimeout, BeforeAll, AfterAll, BeforeStep, AfterStep, Status} from "@cucumber/cucumber"
import {chromium, firefox, webkit} from "playwright"
import dotenv from 'dotenv';
dotenv.config()
setDefaultTimeout(1000 * 60 * 2);

BeforeAll(async function () {

  switch (process.env.browser) {
    case "chrome":
    case "gc":
      global.browser = await chromium.launch({
        headless: false,
        channel: "chrome",
        args: ["--start-maximized"],
      });
      break;
    case "firefox":
    case "ff":
      global.browser = await firefox.launch({
        headless: false,
        args: ["--start-maximized"],
      });
      break;
    case "edge":
    case "msedge":
      global.browser = await chromium.launch({
        headless: false,
        channel: "msedge",
        args: ["--start-maximized"],
      });
      break;
    case "safari":
    case "webkit":
      global.browser = await webkit.launch({
        headless: false,
        args: ["--start-maximized"],
      });
      break;
    default:
      throw new Error("invalid browser type " + process.env.browser + "is passed!");
  }
});

Before(async function (scenario) {
  global.bCtx = await global.browser.newContext({
    viewport: null,
    javaScriptEnabled: true,
  });
  global.page = await global.bCtx.newPage();

  global.page.goto(process.env.url);
  global.page.waitForLoadState();

  //this.log("Scenario title: " + scenario.pickle.name); // it will add custom log to html report
});

// BeforeStep(async function(scenario){

//     this.log("step started: "+scenario.pickleStep.text);
// });

// AfterStep(async function(scenario){

//     this.log("step ended: "+scenario.pickleStep.text);
// });

After(async function (scenario) {
  const today: Date = new Date();
  const year: number = today.getFullYear();
  const month: number = today.getMonth() + 1; // Months are zero-based, so January is 0
  const day: number = today.getDate();
  const hours: number = today.getHours();
  const minutes: number = today.getMinutes();
  const seconds: number = today.getSeconds();

  const todayDateString: string =
    year +
    "-" +
    month.toString().padStart(2, "0") +
    "-" +
    day.toString().padStart(2, "0");

  const timeString: string =
    hours.toString().padStart(2, "0") +
    "-" +
    minutes.toString().padStart(2, "0") +
    "-" +
    seconds.toString().padStart(2, "0");

  // this.attach(
  //   "scenario ended: " +
  //     scenario.pickle.name +
  //     " and scneario status is :" +
  //     scenario.result?.status
  // );

  let uniqueDate: string = todayDateString + "_" + timeString;

  console.log(
    "todays date and time generated in AfterrAll Hooks: " + uniqueDate
  );

  // this.log(
  //   "Scenario ended: " +
  //     scenario.pickle.name +
  //     " and scenario status is: " +
  //     scenario.result?.status
  // );

  if (scenario.result?.status == Status.PASSED) {
    const img = await global.page.screenshot({
      path:
        "./reports/screenshots/passed/" +
        uniqueDate +
        "_" +
        scenario.pickle.name +
        ".png",
    });

    //this.attach(img, "image/png"); // it will attach screenshot it cucumber html report
  } else {
    //this.log("attach failed screenshots under failed folder"); // it will attach screenshot it cucumber html report
    const img = await global.page.screenshot({
      path:
        "./reports/screenshots/failed/" +
        uniqueDate +
        "_" +
        scenario.pickle.name +
        ".png",
    });

    //this.attach(img, "image/png"); // it will attach screenshot it cucumber html report
  }

  await global.page.close();
  await global.bCtx.close();
});

//browser will be closed after all testings are executed
AfterAll(async function () {
  await global.browser.close();
});





