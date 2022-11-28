import { render, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { UserContext } from "../../../context/user.context";

import Navbar from "../Navbar";

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


test("Card Mounts correctly", ()=>{
    // Render the component
    act(() => {
        render(<MemoryRouter>
                <Navbar/>
            </MemoryRouter>, container);
      });

});

test("Navbar logged out", ()=>{
    // Render the component
    let element = render(<MemoryRouter><Navbar/></MemoryRouter>, container);

    const loginButton = screen.getByRole("button");

    fireEvent.click(loginButton);
    //console.log(loginButton)

});

test("Navbar logged in", ()=>{
    // The userContext in which to run the element (essentially, the credentials to 'sign-in' the test user)
    let usrContext = {
        user: user,
        setUser: ()=>{}
    }

    // Render the component
    let element = render(<MemoryRouter><UserContext.Provider value={usrContext}><Navbar/></UserContext.Provider></MemoryRouter>, container);

    const profileButton = screen.getByRole("button");

    expect(profileButton.getAttribute("aria-haspopup")).toBe("true");
    fireEvent.click(profileButton);

    //const userOptions = screen.getByRole("tooltip")
    const profileLink = screen.getByText("Profile");
    const accountLink = screen.getByText("My Account");
    const logoutLink = screen.getByText("Logout");
    expect(profileLink).toBeDefined();
    expect(accountLink).toBeDefined();
    expect(logoutLink).toBeDefined();

    fireEvent.click(profileLink);
    fireEvent.click(accountLink);
    fireEvent.click(logoutLink);

    fireEvent.click(profileButton);
    //expect(screen.queryByText("Profile")).toBeEmpty();
});