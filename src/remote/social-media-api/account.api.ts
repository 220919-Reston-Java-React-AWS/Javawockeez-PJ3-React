import socialClient, { socialApiResponse } from "./socialClient";
import Account from "../../models/Account";

// base URL to the Account Controller
const baseURL = "/account"

// Update the User Account
export const apiPatchAccountData = async (accountUpdate: Account): Promise<socialApiResponse> => {
    const response = await socialClient.patch<any>(
        `${baseURL}/update-account`,
        accountUpdate
    );
    // console.log(response.data)
    return { status: response.status, payload: response.data };
}