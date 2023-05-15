import TemplateDao from "../templateDao";
import { getModule } from "../../models/index";
import DBException from "../../exceptions/DBException";

jest.mock("../../models/index");
jest.mock("../../exceptions/DBException");
jest.mock("../../services/sesService/sesService")
describe("TemplateDao", () => {
  const mockTemplate = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    upsert: jest.fn(),
  };

  beforeEach(() => {
    getModule.mockReturnValue(mockTemplate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should insert a template", async () => {
    const dataParams = {
      templateBody: {
        Template: {
          TemplateName: "Template2",
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
    mockTemplate.create.mockResolvedValue(dataParams);

    const result = await TemplateDao.insertTemplate(dataParams);

    expect(result).toEqual(dataParams);
    expect(mockTemplate.create).toHaveBeenCalledWith(dataParams);
  });

  it("should throw DBException when an error occurs during insertTemplate", async () => {
    mockTemplate.create.mockImplementationOnce(() => {
      throw new Error("Some Error");
    });

    try {
      await TemplateDao.insertTemplate({});
    } catch (error) {
      expect(error).toBeInstanceOf(DBException);
    }
  });

  it("should get all templates", async () => {
    const templates = [
      {
        templateId: 1,
        templateName: "Template12",
        templateBody: {
          Template: {
            HtmlPart:
              "<h1>Hello {{name}},</h1><p>Are you interested in buying our {{product}}.</p>",
            TextPart:
              "Dear {{name}},\r\nYour Are you interested in buying our {{product}}.",
            SubjectPart: "{{subject}}",
            TemplateName: "Template21",
          },
        },
        active: 1,
        templateSubject: '"test1-templateSubject"',
        createdDate: "2023-04-19T01:57:21.000Z",
        modifiedDate: "2023-05-01T02:17:34.000Z",
      },
    ];
    mockTemplate.findAll.mockResolvedValue(templates);

    const result = await TemplateDao.getAllTemplates();

    expect(result).toEqual(templates);
  });

  it("should get a template by ID", async () => {
    const templateId = 1;
    const template = {
      templateId: 1,
      templateName: "Template12",
      templateBody: {
        Template: {
          HtmlPart:
            "<h1>Hello {{name}},</h1><p>Are you interested in buying our {{product}}.</p>",
          TextPart:
            "Dear {{name}},\r\nYour Are you interested in buying our {{product}}.",
          SubjectPart: "{{subject}}",
          TemplateName: "Template21",
        },
      },
      active: 1,
      templateSubject: '"test1-templateSubject"',
      createdDate: "2023-04-19T01:57:21.000Z",
      modifiedDate: "2023-05-01T02:17:34.000Z",
    };
    mockTemplate.findAll.mockResolvedValue([template]);

    const result = await TemplateDao.getTemplate(templateId);

    expect(result).toEqual([template]);
    expect(mockTemplate.findAll).toHaveBeenCalledWith({
      where: { templateId, active: 1 },
      raw: true,
    });
  });

  it("should delete a template", async () => {
    const templateId = 1;
    mockTemplate.update.mockResolvedValue([1]);

    const result = await TemplateDao.deleteTemplate(templateId);

    expect(result).toEqual([1]);
    expect(mockTemplate.update).toHaveBeenCalledWith(
      { active: 0 },
      { where: { templateId } }
    );
  });

  it("should update a template", async () => {
    const templateId = 1;
    const dataParams = {
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
      templateName: "Template12",
      templateSubject: "test1-templateSubject",
    };
    mockTemplate.update.mockResolvedValue(true);

    const result = await TemplateDao.updateTemplate(templateId, dataParams);
    console.log("🚀 ~ file: templateDao.test.js:150 ~ it ~ result:", result)

    expect(result).toEqual(true);
    expect(mockTemplate.update).toHaveBeenCalledWith(
      { templateId, ...dataParams },
      { where: { templateId} }
    );
  });

  it("should throw DBException when an error occurs during getAllTemplates", async () => {
    mockTemplate.findAll.mockImplementationOnce(() => {
      throw new Error("Some Error");
    });

    try {
      await TemplateDao.getAllTemplates();
    } catch (error) {
      expect(error).toBeInstanceOf(DBException);
    }
  });

  it("should throw DBException when an error occurs during getTemplate", async () => {
    mockTemplate.findAll.mockImplementationOnce(() => {
      throw new Error("Some Error");
    });

    try {
      await TemplateDao.getTemplate(1);
    } catch (error) {
      expect(error).toBeInstanceOf(DBException);
    }
  });

  it("should throw DBException when an error occurs during deleteTemplate", async () => {
    mockTemplate.update.mockImplementationOnce(() => {
      throw new Error("Some Error");
    });

    try {
      await TemplateDao.deleteTemplate(1);
    } catch (error) {
      expect(error).toBeInstanceOf(DBException);
    }
  });

  it("should throw DBException when an error occurs during updateTemplate", async () => {
    mockTemplate.upsert.mockImplementationOnce(() => {
      throw new Error("Some Error");
    });

    try {
      await TemplateDao.updateTemplate(1, {});
    } catch (error) {
      expect(error).toBeInstanceOf(DBException);
    }
  });
});
