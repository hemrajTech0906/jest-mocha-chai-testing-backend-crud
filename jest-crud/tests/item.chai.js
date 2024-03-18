// const chai = require("chai");
// // import chai from 'chai';
// const app = require("../app");
// const chaiHttp = require("chai-http");
// const { createItem } = require("../controllers/itemController");

// chai.use(chaiHttp);
// const expect = chai.expect;

// describe("ITEM API", () => {
//   let createdItemId;

//   it("should create a new", async () => {
//     const response = await chai
//       .request(app)
//       .post("/api/items")
//       .send({ name: "Test Item", description: "TEST DESCRIPTION", price: 20 });
//     expect(response).to.have.status(201);
//     expect(response.body.success).to.be.true;
//     expect(response.body.item).to.have.property("_id");
//     createdItemId = response.body.item._id;
//   });

//   it("should get all items", async () => {
//     const response = await chai.request(app).get("/api/items");
//     expect(response).to.have.status(200);
//     expect(response.body.success).to.be.true;
//     expect(response.body.items).to.be.an("array").that.is.not.empty();
//   });

//   it("should get specific item by the ID", async () => {
//     const response = await chai.request(app).get(`/api/items/${createdItemId}`);
//     expect(response).to.have.status(200);
//     expect(response.body.success).to.be.true;
//     expect(response.body.item).to.have.property("_id", createdItemId);
//   });

//   it("should update of an existing item", async () => {
//     const response = await chai
//       .request(app)
//       .put(`/api/items/${createdItemId}`)
//       .send({ name: "Updated Test Item", price: 22 });
//     expect(response).to.have.status(200);
//     expect(response.body.success).to.be.true;
//     expect(response.body.item).to.have.property("name","Updated Test Item");
//     expect(response.body.item).to.have.property("price",22)
//   });


//   it("should delete of an item",async ()=>{
//     const response=await chai.request(app).delete(`/api/items/${createItem}`);
//     expect(response).to.have.status(200);
//     expect(response.body.success).to.be.true;
//     expect(response.body.message).to.equal('Item deleted successfully')
//   })
// });








const chai = require("chai");
const app = require("../app");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const expect = chai.expect;

describe("ITEM API", () => {
  let createdItemId;

  it("should create a new item", async () => {
    const response = await chai
      .request(app)
      .post("/api/items")
      .send({ name: "Test Item", description: "TEST DESCRIPTION", price: 20 });
    expect(response).to.have.status(201);
    expect(response.body.success).to.be.true;
    expect(response.body.item).to.have.property("_id");
    createdItemId = response.body.item._id;
  });

  it("should get all items", async () => {
    const response = await chai.request(app).get("/api/items");
    expect(response).to.have.status(200);
    expect(response.body.success).to.be.true;
    expect(response.body.items).to.be.an("array").that.is.not.empty;
  });

  it("should get specific item by the ID", async () => {
    const response = await chai.request(app).get(`/api/items/${createdItemId}`);
    expect(response).to.have.status(200);
    expect(response.body.success).to.be.true;
    expect(response.body.item).to.have.property("_id", createdItemId);
  });

  it("should update an existing item", async () => {
    const response = await chai
      .request(app)
      .put(`/api/items/${createdItemId}`)
      .send({ name: "Updated Test Item", price: 22 });
    expect(response).to.have.status(200);
    expect(response.body.success).to.be.true;
    expect(response.body.item).to.have.property("name", "Updated Test Item");
    expect(response.body.item).to.have.property("price", 22);
  });

  it("should delete an item", async () => {
    const response = await chai.request(app).delete(`/api/items/${createdItemId}`);
    expect(response).to.have.status(200);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal("Item deleted successfully");
  });
});
