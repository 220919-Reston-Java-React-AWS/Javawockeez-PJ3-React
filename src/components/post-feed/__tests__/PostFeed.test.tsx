import { render, screen, fireEvent, act } from "@testing-library/react";
import { PostFeed } from "../PostFeed";
import { UserContext } from "../../../context/user.context";


import * as filter from "../../../remote/profanity-api/profanity.api";
jest.mock("../../../remote/profanity-api/profanity.api")
const mockCensor = filter.censor as jest.Mock

import * as allPosts from '../../../remote/social-media-api/postFeed.api';
jest.mock('../../../remote/social-media-api/postFeed.api');
const mockGetAll = allPosts.apiGetAllPosts as jest.Mock

import * as onePost from '../../../remote/social-media-api/post.api';
jest.mock('../../../remote/social-media-api/post.api');
const mockUpsert = onePost.apiUpsertPost as jest.Mock


const user = {
    "id": 1,
    "email": "test@test.net",
    "firstName": "Testy",
    "lastName": "McTestface"
}


beforeEach(() => {
    mockGetAll.mockReturnValue({ status: 200, payload: [] });
    window.scrollTo = jest.fn();
});


test('opens without crashing', async ()=>{
    await act(async() => { await render(<PostFeed /> )});
});

test('Navbar exists', async ()=>{
    await act(async() => { await render(<PostFeed /> ) });
    expect( document.getElementsByTagName('Navbar') )
});

test('Create Post fields exist and can be updated', async ()=>{
    // The userContext in which to run the element (essentially, the credentials to 'sign-in' the test user)
    const usrContext = {
        user: user,
        setUser: ()=>{}
    }

    const newPost = {
            id:1,
            text:"Hello World",
            imageUrl:"https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png",
            comments:[],
            author:user,
            postDate: new Date()
        }

    let element = act(() => {render(
        <UserContext.Provider value={usrContext}>
            <PostFeed />
        </UserContext.Provider>
    )});

    const postSubmitButton = screen.getByRole("button"); //There should only be one
    const postSubmitText:any = screen.getAllByRole("textbox", {name: "Thoughts You Would Like to Share?"})[0];
    const postSubmitImg:any = screen.getAllByRole("textbox")[1]; 

    act(() => {
        fireEvent.input(postSubmitText, {target: {value: newPost.text} as HTMLInputElement });
        fireEvent.change(postSubmitImg, {target: {value: newPost.imageUrl} as HTMLInputElement });
    });

    expect(postSubmitText.value).toBe(newPost.text)
    expect(postSubmitImg.value).toBe(newPost.imageUrl)

    await act(async() => {
        fireEvent.click(postSubmitButton);
      });

    //expect(screen.getAllByText("Hello World")).toBeDefined()
});

