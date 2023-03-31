import request from "supertest";

import app from "../src/app";

describe("GET /api/check", () => {
  it("should return 200 OK", () => {
    return request(app)
      .get("/api/check")
      .expect(200)
      .expect({ msg: "API is working fine" });
  });
});
