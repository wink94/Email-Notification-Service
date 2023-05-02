import RecipientDao from "../recipientDao";
import { getModule } from "../../models/index";
import DBException from "../../exceptions/DBException";
import * as models from "../../models/index";

jest.mock("../../models/index");
jest.mock("../../exceptions/DBException");

describe("RecipientDao", () => {
  const mockRecipient = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(() => {
    getModule.mockReturnValue(mockRecipient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should insert a recipient", async () => {
    const dataParams = {
      toAddresses: ["abcs@gmail.com"],
      ccAddresses: [],
      bccAddresses: [],
      recipientName: "abc",
    };
    mockRecipient.create.mockResolvedValue(dataParams);

    const result = await RecipientDao.insertRecipients(dataParams);

    expect(result).toEqual(dataParams);
    expect(mockRecipient.create).toHaveBeenCalledWith(dataParams);
  });

  it("should get all recipients", async () => {
    const recipients = [
      {
        recipientId: 1,
        recipientName: "test-rec222",
        emailAddresses: {
          ccAddresses: ["abcs@gmail.com"],
          toAddresses: ["abcs@gmail.com"],
          bccAddresses: [],
        },
        active: 1,
        createdDate: "2023-04-05T14:48:27.000Z",
        modifiedDate: "2023-05-01T02:38:51.000Z",
      },
      {
        recipientId: 2,
        recipientName: "abc",
        emailAddresses: '["sahan.mendis@syscolabs.com"]',
        active: 1,
        createdDate: "2023-04-05T14:53:04.000Z",
        modifiedDate: "2023-04-05T14:53:04.000Z",
      },
    ];
    mockRecipient.findAll.mockResolvedValue(recipients);

    const result = await RecipientDao.getAllRecipient();

    expect(result).toEqual(recipients);
  });

  it("should get a recipient by ID", async () => {
    const recipient = {
      recipientId: 1,
      recipientName: "test-rec222",
      emailAddresses: {
        ccAddresses: ["abcs@gmail.com"],
        toAddresses: ["abcs@gmail.com"],
        bccAddresses: [],
      },
      active: 1,
      createdDate: "2023-04-05T14:48:27.000Z",
      modifiedDate: "2023-05-01T02:38:51.000Z",
    };
    mockRecipient.findAll.mockResolvedValue([recipient]);

    const result = await RecipientDao.getRecipient(recipient.recipientId);

    expect(result).toEqual([recipient]);
    expect(mockRecipient.findAll).toHaveBeenCalledWith({
      where: { recipientId: recipient.recipientId },
      raw: true,
    });
  });

  it("should delete a recipient", async () => {
    const recipientId = 1;
    mockRecipient.update.mockResolvedValue([1]);

    const result = await RecipientDao.deleteRecipient(recipientId);

    expect(result).toEqual([1]);
    expect(mockRecipient.update).toHaveBeenCalledWith(
      { active: 0 },
      { where: { recipientId } }
    );
  });

  it("should update a recipient", async () => {
    const recipientId = 1;
    const dataParams = {
      toAddresses: ["abcs@gmail.com"],
      ccAddresses: [],
      bccAddresses: [],
      recipientName: "abc",
    };
    mockRecipient.update.mockResolvedValue([1]);

    const result = await RecipientDao.updateRecipient(recipientId, dataParams);

    expect(result).toEqual([1]);
    expect(mockRecipient.update).toHaveBeenCalledWith(
      { ...dataParams, recipientId },
      { where: { recipientId } }
    );
  });

  it("should throw DBException when an error occurs during insert", async () => {
    mockRecipient.create.mockImplementationOnce(() => {
      throw new Error("Some Error");
    });

    try {
      await RecipientDao.insertRecipients({});
    } catch (error) {
      expect(error).toBeInstanceOf(DBException);
    }
  });

  it("should throw DBException when an error occurs during getAll", async () => {
    mockRecipient.findAll.mockImplementationOnce(() => {
      throw new Error("Some Error");
    });

    try {
      await RecipientDao.getAllRecipient();
    } catch (error) {
      expect(error).toBeInstanceOf(DBException);
    }
  });

  it("should throw DBException when an error occurs during get", async () => {
    mockRecipient.findAll.mockImplementationOnce(() => {
      throw new Error("Some Error");
    });
    try {
      await RecipientDao.getRecipient(1);
    } catch (error) {
      expect(error).toBeInstanceOf(DBException);
    }
  });

  it("should throw DBException when an error occurs during delete", async () => {
    mockRecipient.update.mockImplementationOnce(() => {
      throw new Error("Some Error");
    });

    try {
      await RecipientDao.deleteRecipient(1);
    } catch (error) {
      expect(error).toBeInstanceOf(DBException);
    }
  });

  it("should throw DBException when an error occurs during update", async () => {
    mockRecipient.update.mockImplementationOnce(() => {
      throw new Error("Some Error");
    });

    try {
      await RecipientDao.updateRecipient(1, {});
    } catch (error) {
      expect(error).toBeInstanceOf(DBException);
    }
  });
});
