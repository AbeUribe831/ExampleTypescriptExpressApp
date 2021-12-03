import * as chai from "chai";
import { getAllComments, getSingleComment } from "../controllers";
import { testComments } from "./testData";
import mockReqRes, { mockRequest, mockResponse } from "mock-req-res";

import nock from "nock";
import sinon from "sinon";

const url = "https://jsonplaceholder.typicode.com";

const goodRequest = () => {
  nock(url).get("/comments").reply(200, testComments);
};

const badRequest = (message: string) => {
  nock(url).get("/comments").reply(404, new Error(message));
};

describe("Get single comment and all comments from controllers", () => {
  let next = {} as sinon.SinonExpectation;
  let req = {} as mockReqRes.RequestOutput;
  let res = {} as mockReqRes.ResponseOutput;

  beforeEach(() => {
    next = sinon.mock();
    req = mockRequest();
    res = mockResponse();
  });
  it("request for get all comments from controller", async () => {
    goodRequest();

    await getAllComments(req, res, next);
    chai.assert.isTrue(res.status.called);
    chai.assert.isFalse(next.called);
  });
  it("request for get all comment throws error", async () => {
    badRequest("bad request");

    await getAllComments(req, res, next);
    chai.assert.isFalse(res.status.called);
    chai.assert.isTrue(next.called);
  });
  it("request for get single comment works", async () => {
    goodRequest();
    const reqWithId: any = mockRequest({ params: { id: "1" } });

    await getSingleComment(reqWithId, res, next);
    chai.assert.isTrue(res.status.called);
    chai.assert.isFalse(next.called);
  });
  it("request for get comment controllers", async () => {
    goodRequest();
    const reqWithId: any = mockRequest({ params: { id: "1200" } });

    await getSingleComment(reqWithId, res, next);
    chai.assert.isFalse(res.status.called);
    chai.assert.isTrue(next.called);
  });
});
