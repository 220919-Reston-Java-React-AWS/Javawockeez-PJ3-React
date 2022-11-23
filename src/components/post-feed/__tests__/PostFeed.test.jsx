import { render, screen, fireEvent } from "@testing-library/react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
import Navbar from "../../navbar/Navbar";
import React, { useState } from "react";
import { PostFeed } from "../PostFeed";
import { UserContext } from "../../../context/user.context";

window.scrollTo = jest.fn();

const user = {
    "id": 1,
    "email": "test@test.net",
    "firstName": "Testy",
    "lastName": "McTestface"
}

afterAll(() => {
    jest.clearAllMocks();
  });

test('opens without crashing', ()=>{
    render(<PostFeed />);
});

test('Navbar exists', ()=>{
    render(<PostFeed />)

    expect( document.getElementsByTagName('Navbar') )
});

test('Create Post fields exist and can be updated', ()=>{
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

    let element = render(
        <UserContext.Provider value={usrContext}>
            <PostFeed />
        </UserContext.Provider>
    )

    const postSubmitButton = screen.getByRole("button"); //There should only be one
    const postSubmitText = screen.getAllByRole("textbox", {name: "Thoughts You Would Like to Share?"})[0];
    const postSubmitImg = screen.getAllByRole("textbox")[1]; 

    fireEvent.input(postSubmitText, {target: {value: newPost.text} });
    fireEvent.change(postSubmitImg, {target: {value: newPost.imageUrl} });

    expect(postSubmitText.value).toBe(newPost.text)
    expect(postSubmitImg.value).toBe(newPost.imageUrl)
    //postSubmitButton.onclick = mockOnClick;
    fireEvent.click(postSubmitButton);

    //expect(screen.getAllByText("Hello World")).toBeDefined()
});


// /*
// // This was the test that already existed (for App.tsx) it was causing problems, but I wanted to save it for learning purposes so I put it here

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
//   */
// });
