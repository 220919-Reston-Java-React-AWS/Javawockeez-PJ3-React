import SampleQuestionsModel from "../SampleQuestionsModel";

/************ Any Required Set Up or Mocking to be done ************/


// clear mock calls, instances, contexts and results before every test
afterAll(() => {
    jest.clearAllMocks;
})


/************ Tests Below Here ************/

it('constructing SampleQuestionsModel class',() =>{
    const testQuestion = new SampleQuestionsModel(1,'question');

    expect(testQuestion).toBeDefined;
});

it('test class property values',() =>{
    const testQuestion = new SampleQuestionsModel(1,'question');

    expect(testQuestion.id).toBe(1);
    expect(testQuestion.question).toBe("question");
});