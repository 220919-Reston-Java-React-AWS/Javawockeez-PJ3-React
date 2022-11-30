import { render, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import Register from "../Register";

//import { apiAuthSampleQuestions1, apiAuthSampleQuestions2, apiAuthSampleQuestions3, apiGetQuestionsByEmail, apiRegister } from '../../remote/social-media-api/auth.api';
import * as authAPI from '../../../remote/social-media-api/auth.api';
jest.mock('../../../remote/social-media-api/auth.api');
const mockQ1 = authAPI.apiAuthSampleQuestions1 as jest.Mock;
const mockQ2 = authAPI.apiAuthSampleQuestions2 as jest.Mock;
const mockQ3 = authAPI.apiAuthSampleQuestions3 as jest.Mock;
const mockRegister = authAPI.apiRegister as jest.Mock;




let container:any = null;

const user = {
    "id": 1,
    "email": "test@test.net",
    "firstName": "Testy",
    "lastName": "McTestface"
}


beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);

    window.scrollTo = jest.fn();

    mockQ1.mockReturnValue({payload: [{
            "id": 1,
            "question": "In what city were you born?"
        },
        {
            "id": 3,
            "question": "What is your mother's maiden name?"
        },
        {
            "id": 2,
            "question": "What is the name of your favorite pet?"
        }]});
    mockQ2.mockReturnValue({payload: [{
            "id": 1,
            "question": "What high school did you attend?"
        },
        {
            "id": 2,
            "question": "What was the name of your elementary school?"
        },
        {
            "id": 3,
            "question": "What was the make of your first car?"
        }]});
    mockQ3.mockReturnValue({payload: [{
            "id": 1,
            "question": "What was your favorite food as a child?"
        },
        {
            "id": 2,
            "question": "Where did you meet your spouse?"
        },
        {
            "id": 3,
            "question": "What year was your father (or mother) born?"
        }]});
    mockRegister.mockReturnValue({status:200, payload:user})
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

afterAll(() => {
    jest.clearAllMocks();
  });

test("Card Mounts correctly", async()=>{
    // Render the component
    await act(async() => {
        await render(<MemoryRouter>
                <Register/>
            </MemoryRouter>, container);
    });
});

test("Click options for questions", async()=>{
    // Render the component
    await act(async() => {
        await render(<MemoryRouter>
                <Register/>
            </MemoryRouter>, container);
    });

    const questionBoxes = screen.getAllByRole("combobox")
    
    let q1Box = questionBoxes[0]
    let q2Box = questionBoxes[1]
    let q3Box = questionBoxes[2]

    act(()=>{
        // Change the first dropdown to the second option
        fireEvent.change(q1Box, { target: { value: 2 } });

        // Change the second dropdown to the second option
        fireEvent.change(q2Box, { target: { value: 2 } });

        // Change the third dropdown to the second option
        fireEvent.change(q3Box, { target: { value: 2 } });
    });
});

test("Submit Registration", async()=>{
    // Render the component
    await act(async() => {
        await render(<MemoryRouter>
                <Register/>
            </MemoryRouter>, container);
    });

    const firstName = screen.getByLabelText("First Name", {exact:false});
    const lastName = screen.getByLabelText("Last Name", {exact:false});
    const email = screen.getByLabelText("Email Address", {exact:false});
    const password = screen.getByLabelText("Password", {exact:false});
    const answers = screen.getAllByLabelText("Answer", {exact:false});

    const submitButton = screen.getByRole("button") // Submit button

    // Input data
    await act(async() => {
        fireEvent.input(firstName, {target: {value: user.firstName} as HTMLInputElement });
        fireEvent.input(lastName, {target: {value: user.lastName} as HTMLInputElement });
        fireEvent.input(email, {target: {value: user.email} as HTMLInputElement });
        fireEvent.input(password, {target: {value: "password"} as HTMLInputElement });

        answers.forEach(element => {
            fireEvent.input(element, {target: {value: "Test"} as HTMLInputElement });
        });
    });

    // Submit
    await act(async()=>{
        await fireEvent.click(submitButton)
    });
});

test("Submit Registration Fail", async()=>{
    // Change the return from the backend on registration to a fail
    mockRegister.mockReturnValue({status:400})

    // Render the component
    await act(async() => {
        await render(<MemoryRouter>
                <Register/>
            </MemoryRouter>, container);
    });

    const firstName = screen.getByLabelText("First Name", {exact:false});
    const lastName = screen.getByLabelText("Last Name", {exact:false});
    const email = screen.getByLabelText("Email Address", {exact:false});
    const password = screen.getByLabelText("Password", {exact:false});
    const answers = screen.getAllByLabelText("Answer", {exact:false});

    const submitButton = screen.getByRole("button") // Submit button

    // Input data
    await act(async() => {
        fireEvent.input(firstName, {target: {value: user.firstName} as HTMLInputElement });
        fireEvent.input(lastName, {target: {value: user.lastName} as HTMLInputElement });
        fireEvent.input(email, {target: {value: user.email} as HTMLInputElement });
        fireEvent.input(password, {target: {value: "password"} as HTMLInputElement });

        answers.forEach(element => {
            fireEvent.input(element, {target: {value: "Test"} as HTMLInputElement });
        });
    });

    // Submit
    await act(async()=>{
        await fireEvent.click(submitButton)
    });
});