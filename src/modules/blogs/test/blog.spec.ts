import app from "../../../index";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";

chai.use(chaiHttp);
const router = () => chai.request(app);

import fs from "fs";
import path from "path";

const imageLoc = path.join(__dirname, "../../../cube.png");
const imageBuffer = fs.readFileSync(imageLoc);

let blogId: any = "";
let token: any = "";

describe("MyBrand backend blogs test cases", () => {
   // Test for login 
  it("Should be able to log in an existing user", (done) => {
    router()
      .post("/api/users/login")
      .send({
        email: "ihirwe@gmail.com",
        password: "solange000"
      })
      .end((error, response: any) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("data");
        token = response._body.data.token;
        done(error);
      });

  // Test for creating Blog
  it("Should be able to create blog", (done) => {
    router()
      .post("/api/blogs/createBlogs")
      .set("Authorization", `Bearer ${token}`)
      .field("title", "title test")
      .field("description", "description test")
      .field("content", "content test")
      .attach("image", imageBuffer, "cube.png")
      .end((error, response: any) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("blogDetail");
        expect(response.body.blogDetail).to.have.property("title");
        expect(response.body.blogDetail).to.have.property("description");
        expect(response.body.blogDetail).to.have.property("content");
        expect(response.body.blogDetail).to.have.property("image");
        expect(response.body.blogDetail.image).to.have.property("public_id");
        expect(response.body.blogDetail.image).to.have.property('url')
        blogId = response._body.blogDetail._id;
        done(error);
      });
  });

  it("Should be handle able to give an error", (done) => {
    router()
      .post("/api/blogs/createBlogs")
      .set("Authorization", `Bearer ${token}`)
      .field("title", "title test")
      .field("description", "description test")
      .field("content", "content test")
      .end((error, response: any) => {
        expect(response).to.have.status(404);
        done(error);
      });
  });

  // Test for view blogs
  it("Should be able to get all blogs", (done) => {
    router()
      .get("/api/blogs/viewBlogs")
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("data");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  it("Should be able to get a blog by Id", (done) => {
    router()
      .get(`/api/blogs/viewBlogById/${blogId}`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        done(error);
      });
  });

  it("Should be able to update blog", (done) => {
    router()
      .put(`/api/blogs/updateBlog/${blogId}`)
      .set("Authorization", `Bearer ${token}`)
      .field("title", "title test")
      .field("description", "description test")
      .field("content", "content test")
      .attach("image", imageBuffer, "tech33.jpeg")
      .end((error, response: any) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        done(error);
      });
  });

  // Test for deleting a blogs
  it("Should be able to delete a blog by ID", (done) => {
    router()
      .delete(`/api/blogs/deleteBlog/${blogId}`)
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        done(error);
      });
  });

  it("Should be able to give an error", (done) => {
    router()
      .delete(`/api/blogs/deleteBlog/${blogId}`)
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an("object");
        done(error);
      });
  });

  it("Should be able to give an error", (done) => {
    router()
      .get(`/api/blogs/viewBlogById/${blogId}`)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an("object");
        done(error);
      });
  });

  it("Should be able to give an error", (done) => {
    router()
      .put(`/api/blogs/updateBlog/${blogId}`)
      .field("title", "title test")
      .field("description", "description test")
      .field("content", "content test")
      .attach("image", imageBuffer, "tech33.jpeg")
      .end((error, response: any) => {
        done(error);
      });
  });
})
})
