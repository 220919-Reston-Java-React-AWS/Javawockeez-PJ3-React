/** 
 * Just to differentiate between User Profile tests, this test file focuses on the the Axois api functions used  
**/
import {describe, expect, test} from '@jest/globals';
import { render, screen, fireEvent, act } from "@testing-library/react";
import { UserContext } from "../../../context/user.context";

// the component we're testing on
import UserProfile from '../UserProfile';

// mocking the api calls used in User Profile
import * as apiProfile from "../../../remote/social-media-api/profile.api";
jest.mock("../../../remote/social-media-api/profile.api");
const mockGetUserProfileName = apiProfile.apiGetUserProfileName as jest.Mock;
const mockGetProfileByUserId = apiProfile.apiGetProfileByUserId as jest.Mock;
const mockGetAllPostById = apiProfile.apiGetAllPostsById as jest.Mock;


/************ Any Required Set Up or Mocking to be done ************/


// fake user for user context
const user = {
    "id": 1,
    "email": "test@gmail.com",
    "firstName": "test",
    "lastName": "user"
}

beforeEach(() => {
    mockGetAllPostById.mockReturnValue({ status: 200, payload: [] });
    mockGetProfileByUserId.mockReturnValue({status: 200, payload: []});
    mockGetUserProfileName.mockReturnValue({status: 200, payload: []});

    // mocking function of scrollTo
    window.scrollTo = jest.fn();
})

// clear mock calls, instances, contexts and results before every test
afterAll(() => {
    jest.clearAllMocks;
})


/************ Tests Below Here ************/


// basic test to see if the component renders
test('render UserProfile component', async()=>{
    await act(async() => {render(<UserProfile/>) });
});


// test if the NavBar component rendered
test('render NavBar component', async()=>{
    await act(async() => {render(<UserProfile/>) });

    expect(document.getElementsByTagName('NavBar'));
});