export default {

  checkAuth: () => {

    const ctx = appsmith.store.userContext;

    // 🟡 CASE 1: STORE NOT INITIALISED YET → DO NOTHING
    if (typeof ctx === "undefined") {
      console.log("Auth: store not ready, skipping");
      return true;
    }

    // 🔴 CASE 2: EXPLICITLY NOT LOGGED IN
    if (ctx === null) {
      console.log("Auth: no user, redirecting");
      navigateTo("Login");
      return false;
    }

    // 🔴 CASE 3: BROKEN CONTEXT
    if (!ctx?.id) {
      console.log("Auth: invalid userContext, redirecting");
      navigateTo("Login");
      return false;
    }

    // ✅ CASE 4: VALID SESSION
    return true;
  },

  checkAdmin: () => {

    const ctx = appsmith.store.userContext;

    if (typeof ctx === "undefined") return true;
    if (!ctx?.id) {
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