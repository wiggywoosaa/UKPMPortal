export default {

  loadUserContext: async () => {

    try {

      const user = appsmith.store.userContext;

      if (!user?.id) {
        throw new Error("User not available in store");
      }

      // 🔹 get user details
      await GetMyUser.run({
        userId: user.id
      });

      const userData = GetMyUser.data?.[0];

      // 🔹 get departments
      await GetMyDepartments.run({
        userId: user.id
      });

      const departments = (GetMyDepartments.data || [])
        .map(d => (d.Department || "").trim());

      // 🔥 build full context
      const updatedContext = {
        id: user.id,
        name: userData?.Name,
        email: userData?.Email,

        departments,

        isAdmin: Number(userData?.IsAdmin) === 1,
        isApprover: Number(userData?.IsApprover) === 1,
        approvalLimit: Number(userData?.Limit || 0)
      };

      await storeValue("userContext", updatedContext);

      console.log("UserContext loaded:", updatedContext);

    } catch (err) {

      console.error("User context load failed:", err);
      showAlert("Failed to load user context", "error");

    }

  }

}