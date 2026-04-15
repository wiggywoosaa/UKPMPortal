export default {

  checkAuth: () => {

    const ctx = appsmith.store.userContext;
    const ready = appsmith.store.authReady;

    // 🔴 WAIT UNTIL LOGIN FLOW COMPLETE
    if (!ready) {
      console.log("Auth waiting...");
      return false;
    }

    // 🔴 NOT LOGGED IN
    if (!ctx || !ctx.id) {
      showAlert("Please login", "warning");
      navigateTo("Login");
      return false;
    }

    return true;
  },

  checkAdmin: () => {

    const ctx = appsmith.store.userContext;
    const ready = appsmith.store.authReady;

    if (!ready) return false;

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

};