export default {

  addRisk: async (prob, impact, row) => {

    if (!Select_PORisk.selectedOptionValue) {
      showAlert("Select a PO first", "error");
      return;
    }

    await InsertRisks.run({
      po: Select_PORisk.selectedOptionValue,
      probability: prob,
      impact: impact,
      riskDescription: row?.RiskDescription || "",
      mitigation: row?.Mitigation || "",
      createdBy: appsmith.store.user?.name
    });

    showAlert("Risk added", "success");

    await GetRisks.run();
  },

  updateRisk: async (updatedRow) => {

  if (!updatedRow) {
    showAlert("No row data", "error");
    return;
  }

  await UpdateRisk.run({
    id: updatedRow.id,
    riskDescription: updatedRow.RiskDescription,
    mitigation: updatedRow.Mitigation
  });

  showAlert("Risk updated", "success");

  await GetRisks.run();

},
getOverallRisk: () => {

  const risks = GetRisks.data || [];

  if (!risks.length) return "Low";

  const probMap = { Low: 1, Medium: 2, High: 3 };
  const impactMap = { Low: 1, Medium: 2, High: 3 };

  // 🚀 ONLY RISKS WITH NO MITIGATION
  const activeRisks = risks.filter(r => {
    return !r.Mitigation || r.Mitigation.trim() === "";
  });

  if (!activeRisks.length) return "Low"; // all mitigated

  const scores = activeRisks.map(r => {
    const p = probMap[r.Probability] || 0;
    const i = impactMap[r.Impact] || 0;
    return p * i;
  });

  const maxScore = Math.max(...scores);

  if (maxScore >= 6) return "High";
  if (maxScore >= 3) return "Medium";
  return "Low";
}

}