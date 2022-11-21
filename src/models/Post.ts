export default class Post {
    id: number;
    text: string;
    imageUrl: string;
    comments: Post[];
    author: any;
    postDate: Date;

    constructor (id: number, text:string, imageUrl:string, comments: Post[], author:any, postDate:Date) {
        this.id = id;
        this.text = text;
        this.imageUrl = imageUrl;
        this.comments = comments;
        this.author = author;
        this.postDate = postDate;
    }
}