import {describe, expect, test} from '@jest/globals';
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from 'react-router-dom';

// the actual component we're testing
import UserAccount from '../UserAccount';


/************ Any Required Set Up or Mocking to be done ************/

// mocking function of scrollTo
window.scrollTo = jest.fn(); 

// Note error in render navbar test
// useNavigate() may be used only in the context of a <Router> component error
// therefore, mock the useNavigate()
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));


// clear mock calls, instances, contexts and results before every test
afterAll(() => {
    jest.clearAllMocks;
})


/************ Tests Below Here ************/


// basic test to see if the component renders
test('render UserAccount component', ()=>{
    render(<UserAccount/>);
});

// test if the NavBar component rendered
test('render NavBar component', ()=>{
    render(<UserAccount/>);

    expect(document.getElementsByTagName('NavBar'));
});