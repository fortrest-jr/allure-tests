hermione.only.in(["chrome", "chrome2"]);
it("should throw error", async function () {
  throw Error();
});

hermione.only.in(["chrome"]);
it("should throw error too", async function () {
  throw Error();
});
