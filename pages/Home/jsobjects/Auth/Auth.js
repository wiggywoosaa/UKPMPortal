export default {

  checkAuth: () => {

    const user = appsmith.store.user;

    // 🟡 STORE NOT READY
    if (user === undefined) return false;

    // 🔴 NOT LOGGED IN
    if (user === null) {
      showAlert("Please login", "warning");
      navigateTo("Login");
      return false;
    }

    return true;
  },

  checkAdmin: () => {

    const user = appsmith.store.user;

    if (user === undefined) return false;

    if (!user) {
      showAlert("Please login", "warning");
      navigateTo("Login");
      return false;
    }

    if (!user.isAdmin) {
      showAlert("Access denied", "error");
      return false;
    }

    return true;
  }

}