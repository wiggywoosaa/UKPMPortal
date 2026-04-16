export default {
  submitUser: async () => {

    // 🚀 VALIDATION
    if (!Input_Email.text || !Input_Name.text) {
      showAlert("Email and Name required", "error");
      return;
    }

    if (!appsmith.store.selectedUser && !Input_Password.text) {
      showAlert("Password required for new user", "error");
      return;
    }

    // 🚀 HASH PASSWORD
    let hash = null;
    if (Input_Password.text) {
      hash = CryptoJS.SHA256(Input_Password.text).toString();
    }

    let userId = appsmith.store.selectedUser?.id;

    // 🚀 CREATE USER
    if (!appsmith.store.selectedUser) {

      await CreateUser.run({
        Email: Input_Email.text,
        Name: Input_Name.text,
        PasswordHash: hash,
        IsAdmin: Switch_IsAdmin.isSwitchedOn ? 1 : 0,
        IsActive: Switch_IsActive.isSwitchedOn ? 1 : 0
      });

      await GetUsers.run();

      const newUser = GetUsers.data.find(
        u => u.Email === Input_Email.text
      );

      if (!newUser) {
        showAlert("User created but not found", "error");
        return;
      }

      userId = newUser.id;
      storeValue("selectedUser", newUser);

      showAlert("User created");

    } else {

      await UpdateUser.run({
  id: userId,
  Name: Input_Name.text,
  IsAdmin: Switch_IsAdmin.isSwitchedOn ? 1 : 0,
  IsActive: Switch_IsActive.isSwitchedOn ? 1 : 0,
  IsApprover: Switch_IsApprover.isSwitchedOn ? 1 : 0,
  Limit: Input_ApprovalLimit.text ? Number(Input_ApprovalLimit.text) : null,
  PasswordHash: hash
});

      showAlert("User updated");
    }

    // 🚀 CLEAN DEPARTMENTS
    const departments = (MS_UserDepartments.selectedOptionValues || [])
      .map(d => d.trim());

    // 🚀 DELETE OLD
    await DeleteUserDepartments.run({ userId });

    // 🚀 INSERT NEW
    for (const dep of departments) {
      await InsertUserDepartment.run({
        userId,
        department: dep
      });
    }

    showAlert("Departments saved");

    // 🚀 REFRESH USERS LIST
    await GetUsers.run();

    // 🔥 ONLY REFRESH CONTEXT IF CURRENT USER WAS EDITED
    const currentUserId = appsmith.store.userContext?.id;

    if (currentUserId === userId) {
      await UserContext.load(); // 👈 use your loader
      showAlert("Your permissions have been updated", "info");
    }

    // 🚀 RESET FORM
    resetWidget("Form1");

  }
}