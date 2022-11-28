import Profile from "../Profile";
import { User } from "../../context/user.context";

/************ Any Required Set Up or Mocking to be done ************/


// clear mock calls, instances, contexts and results before every test
afterAll(() => {
    jest.clearAllMocks;
})



/************ Tests Below Here ************/

it('constructing profile class',() =>{
    const testUser:User = {id:1, email:'test@gmail.com', firstName:'test', lastName:'user'}
    const testProfile = new Profile(1,'about','avatar.jpg','banner.jpg', testUser);

    expect(testProfile).toBeDefined;
});

it('test class property values',() =>{
    const testUser:User = {id:1, email:'test@gmail.com', firstName:'test', lastName:'user'}
    const testProfile = new Profile(1,'about','avatar.jpg','banner.jpg', testUser);

    expect(testProfile.id).toBe(1);
    expect(testProfile.about).toBe("about");
    expect(testProfile.avatarImageUrl).toBe("avatar.jpg");
    expect(testProfile.bannerImageUrl).toBe("banner.jpg");
    expect(testProfile.user).toBe(testUser);
});