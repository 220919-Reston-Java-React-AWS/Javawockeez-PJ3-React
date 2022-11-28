import socialClient, { socialApiResponse } from "./socialClient";
import Profile from "../../models/Profile";

// base URL to the Profile Controller
const baseURL = "/profile"

// Get All Posts By User Id
export const apiGetAllPostsById = async (id: string): Promise<socialApiResponse> => {
    // console.log(id)
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
    // console.log(response.data)
    return { status: response.status, payload: response.data };
}

//get sample questions 1
export const apiAuthSampleQuestions1 = async (): Promise<socialApiResponse> => {
    const response = await socialClient.get<any>(
        `${baseURL}/questions1`
    );
    return { status: response.status, payload: response.data };   
}

//get sample questions 2
export const apiAuthSampleQuestions2 = async (): Promise<socialApiResponse> => {
    const response = await socialClient.get<any>(
        `${baseURL}/questions2`
    );
    return { status: response.status, payload: response.data };
}

//get sample questions 3
export const apiAuthSampleQuestions3 = async (): Promise<socialApiResponse> => {
    const response = await socialClient.get<any>(
        `${baseURL}/questions3`
    );
    return { status: response.status, payload: response.data };
}

// update security questions by id
export const apiUpdateQuestionsById = async (id:string, question1: string, answer1: string, question2: string, answer2: string, question3: string, answer3: string): Promise<socialApiResponse> => {
    const response = await socialClient.post<any>(
        `${baseURL}/update-questions/${id}`,
        {question1: question1, answer1: answer1, question2: question2, answer2: answer2, question3: question3, answer3: answer3}
    );
    return { status: response.status, payload: response.data };
}