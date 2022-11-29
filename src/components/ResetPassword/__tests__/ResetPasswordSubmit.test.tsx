import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import  sampleQuestionsModel  from "../../../models/SampleQuestionsModel";
import ResetPasswordSubmit from "../ResetPasswordSubmit";

import * as auth from '../../../remote/social-media-api/auth.api';
jest.mock('../../../remote/social-media-api/auth.api');
const mockGetAll = auth.apiGetQuestionsByEmail as jest.Mock;
const mockSubmit = auth.apiForgotPassword as jest.Mock;

let container:any = null;

const userEmail = "aidan109@revature.net";
const questions = [ 
{
    id:1,
    question:"question1"
},
{
    id:2,
    question:"question2"
},
{
    id:3,
    question:"question3"
}];
const submitQuestions = [userEmail, "question1", "answer1", "question2", "answer2", "question3", "answer3", "password"];


// mocking function of scrollTo
window.scrollTo = jest.fn(); 

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    mockGetAll.mockReturnValue({status: 200, payload: questions});
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test("Card Mounts correctly", ()=>{
    // Render the component
    act(() => {
        render(<MemoryRouter>
                <ResetPasswordSubmit/>
            </MemoryRouter>, container);
      });

});

test("Inputs exist", ()=>{
    let element = render(<MemoryRouter><ResetPasswordSubmit/></MemoryRouter>, container);

    const answerInput = screen.getByText("Answer");
    expect(answerInput).toBeDefined();

    const passwordInput = screen.getByText("New Password");
    expect(passwordInput).toBeDefined();
});

test("Submitting reset password request", () =>{
    let element = render(<MemoryRouter><ResetPasswordSubmit/></MemoryRouter>, container);
    mockSubmit.mockReturnValue({status: 200, payload: submitQuestions})
    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton)
});

test("Submitting reset password request fail", () =>{
    let element = render(<MemoryRouter><ResetPasswordSubmit/></MemoryRouter>, container);
    mockSubmit.mockReturnValue({status: 400, payload: submitQuestions})
    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton)
});