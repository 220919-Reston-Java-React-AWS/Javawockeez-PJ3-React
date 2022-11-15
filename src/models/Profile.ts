export default class Profile {
    id: number;
    about: string;
    avatarImageUrl: string;
    bannerImageUrl: string;
    user: any;

    constructor(id: number, about: string, avatarImageUrl: string, bannerImageUrl: string, user: any){
        this.id = id;
        this.about = about;
        this.avatarImageUrl = avatarImageUrl;
        this.bannerImageUrl = bannerImageUrl;
        this.user = user;
    }
}