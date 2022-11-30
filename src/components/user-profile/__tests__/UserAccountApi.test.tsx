/** 
 * Just to differentiate between UserAccount tests, this test file focuses on the the Axois api functions used  
**/
import {describe, expect, test} from '@jest/globals';
import { render, screen, fireEvent, queryByAttribute, act } from "@testing-library/react";
import { UserContext } from "../../../context/user.context";
import '@testing-library/jest-dom'
import { unmountComponentAtNode } from "react-dom";

// the actual component we're testing
import UserAccount from '../UserAccount';

// mocking the api calls used in Profile API
import * as apiProfile from "../../../remote/social-media-api/profile.api";
jest.mock("../../../remote/social-media-api/profile.api");
const mockGetUserProfileName = apiProfile.apiGetUserProfileName as jest.Mock;
const mockGetProfileByUserId = apiProfile.apiGetProfileByUserId as jest.Mock;
const mockGetAllPostById = apiProfile.apiGetAllPostsById as jest.Mock;
const mockAuthSampleQuestions1 = apiProfile.apiAuthSampleQuestions1 as jest.Mock;
const mockAuthSampleQuestions2 = apiProfile.apiAuthSampleQuestions2 as jest.Mock;
const mockAuthSampleQuestions3 = apiProfile.apiAuthSampleQuestions3 as jest.Mock;
const mockPatchProfileData = apiProfile.apiPatchProfileData as jest.Mock;
const mockUpdateQuestionsById = apiProfile.apiUpdateQuestionsById as jest.Mock;

// mock the api calls used in Account API
import * as apiAccount from '../../../remote/social-media-api/account.api';
jest.mock('../../../remote/social-media-api/account.api');
const mockPatchAccountData = apiAccount.apiPatchAccountData as jest.Mock


/************ Any Required Set Up or Mocking to be done ************/

let container:any = null;

// fake user for user context
const user = {
    "id": 1,
    "email": "test@gmail.com",
    "firstName": "test",
    "lastName": "user"
}

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    
    // mock the reponse of the api call
    mockGetAllPostById.mockReturnValue({ status: 200, payload: [] });
    mockGetProfileByUserId.mockReturnValue({status: 200, payload: []});
    mockGetUserProfileName.mockReturnValue({status: 200, payload: []});
    mockAuthSampleQuestions1.mockReturnValue({status: 200, payload: []});
    mockAuthSampleQuestions2.mockReturnValue({status: 200, payload: []});
    mockAuthSampleQuestions3.mockReturnValue({status: 200, payload: []});
    
    // mock response of updating banner image and about me
    mockPatchProfileData.mockReturnValue({status: 200, payload: []});

    // mock respsonse of updating account info
    mockPatchAccountData.mockReturnValue({status: 200, payload: []});

    // mock response of updating account security questions
    mockUpdateQuestionsById.mockReturnValue({status: 200, payload: []});

    // mocking function of scrollTo
    window.scrollTo = jest.fn();

})

// Note error in render navbar test
// useNavigate() may be used only in the context of a <Router> component error
// therefore, mock the useNavigate()
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

// clear mock calls, instances, contexts and results after every test
afterAll(() => {
    jest.clearAllMocks;
})


/************ Tests Below Here ************/


// basic test to see if the component renders
test('render UserAccount component',  async()=>{
    await act(async() => {render(<UserAccount/>) , container});
});

// test if the NavBar component rendered
test('render NavBar component', async()=>{
    await act(async() => {render(<UserAccount/>) , container});

    expect(document.getElementsByTagName('NavBar'));
});


/************ Update Banner Image Test ************/


// test - enter settings tab, banner update modal, insert text and click update
test('insert text in update banner modal in settings tab', async()=>{
    // The userContext in which to run the element (essentially, the credentials to 'sign-in' the test user)
    const usrContext = {
        user: user,
        setUser: ()=>{}
    }

    // render page
    await act(async() => {
        render(
        <UserContext.Provider value={usrContext}>
            <UserAccount/>
        </UserContext.Provider>, container
        )

    });

    // there are 3 tabs
    let tabButtons = screen.getAllByRole('tab')
    expect(tabButtons.length).toBe(3)
    
    // find and click the settings tab button
    const tab = screen.getByRole('tab', { name: 'Settings' });

    await act(async() => {        
        await fireEvent.click(tab)
    });

    // test if settings tab is now selected
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Settings');

    // find and click the update banner button
    const modalBtn = screen.getByRole('button', { name: 'bannerModalBtn' });
    
    await act(async() => {
        await fireEvent.click(modalBtn)
    })
        
    // check if a modal showed up
    expect(screen.getByRole('presentation'))
    expect(screen.getByText('Insert the image URL you want your profile banner to display.'))

    //find the input text field and change value
    const inputField = screen.getByLabelText(/^Banner URL/i);
    
    await act(async() => {
        await fireEvent.change(inputField, { target: { value: 'newBanner.jpg' } });
    })

    expect(inputField.value).toBe('newBanner.jpg');

    // click the update button
    const updateBtn = screen.getByText('Update')
    await act(async() => {
        await fireEvent.click(updateBtn)
    })
})


/****** Update About Me Test *****/


// test - enter settings tab, about me update modal, insert text and click update
test('insert text in update about me modal in settings tab', async()=>{
    // The userContext in which to run the element (essentially, the credentials to 'sign-in' the test user)
    const usrContext = {
        user: user,
        setUser: ()=>{}
    }

    // render page
    await act(async() => {
        render(
        <UserContext.Provider value={usrContext}>
            <UserAccount/>
        </UserContext.Provider>, container
        )
    });

    // there are 3 tabs
    let tabButtons = screen.getAllByRole('tab')
    expect(tabButtons.length).toBe(3)
    
    // find and click the settings tab button
    const tab = screen.getByRole('tab', { name: 'Settings' });
    await act(async() => {
        await fireEvent.click(tab);
    })

    // test if settings tab is now selected
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Settings');

    // find and click the update about me button
    const modalBtn = screen.getByRole('button', { name: 'aboutModalBtn' });
    await act(async() => {
        await fireEvent.click(modalBtn);
    })

    // check if a modal showed up
    expect(screen.getByRole('presentation'))
    expect(screen.getByText("Insert what you want your 'About Me' to be."))

    //find the input text field and change value
    const inputField = screen.getByLabelText(/^About Me Text/i);
    await act(async() => {
        await fireEvent.change(inputField, { target: { value: 'This is a new about me' } });
    })
    expect(inputField.value).toBe('This is a new about me');

    // click the update button
    const updateBtn = screen.getByText('Update')
    await act(async() => {
        await fireEvent.click(updateBtn)
    })
})


/****** Update Account Information Test *****/


// test - enter settings tab, account update modal, insert text and click update
test('insert text in update account modal in settings tab', async()=>{
    // The userContext in which to run the element (essentially, the credentials to 'sign-in' the test user)
    const usrContext = {
        user: user,
        setUser: ()=>{}
    }

    // render page
    await act(async() => {
        render(
        <UserContext.Provider value={usrContext}>
            <UserAccount/>
        </UserContext.Provider>, container
        )
    });

    // there are 3 tabs
    let tabButtons = screen.getAllByRole('tab')
    expect(tabButtons.length).toBe(3)
    
    // find and click the settings tab button
    const tab = screen.getByRole('tab', { name: 'Settings' });
    await act(async() => {
        await fireEvent.click(tab);
    })

    // test if settings tab is now selected
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Settings');

    // find and click the update account button
    const modalBtn = screen.getByRole('button', { name: 'accountModalBtn' });
    await act(async() => {
        await fireEvent.click(modalBtn);
    })
    
    // check if a modal showed up
    expect(screen.getByRole('presentation'))
    expect(screen.getByText("Insert changes you want to update about your account."))

    //find the input text field and change value for First Name
    const inputFirstName = screen.getByLabelText(/^First Name/i);
    await act(async() => {
        await fireEvent.change(inputFirstName, { target: { value: 'First Name Test' } });
    })
    expect(inputFirstName.value).toBe('First Name Test');

    //find the input text field and change value for Last Name
    const inputLastName = screen.getByLabelText(/^Last Name/i);
    await act(async() => {
        await fireEvent.change(inputLastName, { target: { value: 'Last Name Test' } });
    })
    expect(inputLastName.value).toBe('Last Name Test');

    //find the input text field and change value for Email
    const inputEmail = screen.getByLabelText(/^Email/i);
    await act(async() => {
        await fireEvent.change(inputEmail, { target: { value: 'new-email@test.com' } });
    })
    expect(inputEmail.value).toBe('new-email@test.com');

    //find the input text field and change value for Password
    const inputPassword = screen.getByLabelText(/^Password/i);
    await act(async() => {
        await fireEvent.change(inputPassword, { target: { value: 'newPassword' } });
    })
    expect(inputPassword.value).toBe('newPassword');

    // click the update button
    const updateBtn = screen.getByText('Update')
    await act(async() => {
        await fireEvent.click(updateBtn)
    })
})


/****** Update Security Quesitons Test *****/


// test - enter settings tab, security update modal, insert text and click update
test('insert text in update security questions in settings tab', async()=>{
    // The userContext in which to run the element (essentially, the credentials to 'sign-in' the test user)
    const usrContext = {
        user: user,
        setUser: ()=>{}
    }

    // render page
    await act(async() => {
        render(
        <UserContext.Provider value={usrContext}>
            <UserAccount/>
        </UserContext.Provider>, container
        )
    });

    // there are 3 tabs
    let tabButtons = screen.getAllByRole('tab')
    expect(tabButtons.length).toBe(3)
    
    // find and click the settings tab button
    const tab = screen.getByRole('tab', { name: 'Settings' });
    await act(async() => {
        await fireEvent.click(tab);
    })

    // test if settings tab is now selected
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Settings');

    // find and click the update banner button
    const bannerBtn = screen.getByRole('button', { name: 'securityModalBtn' });
    await act(async() => {
        await fireEvent.click(bannerBtn);
    })
    
    // check if a modal showed up
    expect(screen.getByRole('presentation'))
    expect(screen.getByText("Choose Security Questions From The Dropdown Menus And Answer The Questions."))

    
    const selectSQuestion1 = screen.getByLabelText('selectQuestion1')
    await act(async() => {
        await fireEvent.mouseDown(selectSQuestion1)
        await fireEvent.change(selectSQuestion1, { target: { value: "In what city were you born?" } });
    })
    expect(selectSQuestion1.value).toBe("In what city were you born?")

    const selectSQuestion2 = screen.getByLabelText('selectQuestion2')
    await act(async() => {
        await fireEvent.mouseDown(selectSQuestion2)
        await fireEvent.change(selectSQuestion2, { target: { value: "What high school did you attend?" } });
    })
    expect(selectSQuestion2.value).toBe("What high school did you attend?")

    const selectSQuestion3 = screen.getByLabelText('selectQuestion3')
    await act(async() => {
        await fireEvent.mouseDown(selectSQuestion3)
        await fireEvent.change(selectSQuestion3, { target: { value: "What was your favorite food as a child?" } });
    })
    expect(selectSQuestion3.value).toBe("What was your favorite food as a child?")

    //find the input text field and change value for First Name
    const inputSQuestion1 = screen.getByLabelText(/^Question 1 Answer/i);
    await act(async() => {
        await fireEvent.change(inputSQuestion1, { target: { value: 'Security Question 1 answer' } });
    })
    expect(inputSQuestion1.value).toBe('Security Question 1 answer');

    //find the input text field and change value for Last Name
    const inputSQuestion2 = screen.getByLabelText(/^Question 2 Answer/i);
    await act(async() => {
        await fireEvent.change(inputSQuestion2, { target: { value: 'Security Question 2 answer' } });
    })
    expect(inputSQuestion2.value).toBe('Security Question 2 answer');

    //find the input text field and change value for Email
    const inputSQuestion3 = screen.getByLabelText(/^Question 3 Answer/i);
    await act(async() => {
        await fireEvent.change(inputSQuestion3, { target: { value: 'Security Question 3 answer' } });
    })
    expect(inputSQuestion3.value).toBe('Security Question 3 answer');

    // click the update button
    const updateBtn = screen.getByText('Update')
    await act(async() => {
        await fireEvent.click(updateBtn)
    })
})
