import {describe, expect, test} from '@jest/globals';
import { render, screen, fireEvent } from "@testing-library/react";
import * as router from 'react-router'

// the component we're testing on
import Error from '../Error';


/************ Any Required Set Up or Mocking to be done ************/


// mocking function of scrollTo
window.scrollTo = jest.fn();

// Note error in render error test
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
test('render Error component', ()=>{
    render(<Error/>);
});

// test if the NavBar component rendered on page
test('render NavBar component', ()=>{
    render(<Error/>);

    expect(document.getElementsByTagName('NavBar'));
});