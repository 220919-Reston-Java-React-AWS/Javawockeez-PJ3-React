import {describe, expect, test} from '@jest/globals';
import { render, screen, fireEvent, queryByAttribute, within } from "@testing-library/react";
import { UserContext } from "../../../context/user.context";
import '@testing-library/jest-dom'

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

/****** Switch Tabs Tests *****/


// test if you can switch to about me tab
test('switch into about me tab', ()=>{
    // The userContext in which to run the element (essentially, the credentials to 'sign-in' the test user)
    const usrContext = {
        user: user,
        setUser: ()=>{}
    }

    // render page with given user context
    render(
        <UserContext.Provider value={usrContext}>
            <UserAccount/>
        </UserContext.Provider>
    );

    // check there are 3 tabs
    let tabButtons = screen.getAllByRole('tab')
    expect(tabButtons.length).toBe(3)
    

    const tab = screen.getByRole('tab', { name: 'About Me' });
    fireEvent.click(tab);
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('About Me');
})

// test if you can switch to settings modal tab
test('switch into settings tab', ()=>{
    // The userContext in which to run the element (essentially, the credentials to 'sign-in' the test user)
    const usrContext = {
        user: user,
        setUser: ()=>{}
    }

    // render page
    render(
        <UserContext.Provider value={usrContext}>
            <UserAccount/>
        </UserContext.Provider>
    );

    // there are 3 tabs
    let tabButtons = screen.getAllByRole('tab')
    expect(tabButtons.length).toBe(3)
    
    // find and click the settings tab button
    const tab = screen.getByRole('tab', { name: 'Settings' });
    fireEvent.click(tab);

    // test if settings tab is now selected
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Settings');
})


/****** Update Banner Modal Tests *****/


// test if you can switch to settings modal tab and open the update banner modal
test('open update banner modal in settings tab', ()=>{
    // The userContext in which to run the element (essentially, the credentials to 'sign-in' the test user)
    const usrContext = {
        user: user,
        setUser: ()=>{}
    }

    // render page
    render(
        <UserContext.Provider value={usrContext}>
            <UserAccount/>
        </UserContext.Provider>
    );

    // there are 3 tabs
    let tabButtons = screen.getAllByRole('tab')
    expect(tabButtons.length).toBe(3)
    
    // find and click the settings tab button
    const tab = screen.getByRole('tab', { name: 'Settings' });
    fireEvent.click(tab);

    // test if settings tab is now selected
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Settings');

    // find and click the update banner button
    const modalBtn = screen.getByRole('button', { name: 'bannerModalBtn' });
    fireEvent.click(modalBtn);
    
    // check if a modal showed up
    expect(screen.getByRole('presentation'))
    expect(screen.getByText('Insert the image URL you want your profile banner to display.'))
})

// test - enter settings tab, banner update modal, insert text and click update
test('insert text in update banner modal in settings tab', ()=>{
    // The userContext in which to run the element (essentially, the credentials to 'sign-in' the test user)
    const usrContext = {
        user: user,
        setUser: ()=>{}
    }

    // render page
    render(
        <UserContext.Provider value={usrContext}>
            <UserAccount/>
        </UserContext.Provider>
    );

    // there are 3 tabs
    let tabButtons = screen.getAllByRole('tab')
    expect(tabButtons.length).toBe(3)
    
    // find and click the settings tab button
    const tab = screen.getByRole('tab', { name: 'Settings' });
    fireEvent.click(tab);

    // test if settings tab is now selected
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Settings');

    // find and click the update banner button
    const modalBtn = screen.getByRole('button', { name: 'bannerModalBtn' });
    fireEvent.click(modalBtn);
    
    // check if a modal showed up
    expect(screen.getByRole('presentation'))
    expect(screen.getByText('Insert the image URL you want your profile banner to display.'))

    //find the input text field and change value
    const inputField = screen.getByLabelText(/^Banner URL/i);
    fireEvent.change(inputField, { target: { value: 'newBanner.jpg' } });
    expect(inputField.value).toBe('newBanner.jpg');

    // click the update button
    const updateBtn = screen.getByText('Update')
    fireEvent.click(updateBtn)
})


/****** Update About Me Modal Tests *****/



// test if you can switch to settings modal tab and open the update about me modal
test('open update about me modal in settings tab', ()=>{
    // The userContext in which to run the element (essentially, the credentials to 'sign-in' the test user)
    const usrContext = {
        user: user,
        setUser: ()=>{}
    }

    // render page
    render(
        <UserContext.Provider value={usrContext}>
            <UserAccount/>
        </UserContext.Provider>
    );

    // there are 3 tabs
    let tabButtons = screen.getAllByRole('tab')
    expect(tabButtons.length).toBe(3)
    
    // find and click the settings tab button
    const tab = screen.getByRole('tab', { name: 'Settings' });
    fireEvent.click(tab);

    // test if settings tab is now selected
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Settings');

    // find and click the update about me button
    const modalBtn = screen.getByRole('button', { name: 'aboutModalBtn' });
    fireEvent.click(modalBtn);
    
    // check if a modal showed up
    expect(screen.getByRole('presentation'))
    expect(screen.getByText("Insert what you want your 'About Me' to be."))
})

// test - enter settings tab, about me update modal, insert text and click update
test('insert text in update about me modal in settings tab', ()=>{
    // The userContext in which to run the element (essentially, the credentials to 'sign-in' the test user)
    const usrContext = {
        user: user,
        setUser: ()=>{}
    }

    // render page
    render(
        <UserContext.Provider value={usrContext}>
            <UserAccount/>
        </UserContext.Provider>
    );

    // there are 3 tabs
    let tabButtons = screen.getAllByRole('tab')
    expect(tabButtons.length).toBe(3)
    
    // find and click the settings tab button
    const tab = screen.getByRole('tab', { name: 'Settings' });
    fireEvent.click(tab);

    // test if settings tab is now selected
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Settings');

    // find and click the update about me button
    const modalBtn = screen.getByRole('button', { name: 'aboutModalBtn' });
    fireEvent.click(modalBtn);
    
    // check if a modal showed up
    expect(screen.getByRole('presentation'))
    expect(screen.getByText("Insert what you want your 'About Me' to be."))

    //find the input text field and change value
    const inputField = screen.getByLabelText(/^About Me Text/i);
    fireEvent.change(inputField, { target: { value: 'This is a new about me' } });
    expect(inputField.value).toBe('This is a new about me');

    // click the update button
    const updateBtn = screen.getByText('Update')
    fireEvent.click(updateBtn)
})


/****** Update Account Information Modal Tests *****/



// test if you can switch to settings modal tab and open the update account info modal
test('open update account modal in settings tab', ()=>{
    // The userContext in which to run the element (essentially, the credentials to 'sign-in' the test user)
    const usrContext = {
        user: user,
        setUser: ()=>{}
    }

    // render page
    render(
        <UserContext.Provider value={usrContext}>
            <UserAccount/>
        </UserContext.Provider>
    );

    // there are 3 tabs
    let tabButtons = screen.getAllByRole('tab')
    expect(tabButtons.length).toBe(3)
    
    // find and click the settings tab button
    const tab = screen.getByRole('tab', { name: 'Settings' });
    fireEvent.click(tab);

    // test if settings tab is now selected
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Settings');

    // find and click the update account button
    const modalBtn = screen.getByRole('button', { name: 'accountModalBtn' });
    fireEvent.click(modalBtn);
    
    // check if a modal showed up
    expect(screen.getByRole('presentation'))
    expect(screen.getByText("Insert changes you want to update about your account."))
})

// test - enter settings tab, account update modal, insert text and click update
test('insert text in update account modal in settings tab', ()=>{
    // The userContext in which to run the element (essentially, the credentials to 'sign-in' the test user)
    const usrContext = {
        user: user,
        setUser: ()=>{}
    }

    // render page
    render(
        <UserContext.Provider value={usrContext}>
            <UserAccount/>
        </UserContext.Provider>
    );

    // there are 3 tabs
    let tabButtons = screen.getAllByRole('tab')
    expect(tabButtons.length).toBe(3)
    
    // find and click the settings tab button
    const tab = screen.getByRole('tab', { name: 'Settings' });
    fireEvent.click(tab);

    // test if settings tab is now selected
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Settings');

    // find and click the update account button
    const modalBtn = screen.getByRole('button', { name: 'accountModalBtn' });
    fireEvent.click(modalBtn);
    
    // check if a modal showed up
    expect(screen.getByRole('presentation'))
    expect(screen.getByText("Insert changes you want to update about your account."))

    //find the input text field and change value for First Name
    const inputFirstName = screen.getByLabelText(/^First Name/i);
    fireEvent.change(inputFirstName, { target: { value: 'First Name Test' } });
    expect(inputFirstName.value).toBe('First Name Test');

    //find the input text field and change value for Last Name
    const inputLastName = screen.getByLabelText(/^Last Name/i);
    fireEvent.change(inputLastName, { target: { value: 'Last Name Test' } });
    expect(inputLastName.value).toBe('Last Name Test');

    //find the input text field and change value for Email
    const inputEmail = screen.getByLabelText(/^Email/i);
    fireEvent.change(inputEmail, { target: { value: 'new-email@test.com' } });
    expect(inputEmail.value).toBe('new-email@test.com');

    //find the input text field and change value for Password
    const inputPassword = screen.getByLabelText(/^Password/i);
    fireEvent.change(inputPassword, { target: { value: 'newPassword' } });
    expect(inputPassword.value).toBe('newPassword');

    // click the update button
    const updateBtn = screen.getByText('Update')
    fireEvent.click(updateBtn)
})


/**** Security Question Modal Tests *****/


// test if you can switch to settings modal tab and open the update security question modal
test('open update security questions modal in settings tab', ()=>{
    // The userContext in which to run the element (essentially, the credentials to 'sign-in' the test user)
    const usrContext = {
        user: user,
        setUser: ()=>{}
    }

    // render page
    render(
        <UserContext.Provider value={usrContext}>
            <UserAccount/>
        </UserContext.Provider>
    );

    // there are 3 tabs
    let tabButtons = screen.getAllByRole('tab')
    expect(tabButtons.length).toBe(3)
    
    // find and click the settings tab button
    const tab = screen.getByRole('tab', { name: 'Settings' });
    fireEvent.click(tab);

    // test if settings tab is now selected
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Settings');

    // find and click the update banner button
    const bannerBtn = screen.getByRole('button', { name: 'securityModalBtn' });
    fireEvent.click(bannerBtn);
    
    // check if a modal showed up
    expect(screen.getByRole('presentation'))
    expect(screen.getByText("Choose Security Questions From The Dropdown Menus And Answer The Questions."))
})

// test - enter settings tab, security update modal, insert text and click update
test('insert text in update security questions in settings tab', ()=>{
    // The userContext in which to run the element (essentially, the credentials to 'sign-in' the test user)
    const usrContext = {
        user: user,
        setUser: ()=>{}
    }

    // render page
    render(
        <UserContext.Provider value={usrContext}>
            <UserAccount/>
        </UserContext.Provider>
    );

    // there are 3 tabs
    let tabButtons = screen.getAllByRole('tab')
    expect(tabButtons.length).toBe(3)
    
    // find and click the settings tab button
    const tab = screen.getByRole('tab', { name: 'Settings' });
    fireEvent.click(tab);

    // test if settings tab is now selected
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Settings');

    // find and click the update banner button
    const bannerBtn = screen.getByRole('button', { name: 'securityModalBtn' });
    fireEvent.click(bannerBtn);
    
    // check if a modal showed up
    expect(screen.getByRole('presentation'))
    expect(screen.getByText("Choose Security Questions From The Dropdown Menus And Answer The Questions."))

    
    const selectSQuestion1 = screen.getByLabelText('selectQuestion1')
    fireEvent.mouseDown(selectSQuestion1)
    fireEvent.change(selectSQuestion1, { target: { value: "In what city were you born?" } });
    expect(selectSQuestion1.value).toBe("In what city were you born?")

    const selectSQuestion2 = screen.getByLabelText('selectQuestion2')
    fireEvent.mouseDown(selectSQuestion2)
    fireEvent.change(selectSQuestion2, { target: { value: "What high school did you attend?" } });
    expect(selectSQuestion2.value).toBe("What high school did you attend?")

    const selectSQuestion3 = screen.getByLabelText('selectQuestion3')
    fireEvent.mouseDown(selectSQuestion3)
    fireEvent.change(selectSQuestion3, { target: { value: "What was your favorite food as a child?" } });
    expect(selectSQuestion3.value).toBe("What was your favorite food as a child?")

    //find the input text field and change value for First Name
    const inputSQuestion1 = screen.getByLabelText(/^Question 1 Answer/i);
    fireEvent.change(inputSQuestion1, { target: { value: 'Security Question 1 answer' } });
    expect(inputSQuestion1.value).toBe('Security Question 1 answer');

    //find the input text field and change value for Last Name
    const inputSQuestion2 = screen.getByLabelText(/^Question 2 Answer/i);
    fireEvent.change(inputSQuestion2, { target: { value: 'Security Question 2 answer' } });
    expect(inputSQuestion2.value).toBe('Security Question 2 answer');

    //find the input text field and change value for Email
    const inputSQuestion3 = screen.getByLabelText(/^Question 3 Answer/i);
    fireEvent.change(inputSQuestion3, { target: { value: 'Security Question 3 answer' } });
    expect(inputSQuestion3.value).toBe('Security Question 3 answer');

    // click the update button
    const updateBtn = screen.getByText('Update')
    fireEvent.click(updateBtn)
})