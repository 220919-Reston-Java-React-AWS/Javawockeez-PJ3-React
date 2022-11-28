import { render, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { sampleQuestionsModel } from "../../../models/SampleQuestionsModel";
import ResetPasswordSubmit from "../ResetPasswordSubmit";

let container:any = null;

const user = {
    "id": 2,
    "email": "aidan109@revature.net",
    "password": "password",
    "firstName": "Aidan",
    "lastName": "Shafer"
};
const question1:sampleQuestionsModel = {
    id:1,
    question:"question1"
};
const question2:sampleQuestionsModel = {
    id:2,
    question:"question2"
};
const question3:sampleQuestionsModel = {
    id:3,
    question:"question3"
};
const questions1:sampleQuestionsModel[] = [question1, question2, question3];


// mocking function of scrollTo
window.scrollTo = jest.fn(); 

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
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

{/*test("Questions display", ()=>{
    let element = render(<MemoryRouter><ResetPasswordSubmit/></MemoryRouter>, container);

    window.scrollTo({top:0, left:0, behavior: 'smooth'});
    const getQuestions = 
    const childElement = element.getByText(Object(questions1![0])["question"]);
    expect(childElement).toBeInTheDocument();
});

test('Submit email', ()=>{
    let element = render(<MemoryRouter><ResetPasswordSubmit/></MemoryRouter>, container);

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton)
    
});*/}