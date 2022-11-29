import { User } from "../../context/user.context";
import Account from "../Account";
import securityQuestionsModel from "../SecurityQuestionsModel";

/************ Any Required Set Up or Mocking to be done ************/

const user = {
    "id": 2,
    "email": "aidan109@revature.net",
    "password": "password",
    "firstName": "Aidan",
    "lastName": "Shafer"
};

// clear mock calls, instances, contexts and results before every test
afterAll(() => {
    jest.clearAllMocks;
})


/************ Tests Below Here ************/

it('constructing SecurityQuestionsModel class',() =>{
    const testQuestion = new securityQuestionsModel(1,'question', 'answer', user); 

    expect(testQuestion).toBeDefined;
});

it('test class property values',() =>{
    const testQuestion = new securityQuestionsModel(1,'question', 'answer', user);

    expect(testQuestion.id).toBe(1);
    expect(testQuestion.question).toBe("question");
    expect(testQuestion.answer).toBe("answer");
    expect(testQuestion.user).toBe(user);
});