const { assert } = require("chai");

it("fail assertView", async ({ browser, currentTest }) => {
  const items = await browser.$$(".serp-item_card-has-warning");
  await browser.url("https://ya.ru/");

  await browser.step(currentTest.id(), "делаем раз", async () => {
    await browser.$(".search3__input").setValue("hello world");
  });

  await browser.step(currentTest.id(), "скриншотим кнопку", async () => {
    await browser.assertView('plain', '.search3__button');
  });

  await browser.step(currentTest.id(), "жмяк на кнопку поиска", async () => {
    await browser.$(".search3__button").click();
  });

  await browser.step(currentTest.id(), "не падает ассерт", async () => {
    assert.equal(items.length, +0);
  });

  await browser.step(
    currentTest.id(),
    "на странице есть ворнинги",
    async () => {
      await browser.$(".WikiArticle").isExisting();
    }
  );
});
