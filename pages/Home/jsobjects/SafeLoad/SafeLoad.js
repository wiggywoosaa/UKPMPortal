export default {

  init: async () => {

    try {

      const ctx = appsmith.store.userContext;

      // 🟡 WAIT UNTIL STORE READY
      if (typeof ctx === "undefined") {
        console.log("SafeLoad: waiting for userContext...");
        return;
      }

      // 🔴 NOT LOGGED IN
      if (!ctx || !ctx.id) {
        console.log("SafeLoad: no user, redirecting");
        navigateTo("Login");
        return;
      }

      // ✅ LOAD PAGE DATA
      await Promise.all([
        GetDepartments.run(),
        GetEntities.run(),
        GetQuestions.run(),
        GetRisksAll.run(),
        GetUsers.run()
      ]);

      console.log("Home loaded");

    } catch (e) {

      console.error("Home init error", e);

    }

  }

}