import React from 'react';
import { User } from './user.context';

export interface Profile {
    id: number,
    about: string,
    avatarImageUrl: string,
    bannerImageUrl: string,
    user: User

}

interface UserProfileContextState {
    profileContext: Profile | undefined;
    setProfileContext: (profileContext?: Profile) => void;
}

// Define the Profile Context
// This will provided at the top level of the component hierarchy
// Then any child component will be able to access the User info
// by using the useContext hook as follows:
// const { profile, setProfile } = useContext(UserProfileContext);
// And then the user can be used and updated in a standard fashion
export const UserProfileContext = React.createContext<UserProfileContextState>({
    profileContext: undefined,
    setProfileContext: () => { }
});