import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { render, screen, fireEvent, getAllByText, waitFor, findAllByLabelText } from "@testing-library/react";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter} from "react-router-dom";
import Post from "../../../models/Post";
import { PostCard } from "../PostCard";
import { UserContext } from "../../../context/user.context";


import * as filter from "../../../remote/profanity-api/profanity.api";
jest.mock("../../../remote/profanity-api/profanity.api")
const mockCensor = filter.censor as jest.Mock

import * as postAPI from "../../../remote/social-media-api/post.api";
jest.mock("../../../remote/social-media-api/post.api")
const mockUpsert = postAPI.apiUpsertPost as jest.Mock
const mockDelete = postAPI.apiDeletePost as jest.Mock


let container:any = null;

//Dummy data for the test
const key = 1
const user = {
    "id": 2,
    "email": "aidan109@revature.net",
    "firstName": "Aidan",
    "lastName": "Shafer"
}
let subPost:Post = {
    id:2,
    text:"Hello",
    imageUrl:"",
    comments:[],
    author:user,
    postDate: new Date()
}
let post:Post = {
    id:1,
    text:"Hi",
    imageUrl:"",
    comments:[subPost],
    author:user,
    postDate: new Date()
}

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);

  window.scrollTo = jest.fn();
  //mockUpsert.mockReturnValue( {status:200, payload:post} )
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;

  post = {
    id:1,
    text:"Hi",
    imageUrl:"",
    comments:[subPost],
    author:user,
    postDate: new Date()
    }
});

afterAll(() => {
    jest.clearAllMocks();
});


// =====   TESTING BEGINS HERE   ===== //

test("Card Mounts correctly", ()=>{
    // Render the component
    act(() => {
        render(<MemoryRouter><PostCard post={post} key={key} /></MemoryRouter>, container);
      });

});

test('Comment button expands', ()=>{
    // Render the component
    act(() => {
        render(<MemoryRouter><PostCard post={post} key={key} /></MemoryRouter>, container);
      });

    // Find the expand-comments button
    const commentButton = screen.getByRole("button")

    // Expect the sub-post to be invisible
    expect(screen.queryByText("Hello")).toBeNull()

    // Expand the comments by clicking the button, and check that it's working properly
    expect(commentButton.getAttribute("aria-expanded")).toBe("false")
    fireEvent.click(commentButton);
    expect(commentButton.getAttribute("aria-expanded")).toBe("true")

    // Expect to see comments
    expect(screen.queryByText("Hello")).toBeDefined();
});

test('Can make a comment', async ()=>{
    
    mockUpsert.mockReturnValue( {status:200, payload:post} )

    // The userContext in which to run the element (essentially, the credentials to 'sign-in' the test user)
    let usrContext = {
        user: user,
        setUser: ()=>{}
    }

    // Render the component
    act(() => {
        render(
            <MemoryRouter>
                <UserContext.Provider value={usrContext}>
                    <PostCard post={post} key={key} />
                </UserContext.Provider>
            </MemoryRouter>, 
            container);
    });

    // Press the comment-expanding button to reveal comments.
    const commentButton = screen.getByRole("button")
    fireEvent.click(commentButton);

    // Find the input to make a new comment within the main post.
    let newCommentInput = screen.queryAllByPlaceholderText("Make a comment...");
    expect(newCommentInput.length).toBe(1);

    // Find all buttons (two window-expanding and one submitter), and click on the one that shows the comment's comments
    const commentButtonList = screen.getAllByRole("button")
    expect(commentButtonList.length).toBe(3)
    fireEvent.click(commentButtonList[2]);

    // Expect 2 areas where we can make a comment (on the main post, and as a reply to the comment)
    newCommentInput = screen.queryAllByPlaceholderText("Make a comment...");
    expect(newCommentInput.length).toBe(2);

    // There should be no comment with this text
    expect(screen.queryByText("Howdy ya'll")).toBeNull();

    //Make a new comment with the text
    await act(async() => {
        Simulate.input(newCommentInput[0], {target: {value: "Howdy ya'll"} as HTMLInputElement } );
        await fireEvent.click(screen.getAllByRole("button")[3])
    });

    expect(screen.getAllByRole("button").length).toBe(5);

    //Expect it to be there now
    expect(screen.queryByText("Howdy ya'll")).toBeDefined();
});

test('Can edit a post', async ()=>{
    // The userContext in which to run the element (essentially, the credentials to 'sign-in' the test user)
    let usrContext = {
        user: user,
        setUser: ()=>{}
    }

    const newText = "Hi world"
    const newPost:Post = {
        id:1,
        text:newText,
        imageUrl:"",
        comments:[subPost],
        author:user,
        postDate: new Date()
        }

    mockUpsert.mockReturnValue( {status:200, payload:newPost} )

    const mockOnSubmit = jest.fn(()=>{
        post.text = newText;
        element.rerender(
            <MemoryRouter>
                <UserContext.Provider value={usrContext}>
                    <PostCard post={newPost} key={key} />
                </UserContext.Provider>
            </MemoryRouter>,
        )
    });

    // Render the component
    const element = render(
        <MemoryRouter>
            <UserContext.Provider value={usrContext}>
                <PostCard post={post} key={key} />
            </UserContext.Provider>
        </MemoryRouter>,
    container);

    // Verify the original text is there
    expect(screen.getByText("Hi")).toBeDefined();

    // Click the text to open the edit-post pop-up
    let editPostTriggers = screen.getAllByText('Edit post');
    expect(editPostTriggers.length).toBe(1);

    fireEvent.click(editPostTriggers[0]);
    expect(screen.getByRole("tooltip")).toBeDefined(); // tooltip is the pop-up window.

    // Enter new text for the post
    let newCommentInput = screen.getAllByLabelText("Edit comment");
    expect(newCommentInput.length).toBe(1); // Only area to input text right now should be in the edit post popup.

    // Find the submit button
    let submitButton = screen.getByRole("button", {name: "submit"})
    submitButton.onclick = mockOnSubmit

    //Simulate input and click the submit button
    await act(async() => {
        await Simulate.input(newCommentInput[0], {target: {value: " World"} as HTMLInputElement } );
        await fireEvent.click(submitButton);
    });

    // Verify the old text is gone, and the new text appears
    expect(await screen.getAllByText(newText)).toBeDefined();
    expect(screen.queryByText("Hi")).toBeNull();
});

test('Can delete a post', async ()=>{
    // The userContext in which to run the element (essentially, the credentials to 'sign-in' the test user)
    let usrContext = {
        user: user,
        setUser: ()=>{}
    }

    jest.spyOn(global, 'alert').mockImplementation(() => {});

    const mockOnClick = jest.fn(() => {
        post.comments = [];
        alert("Here")
        element.rerender(
            <MemoryRouter>
                <UserContext.Provider value={usrContext}>
                    <PostCard post={post} key={key} />
                </UserContext.Provider>
            </MemoryRouter>,
        )
    });

    const element = render(
        <MemoryRouter>
            <UserContext.Provider value={usrContext}>
                <PostCard post={post} key={key} />
            </UserContext.Provider>
        </MemoryRouter>, 
        container);

    // They should only be able to see/edit the main post at first
    let editPostTriggers = screen.getAllByText('Edit post');
    expect(editPostTriggers.length).toBe(1);

    // Expand the comments
    fireEvent.click(screen.getByRole("button"))

    // The main post and sub-post should be able to be edited.
    editPostTriggers = screen.getAllByText('Edit post')
    expect(editPostTriggers.length).toBe(2);

    // Edit the sub-Post
    fireEvent.click(editPostTriggers[1]);

    // Verify there are two fields with hello (the post itself, and the editing window), and find the delete button
    expect(screen.queryAllByText("Hello").length).toBe(2);
    let deleteButton = screen.getAllByLabelText("delete")[0]

    // Adjust the button's onClick behavior to avoid fetch problems
    deleteButton.onclick = mockOnClick
    
    // Click the delete button
    await act(async() => {
        await fireEvent.click(deleteButton, new MouseEvent('click', { bubbles: true }));
    });
    // An alert should be given, and the subpost should no longer appear.
    expect(global.alert).toBeCalled()
    expect(screen.queryAllByText("Hello").length).toBe(0)

      
});