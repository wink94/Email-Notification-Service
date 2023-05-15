import HttpStatus from "http-status-codes";
import request from "supertest";
import express from "express";
import TemplateApi from "../templateApi";
import templateDao from "../../dao/templateDao";

jest.mock("../../dao/templateDao");
jest.mock("../../middleware/cognitoAuth", () => ({
  ...jest.requireActual("../src/middleware/cognitoAuth"),
  cognitoAuthorizer: () => async (req, res, next) => next(),
}));
const app = express();
const templateApi = new TemplateApi();
app.use(express.json());
app.use("/templates", templateApi.router);

describe("TemplateApi", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("POST /templates", () => {
    test("addTemplates API should respond with created status", async () => {
      const requestBody = {
        templateBody: {
          Template: {
            TemplateName: "Template1",
            SubjectPart: "{{subject}}",
            HtmlPart:
              "<h1>Hello {{name}},</h1><p>Are you interested in buying our {{product}}.</p>",
            TextPart:
              "Dear {{name}},\r\nYour Are you interested in buying our {{product}}.",
          },
        },
        templateName: "test1-templateName",
        templateSubject: "test1-templateSubject",
      };
      const createdTemplate = {
        // Add your created template data here
      };
      templateDao.insertTemplate.mockResolvedValue(createdTemplate);

      const response = await request(app)
        .post("/templates")
        .set("Accept", "application/json")
        .send(requestBody);

      expect(response.status).toEqual(HttpStatus.CREATED);
      expect(response.body).toStrictEqual({
        status: "success",
        data: createdTemplate,
      });
    });

    test("addTemplates API should handle errors", async () => {
      const requestBody = {
        templateBody: {
          Template: {
            TemplateName: "Template1",
            SubjectPart: "{{subject}}",
            HtmlPart:
              "<h1>Hello {{name}},</h1><p>Are you interested in buying our {{product}}.</p>",
            TextPart:
              "Dear {{name}},\r\nYour Are you interested in buying our {{product}}.",
          },
        },
        templateName: "test1-templateName",
        templateSubject: "test1-templateSubject",
      };
      templateDao.insertTemplate.mockRejectedValue(new Error("errorMessage"));

      const response = await request(app)
        .post("/templates")
        .set("Accept", "application/json")
        .send(requestBody);

      expect(response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });

  describe("GET /templates", () => {
    test("getAllTemplates API should respond with success status", async () => {
      const templatesData = [
        // Add your templates data here
      ];
      templateDao.getAllTemplates.mockResolvedValue(templatesData);

      const response = await request(app).get("/templates");

      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body).toStrictEqual({
        status: "success",
        data: templatesData,
      });
    });

    test("getAllTemplates API should handle errors", async () => {
      templateDao.getAllTemplates.mockRejectedValue(new Error("errorMessage"));

      const response = await request(app).get("/templates");

      expect(response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });

  describe("GET /templates/:templateId", () => {
    test("getTemplateById API should respond with success status", async () => {
      const templateId = "1";
      const templateData = [{ templateId :1}];
      templateDao.getTemplate.mockResolvedValue(templateData);

      const response = await request(app)

        .get(`/templates/${templateId}`)
        .set("Authorization", "123");

      expect(response.status).toEqual(HttpStatus.OK);
    });
    test("getTemplateById API should handle errors", async () => {
      const templateId = "1";
      templateDao.getTemplate.mockRejectedValue(new Error("errorMessage"));

      const response = await request(app).get("/templates/1");

      expect(response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });

  describe("DELETE /templates/:templateId", () => {
    test("deleteTemplate API should respond with no content status", async () => {
      const templateId = "1";
      templateDao.deleteTemplate.mockResolvedValue();

      const response = await request(app).delete(`/templates/${templateId}`);

      expect(response.status).toEqual(HttpStatus.NO_CONTENT);
    });
    test("deleteTemplate API should handle errors", async () => {
      const templateId = "1";
      templateDao.deleteTemplate.mockRejectedValue(new Error("errorMessage"));

      const response = await request(app).delete("/templates/1");

      expect(response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });

  describe("PATCH /templates/:templateId", () => {
    test("updateTemplate API should respond with success status", async () => {
      const templateId = "1";
      const requestBody = {
        templateBody: {
          Template: {
            TemplateName: "Template1",
            SubjectPart: "{{subject}}",
            HtmlPart:
              "<h1>Hello {{name}},</h1><p>Are you interested in buying our {{product}}.</p>",
            TextPart:
              "Dear {{name}},\r\nYour Are you interested in buying our {{product}}.",
          },
        },
        templateName: "test1-templateName",
        templateSubject: "test1-templateSubject",
      };
      templateDao.updateTemplate.mockResolvedValue();

      const response = await request(app)
        .patch(`/templates/${templateId}`)
        .set("Accept", "application/json")
        .send(requestBody);

      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body).toStrictEqual({
        status: "success",
        data: { message: "Template updated successfully." },
      });
    });
    test("updateTemplate API should handle errors", async () => {
      const templateId = "1";
      const requestBody = {
        templateBody: {
          Template: {
            TemplateName: "Template21",
            SubjectPart: "{{subject}}",
            HtmlPart:
              "<h1>Hello {{name}},</h1><p>Are you interested in buying our {{product}}.</p>",
            TextPart:
              "Dear {{name}},\r\nYour Are you interested in buying our {{product}}.",
          },
        },
      };
      templateDao.updateTemplate.mockRejectedValue(new Error("errorMessage"));

      const response = await request(app)
        .patch(`/templates/${templateId}`)
        .set("Accept", "application/json")
        .send(requestBody);

      expect(response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });
});
