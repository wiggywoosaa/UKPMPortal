export default {
  login: async () => {

    if (!Input_LoginEmail.text || !Input_LoginPassword.text) {
      showAlert("Enter email and password", "error");
      return;
    }

    await LoginUser.run({
      email: Input_LoginEmail.text
    });

    const user = LoginUser.data[0];

    if (!user) {
      showAlert("Invalid login", "error");
      return;
    }

    const hash = CryptoJS.SHA256(Input_LoginPassword.text).toString();

    if (hash !== user.PasswordHash) {
      showAlert("Invalid login", "error");
      return;
    }

    // 🔥 STEP 1 — STORE BASE USER (NO DEPARTMENTS YET)
    await storeValue("userContext", {
      id: user.id,
      email: user.Email,
      name: user.Name,
      isAdmin: user.IsAdmin === true || user.IsAdmin === 1 || user.IsAdmin === "true",
      departments: []
    });

    // 🔥 STEP 2 — LOAD FULL CONTEXT (DEPARTMENTS)
    await UserContext.loadUserContext();

    // 🔥 STEP 3 — NAVIGATE AFTER CONTEXT READY
    navigateTo("Home?bypass=true", {}, "SAME_WINDOW");
    storeValue("activeTab", "Dashboard");

  }
}