import { render } from "@testing-library/react";
import ReactDOM from "react-dom";
import Navbar from "../../navbar/Navbar";
import { PostFeed } from "../PostFeed";


test('opens without crashing', ()=>{

    const div = document.createElement('div');

    ReactDOM.render(<PostFeed />, div);
});

test('Navbar exists', ()=>{
    render(<PostFeed />)

    expect( document.getElementsByTagName('Navbar') )
});

/*
// This was the test that already existed (for App.tsx) it was causing problems, but I wanted to save it for learning purposes so I put it here

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/