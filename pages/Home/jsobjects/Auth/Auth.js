export default {

  // 🔹 SAFE login check
  checkAuth: () => {

    const user = appsmith.store.user;

    // 🟡 STORE NOT READY YET → DO NOTHING
    if (user === undefined) {
      return false;
    }

    // 🔴 NOT LOGGED IN
    if (user === null) {
      showAlert("Please login", "warning");
      navigateTo("Login");
      return false;
    }

    // 🟢 LOGGED IN
    return true;
  },

  // 🔹 SAFE admin check
  checkAdmin: () => {

    const user = appsmith.store.user;

    // 🟡 WAIT FOR STORE
    if (user === undefined) {
      return false;
    }

    // 🔴 NOT LOGGED IN
    if (!user) {
      showAlert("Please login", "warning");
      navigateTo("Login");
      return false;
    }

    // 🔴 NOT ADMIN
    if (!user.isAdmin) {
      showAlert("Access denied", "error");
      navigateTo("Home"); // safer than Main unless you renamed it
      return false;
    }

    return true;
  }

}