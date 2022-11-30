import socialClient, { socialApiResponse } from "./socialClient";

// This is the API for accessing the post-controller in the backend.
// All queries about posts/comments should go through here (although postFeed 
// does do the same thing but less, a relic from the beginning)
//
// Handles getting all main posts, creating posts, editing posts, and deleting posts.
//

const baseURL = "/post";

export const apiGetPosts = async (): Promise<socialApiResponse> => {
    const response = await socialClient.get<any>(
        baseURL
    );
    return { status: response.status, payload: response.data }
}

export const apiUpsertPost = async (post: any): Promise<socialApiResponse> => {
    const response = await socialClient.put<any>(baseURL, post, {withCredentials: true});
    return { status: response.status, payload: response.data };
}

export const apiDeletePost = async (post: any): Promise<socialApiResponse> => {
    const response = await socialClient.delete<any>(baseURL, {data: post});
    return { status: response.status, payload: response.data };
}