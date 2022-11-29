import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import  sampleQuestionsModel  from "../../../models/SampleQuestionsModel";
import ResetPasswordSubmit from "../ResetPasswordSubmit";

import * as auth from '../../../remote/social-media-api/auth.api';
jest.mock('../../../remote/social-media-api/auth.api');
const mockGetAll = auth.apiGetQuestionsByEmail as jest.Mock;

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

{/*test("Get Questions", async ()=>{
    const mockedData = ({ data: questions });
    render(<ResetPasswordSubmit />);

    const expectedQuestions = [{ type: 'Fetch_Questions', payload: mockedData.data }];
        
    const questionList = await waitFor(() => screen.findAllByTestId("todo"));
        
        expect(todoList).toHaveLength(3);
});

test('Submit email', ()=>{
    let element = render(<MemoryRouter><ResetPasswordSubmit/></MemoryRouter>, container);

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton)
    
});*/}