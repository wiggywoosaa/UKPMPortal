export default {

  loadUserContext: async () => {

    try {

      // 🔹 Get logged-in user from store (set at login)
      const user = appsmith.store.userContext;

      if (!user?.id) {
        throw new Error("User not available in store");
      }

      // 🔥 Load departments for THIS user
      await GetMyDepartments.run({
        userId: user.id
      });

      // 🔹 Clean departments
      const departments = (GetMyDepartments.data || [])
        .map(d => (d.Department || "").trim());

      // 🔥 Build updated context
      const updatedContext = {
        ...user,
        departments
      };

      // 🔥 Store it
      await storeValue("userContext", updatedContext);

      console.log("UserContext refreshed:", updatedContext);

    } catch (err) {

      console.error("User context load failed:", err);
      showAlert("Failed to load user context", "error");

    }

  }

}