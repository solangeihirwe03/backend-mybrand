import app from "../../../index";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";

chai.use(chaiHttp);
const router = () => chai.request(app);

describe("MyBrand backend message test cases", () => {

  let messageId: any = "";
  let token: any = "";

  it("Should login existing user", ()=>{
    router()
    .post("/api/users/login")
    .send({
      email: "test@gmail.com",
      password: "test123"
    })
    .end()
  })
  // Test for creating message
  it("Should be able to create message", (done) => {
    router()
      .post("/api/messages/createMessage")
      .send({
        name: "solange",
        contact: "0789877243",
        email: "aime@gmail.com",
        message: "hello there",
      })
      .end((error, response: any) => {
        expect(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("data");
        messageId = response._body.data._id;
        done(error);
      });
  });

  it("Should not be able to create message with invalid credentials ", (done) => {
    router()
      .post("/api/messages/createMessage")
      .end((error, response: any) => {
        expect(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  // Test for view messages
  it("Should be able to get all messages", (done) => {
    router()
      .get(`/api/messages/viewMessages`)
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(200);
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("status", true);
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.be.an("array");
        done(error);
      });
  });


  // Test for deleting a message
 it("Should return an error if the message doesn't exist", (done) => {
   router()
     .delete(`/api/messages/deleteMessage/${messageId}`) // Use a non-existent ID
     .set("Authorization", `Bearer ${token}`)
     .send({
       id: messageId,
     })
     .end((error, response) => {
       expect(response).to.have.status(500);
       expect(response.body).to.be.an("object");
       expect(response.body).to.have.property("status", false);
       expect(response.body).to.have.property(
         "message",
         "message doesn't exist"
       );
       done(error);
     });
 });

  it("Should be able to delete a message by ID", (done) => {
    router()
      .delete(`/api/messages/deleteMessage/${messageId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        id:messageId
      })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", true);
        expect(response.body).to.have.property("message");
        done(error);
      });
  });

  it("Should be able to get a message by ID", (done) => {
    router()
      .delete(`/api/messages/deleteMessage/${messageId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: messageId,
      })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", true);
        expect(response.body).to.have.property("message");
        done(error);
      });
  });
});
