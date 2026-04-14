export default {

  // 🔹 General login check (use on all pages)
  checkAuth: () => {

    if (!appsmith.store.user) {
      showAlert("Please login", "warning");
      navigateTo("Login");
      return false;
    }

    return true;
  },

  // 🔹 Admin-only check (use on Admin page)
  checkAdmin: () => {

    if (!appsmith.store.user) {
      showAlert("Please login", "warning");
      navigateTo("Login");
      return false;
    }

    if (!appsmith.store.user.isAdmin) {
      showAlert("Access denied", "error");
      navigateTo("Main"); // change if your main page name differs
      return false;
    }

    return true;
  }

}