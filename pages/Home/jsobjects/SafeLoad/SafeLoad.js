export default {

  init: async () => {

    try {

      const user = appsmith.store.user;

      // 🟡 WAIT UNTIL STORE READY
      if (user === undefined) return;

      // 🔴 NOT LOGGED IN
      if (!user) {
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