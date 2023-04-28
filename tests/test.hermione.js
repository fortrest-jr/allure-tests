const { assert } = require("chai");

hermione.only.in(["chrome", "chrome2"]);
it("should pass", async function () {
  assert.equal(1, 1);
});

it("fail 3 step", async ({ browser, currentTest }) => {
  const items = await browser.$$(".w-gl__result");
  await browser.url("https://www.startpage.com/");

  await browser.step(currentTest.id(), "делаем раз", async () => {
    await browser.$("#q").setValue("hello world");
  });

  await browser.step(currentTest.id(), "жмяк на кнопку поиска", async () => {
    await browser.$("#search-btn").click();
  });

  await browser.step(currentTest.id(), "и падает тут ассерт", async () => {
    assert.equal(items.length, 3);
  });

  await browser.step(currentTest.id(), "видео на странице есть", async () => {
    await browser.$(".sx-video-info").isExisting();
  });
});

it("fail 1 step", async ({ browser, currentTest }) => {
  const items = await browser.$$(".w-gl__result");
  await browser.url("https://www.startpage.com/");

  await browser.step(
    currentTest.id(),
    "не находим поисковую строку",
    async () => {
      await browser.$("#p").setValue("hello world");
    }
  );

  await browser.step(currentTest.id(), "жмяк на кнопку поиска", async () => {
    await browser.$("#search-btn").click();
  });

  await browser.step(currentTest.id(), "ассерт", async () => {
    assert.equal(items.length, +0);
  });

  await browser.step(currentTest.id(), "видео на странице есть", async () => {
    await browser.$(".sx-video-info").isExisting();
  });
});

it.skip("fail all steps", async ({ browser, currentTest }) => {
  const items = await browser.$$(".w-gl__result");
  await browser.url("https://www.startpage.com/");

  await browser.step(currentTest.id(), "теряем поисковую строку", async () => {
    await browser.$("#p").setValue("hello world");
  });

  await browser.step(
    currentTest.id(),
    "жмяк на кнопку поиска, а кнопки нет",
    async () => {
      await browser.$("#search-bn").click();
    }
  );

  await browser.step(currentTest.id(), "и падает тут ассерт", async () => {
    assert.equal(items.length, 0);
  });

  await browser.step(
    currentTest.id(),
    "видео на странице есть, а мы не находим",
    async () => {
      await browser.$(".sx-video-ino").isExisting();
    }
  );
});

it.skip("pass all steps", async ({ browser, currentTest }) => {
  const items = await browser.$$(".w-gl__result");
  await browser.url("https://www.startpage.com/");

  await browser.step(currentTest.id(), "делаем раз", async () => {
    await browser.$("#q").setValue("hello world");
  });

  await browser.step(currentTest.id(), "жмяк на кнопку поиска", async () => {
    await browser.$("#search-btn").click();
  });

  await browser.step(currentTest.id(), "ассерт", async () => {
    assert.equal(items.length, +0);
  });

  await browser.step(currentTest.id(), "видео на странице есть", async () => {
    await browser.$(".sx-video-info").isExisting();
  });
});
