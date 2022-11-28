import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import CreatePostForm from "../CreatePostForm";

let container:any = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

test("Card Mounts correctly", ()=>{
    // Render the component
    act(() => {
        render(<CreatePostForm/>, container);
      });

});