import CognitoExpress from "cognito-express";
import HttpStatus from "http-status-codes";
import { setResponseForCognitoValidation, cognitoAuthorizer } from "../cognitoAuth"; // replace 'yourfile' with actual file name
import { PoolData } from "../../util/constant";

jest.mock("cognito-express");

describe("Auth functions", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockRequest = (headers) => {
    return { headers };
  };

  const mockNext = jest.fn();

  describe("setResponseForCognitoValidation", () => {
    it("should return an unauthorized error for an invalid JWT token", () => {
      const res = mockResponse();
      const error = "Not a valid JWT token";
      setResponseForCognitoValidation(error, res, mockNext, "token");
      expect(res.status).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
      expect(res.send).toHaveBeenCalled();
    });

    // add more tests here for different error conditions
  });

  describe("cognitoAuthorizer", () => {
    it("should return an unauthorized error if no token is provided", async () => {
      const req = mockRequest({});
      const res = mockResponse();
      await cognitoAuthorizer()(req, res, mockNext);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
      expect(res.send).toHaveBeenCalled();
    });

    it("should call validate with the provided token", async () => {
      const req = mockRequest({ authorization: "token" });
      const res = mockResponse();
      CognitoExpress.mockImplementation(() => {
        return {
          validate: jest.fn((token, cb) => cb(null, {})),
        };
      });
      await cognitoAuthorizer()(req, res, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    // add more tests here for different conditions
  });
});
