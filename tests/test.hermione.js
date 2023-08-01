const { assert } = require("chai");

it("fail assertView", async ({ browser, currentTest }) => {
  const items = await browser.$$(".serp-item_card-has-warning");
  await browser.url("https://www.startpage.com/");

  await browser.step(currentTest.id(), "делаем раз", async () => {
    await browser.$("#q").setValue("hello world");
  });

  await browser.step(currentTest.id(), "скриншотим кнопку", async () => {
    await browser.assertView("plain", "#search-btn");
  });

  await browser.step(currentTest.id(), "жмяк на кнопку поиска", async () => {
    await browser.$("#search-btn").click();
  });

  await browser.step(currentTest.id(), "не падает ассерт", async () => {
    assert.equal(items.length, +0);
  });
});
