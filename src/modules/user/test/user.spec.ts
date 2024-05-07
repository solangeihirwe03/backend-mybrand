import app from "../../../index";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";
import { response } from "express";

chai.use(chaiHttp);
const router = () => chai.request(app);

let token: any = "";
let userId: any = "";

describe("MyBrand backend user test cases", () => {
  //tests for create user
  it("Should be able to create user", (done) => {
    router()
      .post("/api/users/signup")
      .send({
        username: "Solange",
        email: "solange@gmail.com",
        password: "sol@123",
      })
      .end((error, response: any) => {
        if (error) {
          done(error);
          return;
        }
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.have.property("username", "Solange");
        expect(response.body.data).to.have.property(
          "email",
          "solange@gmail.com"
        );
        userId = response._body.data._id;
        done();
      });
  });

  it("should give an error", (done) => {
    router()
      .post("/api/users/signup")
      .send({
        username: "Solange",
        email: "solange@gmail.com",
        password: "sol@123",
      })
      .end((error, response: any) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an("object");
        done(error);
      });
  });

  //tests for login user

  it("Should be able to log in an existing user", (done) => {
    router()
      .post("/api/users/login")
      .send({
        email: "solange@gmail.com",
        password: "solange_03",
      })
      .end((error, response: any) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("data");
        token = response._body.data.token;
        done(error);
      });
  });

  it("Should be able to give an error", (done) => {
    router()
      .post("/api/users/login")
      .send({
        email: "solange2gmail.com",
        password: "sol@g123",
      })
      .end((error, response: any) => {
        expect(response).to.have.status(404);
        expect(response).to.be.an("object");
        done(error);
      });
  });

  //tests for deleting user
  it("Should delete an existing user",(done)=>{
    router()
    .delete(`/api/users/deleteuser/${userId}`)
    .set("Authorization", `Bearer ${token}`)
    .end((error, response:any)=>{
        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body.message).to.be.a("string");
        done(error);
    });
  });

  it("should be able to give an error", (done)=>{
    router()
    .delete(`/api/users/deleteuser/${userId}`)
    .set("Authorization", `Bearer ${token}`)
    .end((error, response)=>{
        expect(response).to.have.status(404);
        expect(response.body).to.be.an("object");
        done(error);
    });
  });
});
