import * as chai from "chai";
import { getAllData, getSingleData } from "../services";
import { testPosts } from "./testData";
import nock from "nock";

const url = "https://test-logicloud.s3.us-west-2.amazonaws.com";

describe("Get single post and all post from services", () => {
  beforeEach(() => {
    nock(url).get("/data.json").reply(200, testPosts);
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
