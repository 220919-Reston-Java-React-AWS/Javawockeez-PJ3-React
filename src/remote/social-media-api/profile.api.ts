import socialClient, { socialApiResponse } from "./socialClient";
import Profile from "../../models/Profile";

// base URL to the Profile Controller
const baseURL = "/profile"

// Get All Posts By User Id
export const apiGetAllPostsById = async (id: string): Promise<socialApiResponse> => {
    const response = await socialClient.get<any>(
        `${baseURL}/posts/${id}`
    );
    // console.log(response.data)
    return { status: response.status, payload: response.data };
}

// Get User Info by Id
export const apiGetUserProfileName = async (id: string): Promise<socialApiResponse> => {
    const response = await socialClient.get<any>(
        `${baseURL}/user/${id}`
    );
    // console.log(response.data)
    return { status: response.status, payload: response.data };
}

// Get User Profile Details by Id
export const apiGetProfileByUserId = async (id: string): Promise<socialApiResponse> => {
    const response = await socialClient.get<any>(
        `${baseURL}/page/${id}`
    );
    // console.log(response.data)
    return { status: response.status, payload: response.data };
}

// Update the Banner Image in User Profile
export const apiPatchProfileData = async (profileUpdate: Profile): Promise<socialApiResponse> => {
    const response = await socialClient.patch<any>(
        `${baseURL}/update-profile`,
        profileUpdate
    );
    console.log(response.data)
    return { status: response.status, payload: response.data };
}