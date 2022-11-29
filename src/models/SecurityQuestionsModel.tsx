import Account from "./Account";

export default class securityQuestionsModel{
    id: number;
    question: string;
    answer: string;
    user: Account;

    constructor(id: number, question: string, answer: string, user: Account){
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.user = user;
    }
}