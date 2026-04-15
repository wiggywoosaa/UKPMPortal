export default {
  login: async () => {

    // 🔹 VALIDATE INPUT
    if (!Input_LoginEmail.text || !Input_LoginPassword.text) {
      showAlert("Enter email and password", "error");
      return;
    }

    // 🔹 GET USER
    await LoginUser.run({
      email: Input_LoginEmail.text
    });

    const user = LoginUser.data?.[0];

    if (!user) {
      showAlert("Invalid login", "error");
      return;
    }

    // 🔹 CHECK PASSWORD
    const hash = CryptoJS.SHA256(Input_LoginPassword.text).toString();

    if (hash !== user.PasswordHash) {
      showAlert("Invalid login", "error");
      return;
    }

    // 🔥 LOAD USER DEPARTMENTS (CRITICAL)
    await GetUserDepartments.run({
      userId: user.id
    });

    const departments = (GetUserDepartments.data || [])
      .map(d => (d.Department || "").trim())
      .filter(d => d !== "");

    // 🔥 STORE FULL CONTEXT (SINGLE SOURCE OF TRUTH)
    const userContext = {
      id: user.id,
      email: user.Email,
      name: user.Name,
      isAdmin: user.IsAdmin === 1 || user.IsAdmin === true,
      departments: departments
    };

    await storeValue("userContext", userContext);

    // 🔹 OPTIONAL: DEBUG
    console.log("UserContext:", userContext);

    // 🔹 NAVIGATE
    navigateTo("Home");

  }
};