export default {

  logout: () => {

    storeValue("userContext", null);
    storeValue("authReady", false);

    navigateTo("Login");

  }

};