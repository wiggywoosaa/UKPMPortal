export default {

  login: async () => {

    try {

      // 🔴 VALIDATION
      if (!Input_LoginEmail.text || !Input_LoginPassword.text) {
        showAlert("Enter email and password", "error");
        return;
      }

      // 🔍 GET USER
      await LoginUser.run({
        email: Input_LoginEmail.text
      });

      const user = LoginUser.data?.[0];

      if (!user) {
        showAlert("Invalid login", "error");
        return;
      }

      // 🔐 CHECK PASSWORD
      const hash = CryptoJS.SHA256(Input_LoginPassword.text).toString();

      if (hash !== user.PasswordHash) {
        showAlert("Invalid login", "error");
        return;
      }

      // ✅ STORE USER (FORCE CLEAN TYPES)
      const userObj = {
        id: user.id,
        email: user.Email,
        name: user.Name,
        isAdmin: user.IsAdmin === true || user.IsAdmin === 1
      };

      await storeValue("user", userObj);

      // 📊 LOAD DEPARTMENTS
      await GetUserDepartments.run({
        userId: user.id
      });

      const departments = (GetUserDepartments.data || []).map(d => d.Department);

      await storeValue("userDepartments", departments);

      // 🧠 OPTIONAL: FULL CONTEXT (recommended)
      await storeValue("userContext", {
        ...userObj,
        departments
      });

      // ⏱️ SMALL DELAY (prevents race condition)
      await new Promise(res => setTimeout(res, 100));

      showAlert("Login successful", "success");

      // 🚀 NAVIGATE
      navigateTo("Home");

    } catch (e) {

      console.error("Login error", e);
      showAlert("Login failed", "error");

    }

  }

}