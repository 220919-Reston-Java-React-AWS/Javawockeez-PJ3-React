import {describe, expect, test} from '@jest/globals';
import { render, screen, fireEvent, queryByAttribute } from "@testing-library/react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../../context/user.context";

import '@testing-library/jest-dom'
import { log } from 'console'

const getById = queryByAttribute.bind(null, 'id');


// the actual component we're testing
import UserAccount from '../UserAccount';


/************ Any Required Set Up or Mocking to be done ************/

// mocking function of scrollTo
window.scrollTo = jest.fn(); 

// fake user for user context
const user = {
    "id": 1,
    "email": "test@gmail.com",
    "firstName": "test",
    "lastName": "user"
}

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

// test if you can switch to modal tab
test('switch into modal tab', ()=>{
    // The userContext in which to run the element (essentially, the credentials to 'sign-in' the test user)
    const usrContext = {
        user: user,
        setUser: ()=>{}
    }

    // render page
    render(
        <UserAccount/>
    );

    // // there are 3 tabs, but we want the settings tab
    // const settingsTabButton = screen.getByLabelText('accountSettingsBtn')
    
    // fireEvent.click(settingsTabButton)
    // // verify navigation to "Error" route
    // expect(document.getElementById('vertical-tab-2'))
    
    // expect(document.getElementById('updateProfileBtn'))

    // const updateProfileBtn = screen.getByLabelText('profileModalBtn')
    
    // fireEvent.click(updateProfileBtn)
    
    // expect(screen.getByText('Insert the image URL you want your profile banner to display.')).toBeDefined();

    // there are 3 tabs
    let tabButtons = screen.getAllByRole('tab')
    expect(tabButtons.length).toBe(3)

    // let settingsTab = screen.getByText("Settings").closest("button")

    // expect(document.getElementById('updateProfileBtn'))

})