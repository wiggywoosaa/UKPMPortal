export default {

  updateStatus: async (row) => {

    if (!row) {
      showAlert("No row received", "error");
      return;
    }

    await UpdateActionStatus.run({
      questionId: row.QuestionId,
      po: row.MicrossSalesOrderReference,
      status: row.Status,
      responsible: row.ResponsiblePerson   // 👈 ADD THIS
    });

    showAlert("Action updated", "success");

    await Promise.all([
      GetAnswers.run(),
      GetOpenActions.run(),
      GetOverdueActions.run()
    ]);

  }

}