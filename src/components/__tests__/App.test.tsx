import { render, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";

let container:any = null;

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

afterAll(() => {
    jest.clearAllMocks();
});

test("Card Mounts correctly", ()=>{
    // Render the component
    render(<App/>, container);
});