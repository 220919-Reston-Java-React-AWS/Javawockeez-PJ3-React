import { render, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import ResetPassword from "../ResetPassword";

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

test("Card Mounts correctly", ()=>{
    // Render the component
    act(() => {
        render(<MemoryRouter>
                <ResetPassword/>
            </MemoryRouter>, container);
      });

});

test("Email input exists", ()=>{
    let element = render(<MemoryRouter><ResetPassword/></MemoryRouter>, container);

    const emailInput = screen.getByText("Email Address");

    expect(emailInput).toBeDefined();
});

test('Submit email', ()=>{
    let element = render(<MemoryRouter><ResetPassword/></MemoryRouter>, container);

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton)
    
});