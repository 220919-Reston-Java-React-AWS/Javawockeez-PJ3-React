import {describe, expect, test} from '@jest/globals';
import { render, screen, fireEvent } from "@testing-library/react";
import { UserContext } from "../../../context/user.context";

// the component we're testing on
import UserProfile from '../UserProfile';


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
            <UserProfile/>
        </UserContext.Provider>
    );

    // check there are 3 tabs
    let tabButtons = screen.getAllByRole('tab')
    expect(tabButtons.length).toBe(2)
    

    const tab = screen.getByRole('tab', { name: 'About Me' });
    fireEvent.click(tab);
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('About Me');
})
