export default {

  checkAuth: () => {

    const ctx = appsmith.store.userContext;

    // 🔴 STILL LOADING → DO NOTHING
    if (ctx === undefined) {
      console.log("Auth: waiting for userContext...");
      return false;
    }

    // 🔴 NOT LOGGED IN → REDIRECT
    if (!ctx || !ctx.id) {
      showAlert("Please login", "warning");
      navigateTo("Login");
      return false;
    }

    // ✅ OK
    return true;
  },

  checkAdmin: () => {

    const ctx = appsmith.store.userContext;

    if (ctx === undefined) return false;

    if (!ctx || !ctx.id) {
      navigateTo("Login");
      return false;
    }

    if (!ctx.isAdmin) {
      showAlert("Access denied", "error");
      navigateTo("Home");
      return false;
    }

    return true;
  }

}