import { render, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";

// import * as authAPI from '../../../remote/social-media-api/auth.api';
// jest.mock('../../../remote/social-media-api/auth.api')
// const mockLogin = authAPI.apiLogin as jest.Mock


let container:any = null;

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
    let element = render(<MemoryRouter><Login/></MemoryRouter>, container);

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton)

});