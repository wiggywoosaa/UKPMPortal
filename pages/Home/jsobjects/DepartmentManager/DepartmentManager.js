export default {

  saveRow: async (row) => {

    try {

      if (!row || !row.id) {
        showAlert("Invalid row", "error");
        return;
      }

      // 🔴 BASIC VALIDATION
      if (!row.Department || !row.MicrossEntity) {
        showAlert("Department and Entity required", "error");
        return;
      }

      await UpdateDepartmentInline.run({
        id: row.id,
        Department: row.Department,
        MicrossEntity: row.MicrossEntity,
        RunOrder: row.RunOrder ?? 0
      });

      showAlert("Saved", "success");

      // 🔄 REFRESH TABLE DATA
      await GetDepartments.run();

    } catch (e) {

      console.error("Save error", e);
      showAlert("Save failed", "error");

    }

  }

}