export default {
  loadTabData(tabName) {
    if (tabName === "Dashboard") {
      DashboardByDept.run();
      DashboardOpenActions.run();
      DashboardOpenActionsbyDept.run();
      DashboardOpenSO.run();
      DashboardOpenSOCount.run();
      DashboardOverdueActionsCount.run();
      DashboardOverdueCount.run();
      DashboardOverdueValue.run();
      DashBoardOverduevsOntime.run();
      DashboardPOSOpenAction.run();
      DashboardTotalValuebyMonth.run();
    }
    if (tabName === "Questions") {
      GetPOList.run();
      GetPOH.run();
      GetPODeliverables.run();
      GetPOGroupTests.run();
      GetPONRE.run();
      GetDepartmentSignOff.run();
      GetDepartments.run();
      GetQuestions.run();
    }
 if (tabName === "Action Tracker") {
GetUsersForDropdown.run();
GetOpenActions.run();
GetOverdueActions.run();
    }

 if (tabName === "Risk Assessment") {
GetPOListRisk.run();
GetRisks.run();
	 GetRisksAll.run();
GetRiskSelection.run();

    }
		
 if (tabName === "PM Verifcation") {
GetPOListPM.run();
GetPM.run();
GetPODeliverablesPM.run();
GetPOGroupTestsPM.run();
GetPONREPM.run();
GetPMAnswers.run();
GetPMQuestion.run();

    }
		
 if (tabName === "Final Acceptance") {
GetPOListFA.run();
GetPOHFA.run();
GetAnswersFA.run();
GetPODeliverablesFA.run();
GetPOGroupTestsFA.run();
GetPONREFA.run();
	 GetDepartments.run();

    }
  }
}