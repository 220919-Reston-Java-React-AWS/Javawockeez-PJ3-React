import { render, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";

import * as authAPI from '../../../remote/social-media-api/auth.api';
jest.mock('../../../remote/social-media-api/auth.api')
const mockLogin = authAPI.apiLogin as jest.Mock

window.alert = jest.fn();


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

test("Card Mounts correctly", ()=>{
    // Render the component
    act(() => {
        render(<MemoryRouter>
                <Login/>
            </MemoryRouter>, container);
      });

});

test("Email and password inputs exists", ()=>{
    let element = render(<MemoryRouter><Login/></MemoryRouter>, container);

    const emailInput = screen.getByText("Email Address");
    const passwordInput = screen.getByText("Password");

    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();

});

test("Register and reset password links exists", ()=>{
    let element = render(<MemoryRouter><Login/></MemoryRouter>, container);

    const registerLink = screen.getByText("Don't have an account? Sign Up");
    const passwordLink = screen.getByText("Forgot Password? Reset Password");

    expect(registerLink).toBeDefined();
    expect(passwordLink).toBeDefined();
});

test('Submit login', ()=>{
    act(() => {
        let element = render(<MemoryRouter><Login/></MemoryRouter>, container);
    });

    mockLogin.mockReturnValue({ status: 200, payload: user }); // Pretend I actually input the right information

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton)
});

test('Incorrect Password', ()=>{
    act(() => {
        let element = render(<MemoryRouter><Login/></MemoryRouter>, container);
    });

    mockLogin.mockReturnValue({ status: 400, payload: {message: "*Bad Password"} }); // Pretend I actually input the right information

    act(() => {
        const submitButton = screen.getByRole("button");
        fireEvent.click(submitButton)
    });

    //expect(screen.getByText("Bad Password"));
});

test('Error', ()=>{
    act(() => {
        let element = render(<MemoryRouter><Login/></MemoryRouter>, container);
    });

    mockLogin.mockReturnValue({ status: 400, payload: {} }); // Pretend I actually input the right information

    const submitButton = screen.getByRole("button");

    act(() => {
        fireEvent.click(submitButton)
    });

    //expect(screen.getByText("Bad Password"));
});