export default {
  getQuestionsArchive: () => {

    const questions = GetQuestionsByDeptArchive.data || [];
    const answers = GetAnswersArchive.data || [];

    return questions.map(q => {
      const existing = answers.find(a => a.QuestionId === q.id);

      return {
        ...q,
        Answer: existing ? existing.Answer : null,
        YesNo: existing ? existing.YesNo : null
      };
    });
  }
};
