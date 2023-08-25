const { assert } = require("chai");

it("assertView", async ({ browser, currentTest }) => {
  const items = await browser.$$(".serp-item_card-has-warning");
  await browser.url("https://ya.ru");

  await browser.runStep("делаем раз", async () => {
    await browser.$(".search3__input").setValue("hello world");
  });

  await browser.runStep("скриншотим кнопку", async () => {
    await browser.assertView("plain", ".search3__input");
  });

  await browser.runStep("жмяк на кнопку поиска", async () => {
    await browser.$(".search3__button").click();
  });

  await browser.runStep("не падает ассерт", async () => {
    assert.equal(items.length, +0);
  });
});

// it("2", async ({ browser, currentTest }) => {
//   const items = await browser.$$(".serp-item_card-has-warning");
//   await browser.url("https://www.startpage.com/");

//   await browser.step(currentTest.id, "делаем раз", async () => {
//     await browser.$("#q").setValue("world");
//   });

//   await browser.step(currentTest.id, "жмяк на кнопку поиска", async () => {
//     await browser.$("#search-btn").click();
//   });

//   await browser.step(currentTest.id, "не падает ассерт", async () => {
//     assert.equal(items.length, +0);
//   });
// });

// it("3", async ({ browser, currentTest }) => {
//   const items = await browser.$$(".serp-item_card-has-warning");
//   await browser.url("https://www.startpage.com/");

//   await browser.step(currentTest.id, "делаем раз", async () => {
//     await browser.$("#q").setValue("world");
//   });

//   await browser.step(currentTest.id, "жмяк на кнопку поиска", async () => {
//     await browser.$("#search-btn").click();
//   });

//   await browser.step(currentTest.id, "не падает ассерт", async () => {
//     assert.equal(items.length, +0);
//   });
// });

// it("4", async ({ browser, currentTest }) => {
//   const items = await browser.$$(".serp-item_card-has-warning");
//   await browser.url("https://www.startpage.com/");

//   await browser.step(currentTest.id, "делаем раз", async () => {
//     await browser.$("#q").setValue("world");
//   });

//   await browser.step(currentTest.id, "жмяк на кнопку поиска", async () => {
//     await browser.$("#search-btn").click();
//   });

//   await browser.step(currentTest.id, "не падает ассерт", async () => {
//     assert.equal(items.length, +0);
//   });
// });
