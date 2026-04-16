export default {

  loadUserContext: async () => {

    try {

      const user = appsmith.store.userContext;

      if (!user?.id) {
        throw new Error("User not available in store");
      }

      // 🔹 GET USER DETAILS
      await GetMyUser.run({
        userId: user.id
      });

      const userData = GetMyUser.data?.[0];

      // 🔹 GET DEPARTMENTS
      await GetMyDepartments.run({
        userId: user.id
      });

      const departments = (GetMyDepartments.data || [])
        .map(d => (d.Department || "").trim());

      // 🔥 BUILD FULL CONTEXT
      const updatedContext = {
        ...user,

        // existing
        departments,

        // 🔥 NEW FIELDS
        isAdmin: Number(userData?.IsAdmin) === 1,
        isApprover: Number(userData?.IsApprover) === 1,
        approvalLimit: Number(userData?.Limit || 0)

      };

      await storeValue("userContext", updatedContext);

      console.log("UserContext:", updatedContext);

    } catch (err) {

      console.error("User context load failed:", err);
      showAlert("Failed to load user context", "error");

    }

  }

}