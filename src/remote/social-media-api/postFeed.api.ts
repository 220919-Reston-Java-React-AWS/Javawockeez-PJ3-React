import Post from "../../models/Post";
import socialClient, { socialApiResponse } from "./socialClient";

// Essentially accomplishes the same as post.api, but less (no DELETE). 
// It's inclusion is a relic of an earlier time, and should maybe be removed/repurposed in the future.
//
// Includes functionality for getting all posts, and creating/editing posts.
//

const baseURL = "/post"

export const apiGetAllPosts = async (): Promise<socialApiResponse> => {
    const response = await socialClient.get<any>(
        `${baseURL}`
    );
    return { status: response.status, payload: response.data };
}

export const apiUpsertPost = async (post: Post): Promise<socialApiResponse> => {
    const response = await socialClient.put<any>(
        `${baseURL}`,
        post
    );
    return { status: response.status, payload: response.data };
}

