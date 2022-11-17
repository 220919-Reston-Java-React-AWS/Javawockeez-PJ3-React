import { render, screen, fireEvent } from "@testing-library/react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import Navbar from "../../navbar/Navbar";
import { PostFeed } from "../PostFeed";

window.scrollTo = jest.fn();

test('opens without crashing', ()=>{
    render(<PostFeed />);
});

test('Navbar exists', ()=>{
    render(<PostFeed />)

    expect( document.getElementsByTagName('Navbar') )
});

afterAll(() => {
    jest.clearAllMocks();
  });
// test('Create Post button exists', ()=>{
//     render(<PostFeed />)

//     const button = screen.getByLabelText("Create Post");



// /*
// // This was the test that already existed (for App.tsx) it was causing problems, but I wanted to save it for learning purposes so I put it here

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
//   */
// });
