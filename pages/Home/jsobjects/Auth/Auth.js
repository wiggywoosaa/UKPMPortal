export default {

  checkAuth: () => {

    const ctx = appsmith.store.userContext;

    // 🔴 NOT LOGGED IN (covers undefined + null)
    if (!ctx || !ctx.id) {
      console.log("Auth: not authenticated");
      navigateTo("Login");
      return false;
    }

    return true;
  },

  checkAdmin: () => {

    const ctx = appsmith.store.userContext;

    if (!ctx || !ctx.id) {
      navigateTo("Login");
      return false;
    }

    if (!ctx.isAdmin) {
      navigateTo("Home");
      return false;
    }

    return true;
  }

};