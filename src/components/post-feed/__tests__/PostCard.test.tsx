import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter} from "react-router-dom";
import Post from "../../../models/Post";
import { PostCard } from "../PostCard";

let container:any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  //container = <MemoryRouter><div></div></MemoryRouter>;
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const key = 1
const user = {
    "id": 2,
    "email": "aidan109@revature.net",
    "firstName": "Aidan",
    "lastName": "Shafer"
}
let post:Post = {
    id:1,
    text:"Hi",
    imageUrl:"",
    comments:[],
    author:user
}

test("Card Mounts correctly", ()=>{

    act(() => {
        render(<MemoryRouter><PostCard post={post} key={key} /></MemoryRouter>, container);
      });

});

test('Comment button expands', ()=>{
    act(() => {
        render(<MemoryRouter><PostCard post={post} key={key} /></MemoryRouter>, container);
      });

    const commentButton = screen.getByRole("button")

    expect(commentButton.getAttribute("aria-expanded")).toBe("false")
    fireEvent.click(commentButton);
    expect(commentButton.getAttribute("aria-expanded")).toBe("true")
});