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

    mockQ1.mockReturnValue(["q1", "q2", "q3"])
    mockQ2.mockReturnValue(["q4", "q5", "q6"])
    mockQ3.mockReturnValue(["q7", "q8", "q9"])
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
    
    const q1Box = questionBoxes[0]
    const q2Box = questionBoxes[1]
    const q3Box = questionBoxes[2]

    await act(async ()=>{
        await fireEvent.click(q1Box);
        await fireEvent.click(q2Box);
        await fireEvent.click(q3Box);
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

    const submitButton = screen.getByRole("button")

    await act(async() => {
        fireEvent.input(firstName, {target: {value: user.firstName} as HTMLInputElement });
        fireEvent.input(lastName, {target: {value: user.lastName} as HTMLInputElement });
        fireEvent.input(email, {target: {value: user.email} as HTMLInputElement });
        fireEvent.input(password, {target: {value: "password"} as HTMLInputElement });

        answers.forEach(element => {
            fireEvent.input(element, {target: {value: "Test"} as HTMLInputElement });
        });

        await fireEvent.click(submitButton)
    });
});