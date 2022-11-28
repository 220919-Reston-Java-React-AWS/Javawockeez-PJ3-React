import Post from "../Post";
import { User } from "../../context/user.context";


/************ Any Required Set Up or Mocking to be done ************/


// clear mock calls, instances, contexts and results before every test
afterAll(() => {
    jest.clearAllMocks;
})


/************ Tests Below Here ************/

it('constructing post class',() =>{
    // Arranging values
    const testDate:Date = new Date;
    const testUser:User = {id:1, email:'test@gmail.com', firstName:'test', lastName:'user'}
    const testComments:Post[] = []

    // construct the Post class
    const testPost = new Post(1,'text', 'img.jpg', testComments, testUser, testDate)

    // test that it's defined
    expect(testPost).toBeDefined;
});

it('test class property values',() =>{
    // Arranging values
    const testDate:Date = new Date;
    const testUser:User = {id:1, email:'test@gmail.com', firstName:'test', lastName:'user'}
    const testComments:Post[] = []

    // construct the Post class
    const testPost = new Post(1,'text', 'img.jpg', testComments, testUser, testDate)

    // test that the property values match
    expect(testPost.id).toBe(1);
    expect(testPost.text).toBe('text');
    expect(testPost.imageUrl).toBe('img.jpg');
    expect(testPost.comments).toBe(testComments);
    expect(testPost.author).toBe(testUser);
    expect(testPost.postDate).toBe(testDate);

});