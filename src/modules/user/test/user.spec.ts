import app from "../../../index";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";
import { error } from "console";

chai.use(chaiHttp);
const router = () => chai.request(app);

let token: any = "";
let userId: any = "";

describe("MyBrand backend user test cases", () => {
  //tests for create user
  it("Should be able to create user", (done) => {
    router()
      .post("/api/users/signUp")
      .send({
        username: "pamella",
        email: "pamella@gmail.com",
        password: "pames@123",
      })
      .end((error,response)=>{
        expect(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", true);
        userId = response.body.data._id;
        done(error);
      });
  });
   it("Should not be able to create user with invalid credentials", (done) => {
     router()
       .post("/api/users/signUp")
       .end((error, response) => {
         expect(403)
         expect(response.body).to.be.an("object");
         expect(response.body).to.have.property("status", false);
         done(error);
       });
   });

    it("Should be able to create same user twice", (done) => {
      router()
        .post("/api/users/signUp")
        .send({
          email : "pamella@gmail.com"
        })
        .end((error, response) => {
          expect(400);
          expect(response.body).to.be.an("object");
          expect(response.body).to.have.property("status", false);
          done(error);
        });
    });

  //tests for login user
  
  it("Should login existing user", (done)=>{
    router()
    .post("/api/users/login")
    .send({
      email: "test@gmail.com",
      password: "test123"
    })
    .end((error, response)=>{
      expect(200);
      done(error)
    })
  });

  it("Should not login existing user with incorrect password", (done) => {
    router()
      .post("/api/users/login")
      .send({
        email: "test@gmail.com",
        password: "teae123",
      })
      .end((error,response)=>{
        expect(400);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", false)
        done(error)
      });
  });

  it("Should return error for invalid credentials",(done)=>{
    router()
    .post("/api/users/login")
    .end((error, response)=>{
      expect(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("status", false)
      done(error);
    })
  })

  it("Should be able to get all users",(done)=>{
    router()
    .get('/api/users/viewusers')
    .set("Authorization", `Bearer ${token}`)
    .end((error, response)=>{
      expect(200);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("status", true);
      done(error)
    })
  });

   it("Should not be able to get all users", (done) => {
     router()
       .get("/api/users/viewusers")
       .set("Authorization", `Bearer ${token}`)
       .end((error, response) => {
         expect(400);
         expect(response.body).to.be.a("object");
         expect(response.body).to.have.property("status", false);
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
        expect(response.body).to.have.property("status", true);
        done(error);
    });
  });

  it("should be able to give an error", (done)=>{
    router()
    .delete(`/api/users/deleteuser/${userId}`)
    .set("Authorization", `Bearer ${token}`)
    .end((error, response)=>{
        expect(400);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", false)
        done(error);
    });
  });
  it("Should throw new error when email is invalid",(done)=>{
    router()
    .post(`/api/users/signUp`)
    .send({
      email: "test-email",
    })
    .end((error,response)=>{
      expect(400);
      expect(response.body).to.be.an("object")
      expect(response.body).to.have.property("status", false);
      done(error);
    })
  })
});
