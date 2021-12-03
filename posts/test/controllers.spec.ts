import * as chai from "chai";
import { getAllPosts, getSinglePost } from "../controllers";
import { testPosts } from "./testData";
import { mockRequest, mockResponse } from "mock-req-res";

import nock from "nock";
import sinon from "sinon";

const url = "https://test-logicloud.s3.us-west-2.amazonaws.com";

const goodRequest = () => {
  nock(url).get("/data.json").reply(200, testPosts);
};

const badRequest = (message: string) => {
  nock(url).get("/data.json").reply(404, new Error(message));
};

describe("Get single post and all posts from controllers", () => {
  it("request for get all posts from controller", async () => {
    goodRequest();
    const next = sinon.mock();
    const req = mockRequest();
    const res = mockResponse();

    await getAllPosts(req, res, next);
    chai.assert.isTrue(res.status.called);
    chai.assert.isFalse(next.called);
  });
  it("request for get all post throws error", async () => {
    badRequest("bad request");
    const next = sinon.mock();
    const req = mockRequest();
    const res = mockResponse();

    await getAllPosts(req, res, next);
    chai.assert.isFalse(res.status.called);
    chai.assert.isTrue(next.called);
  });
  it("request for get single post works", async () => {
    goodRequest();
    const next = sinon.mock();
    const req: any = mockRequest({ params: { id: "1" } });
    const res = mockResponse();

    await getSinglePost(req, res, next);
    chai.assert.isTrue(res.status.called);
  });
  it("request for get all post controllers false", async () => {
    badRequest("id not found");
    const next = sinon.mock();
    const req: any = mockRequest({
      params: {
        id: "1200",
      },
    });
    /*const req = mockRequest({params: {
			id: "1200"
		}}) as Request<{id :string}>
		*/
    const res = mockResponse();

    await getSinglePost(req, res, next);
    chai.assert.isFalse(res.status.called);
    chai.assert.isTrue(next.called);
  });
});
