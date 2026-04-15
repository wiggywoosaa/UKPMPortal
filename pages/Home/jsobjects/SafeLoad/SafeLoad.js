export default {

  init: async () => {

    try {

      const ctx = appsmith.store.userContext;

      // 🔴 BLOCK IMMEDIATELY IF NOT LOGGED IN
      if (!ctx || !ctx.id) {
        navigateTo("Login");
        return;
      }

      // ✅ LOAD DATA
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

};