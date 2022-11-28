import Account from "./Account";

export interface securityQuestionsModel{
    id: number,
    question: string,
    answer: string,
    user: Account
}