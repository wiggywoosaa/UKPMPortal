export default {

  load: async () => {

    try {

      const user = appsmith.store.userContext;

      if (!user?.id) return;

      await GetMyDepartments.run({
        userId: user.id
      });

      const departments = (GetMyDepartments.data || [])
        .map(d => (d.Department || "").trim())
        .filter(Boolean);

      const updatedContext = {
        ...user,
        departments
      };

      await storeValue("userContext", updatedContext);

      // 🔥 KEEP AUTH ALIVE
      await storeValue("authReady", true);

      console.log("UserContext refreshed:", updatedContext);

    } catch (err) {

      console.error("User context load failed:", err);
      showAlert("Failed to load user context", "error");

    }

  }

};