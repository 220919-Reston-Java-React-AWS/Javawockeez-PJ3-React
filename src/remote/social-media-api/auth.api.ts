import socialClient, { socialApiResponse } from "./socialClient";

const baseURL = "/auth"

export const apiLogin = async (email: string, password: string): Promise<socialApiResponse> => {
    const response = await socialClient.post<any>(
        `${baseURL}/login`,
        { email: email, password: password }
    ).catch((error:any) => {
        return error.response;
    })
    return { status: response.status, payload: response.data };
}

export const apiLogout = async (): Promise<socialApiResponse> => {
    const response = await socialClient.post<any>(
        `${baseURL}/logout`
    );
    return { status: response.status, payload: response.data };
}

export const apiRegister = async (firstName: string, lastName: string, email: string, password: string, question1: string, answer1: string, question2: string, answer2: string, question3: string, answer3: string): Promise<socialApiResponse> => {
    const response = await socialClient.post<any>(
        `${baseURL}/register`,
        { firstName: firstName, lastName: lastName, email: email, password: password, question1: question1, answer1: answer1, question2: question2, answer2: answer2, question3: question3, answer3: answer3 }
    );
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

// Get security questions by email
export const apiGetQuestionsByEmail = async (email:string): Promise<socialApiResponse> => {
    const response = await socialClient.get<any>(
        `${baseURL}/security-questions/${email}`
    );
    return { status: response.status, payload: response.data };
}

//Update password
export const apiForgotPassword = async (email:string, question1: string, answer1: string, question2: string, answer2: string, question3: string, answer3: string, password: string): Promise<socialApiResponse> => {
    const response = await socialClient.post<any>(
        `${baseURL}/forgot-password`,
        {email:email, question1: question1, answer1: answer1, question2: question2, answer2: answer2, question3: question3, answer3: answer3, password: password}
    );
    return { status: response.status, payload: response.data };
}