import {describe, expect, test} from '@jest/globals';
import { render, screen, fireEvent } from "@testing-library/react";

// the component we're testing on
import UserProfile from '../UserProfile';


/************ Any Required Set Up or Mocking to be done ************/


// mocking function of scrollTo
window.scrollTo = jest.fn();

// clear mock calls, instances, contexts and results before every test
afterAll(() => {
    jest.clearAllMocks;
})


/************ Tests Below Here ************/


// basic test to see if the component renders
test('render UserProfile component', ()=>{
    render(<UserProfile/>);
});

// test if the NavBar component rendered
test('render NavBar component', ()=>{
    render(<UserProfile/>);

    expect(document.getElementsByTagName('NavBar'));
});