export default {
  login: async () => {

    // 🔹 VALIDATION
    if (!Input_Email.text || !Input_Password.text) {
      showAlert("Enter email and password", "error");
      return;
    }

    // 🔹 GET USER
    await GetMyUser.run({
      email: Input_Email.text
    });

    const user = GetMyUser.data?.[0];

    if (!user) {
      showAlert("Invalid login", "error");
      return;
    }

    // 🔹 CHECK PASSWORD
    const hash = CryptoJS.SHA256(Input_Password.text).toString();

    if (hash !== user.PasswordHash) {
      showAlert("Invalid login", "error");
      return;
    }

    // 🔥 LOAD DEPARTMENTS
    await GetUserDepartments.run({
      userId: user.id
    });

    const departments = (GetUserDepartments.data || [])
      .map(d => (d.Department || "").trim())
      .filter(Boolean);

    // 🔥 BUILD USER CONTEXT
    const userContext = {
      id: user.id,
      email: user.Email,
      name: user.Name,
      isAdmin: user.IsAdmin === 1 || user.IsAdmin === true,
      departments
    };

    // 🔥 STORE SESSION
    await storeValue("userContext", userContext);

    // 🔥 MARK AUTH READY (CRITICAL)
    await storeValue("authReady", true);

    console.log("Login success:", userContext);

    // 🔹 NAVIGATE
    navigateTo("Home");

  }
};