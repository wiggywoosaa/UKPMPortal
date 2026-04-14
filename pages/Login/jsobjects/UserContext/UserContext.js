export default {

  loadUserContext: async () => {

    try {

      const user = appsmith.store.userContext;

      // 🔴 IMPORTANT: do NOT crash if not ready
      if (!user?.id) {
        console.warn("User not ready, skipping context load");
        return;
      }

      // 🔥 LOAD DEPARTMENTS USING PARAM (NO STORE DEPENDENCY)
      await GetMyDepartments.run({
        userId: user.id
      });

      const departments = (GetMyDepartments.data || [])
        .map(d => (d.Department || "").trim());

      const updatedContext = {
        ...user,
        departments
      };

      await storeValue("userContext", updatedContext);

      console.log("UserContext refreshed:", updatedContext);

    } catch (err) {

      console.error("User context load failed:", err);
      showAlert("Failed to load user context", "error");

    }

  }

}