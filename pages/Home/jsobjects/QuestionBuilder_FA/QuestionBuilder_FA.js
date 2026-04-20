export default {
  getQuestionsFA: () => {

    const questions = GetQuestionsByDeptFA.data || [];
    const answers = GetAnswersFA.data || [];

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