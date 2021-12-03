import * as chai from "chai";
import { getAllData, getSingleData } from "../services";
import { testComments } from "./testData";
import nock from "nock";

const url = "https://jsonplaceholder.typicode.com";

describe("Get single comment and all comments from services", () => {
  beforeEach(() => {
    nock(url).get("/comments").reply(200, testComments);
  });
  it("should get all data", async () => {
    const data = await getAllData();
    chai.assert.equal(data.length, 2);
  });
  it("should get one instance data", async () => {
    const id = "1";
    const data = await getSingleData(id);
    chai.assert.equal(data?.id, 1);
  });
});
