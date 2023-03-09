const apis = require("../apis");
const { app } = require("../app");

jest.mock("../apis");

const mockToken = "token1234";
const mockBlocks = ["test1", "test3", "test2"];
const mockSortedBlocks = ["test1", "test3", "test2"];

beforeEach(() => {
  apis.getApiToken.mockResolvedValue(mockToken);
  apis.getBlocks.mockResolvedValue(mockBlocks);
  apis.checkEncoded.mockResolvedValue(false);
  apis.checkBlocks.mockResolvedValue(mockSortedBlocks);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("The app function", () => {
  it("should to get the token", async () => {
    await app();
    expect(apis.getApiToken).toBeCalledTimes(1);
  });

  it("should to call just the checkEncoded function if the array blocks is sorted by default", async () => {
    apis.checkEncoded.mockResolvedValue(true);
    const response = await app();

    expect(apis.checkEncoded).toBeCalledTimes(1);
    expect(apis.checkBlocks).toBeCalledTimes(0);
    expect(response).toBeTruthy();
  });

  it("should to return true if the blocks array is sorted", async () => {
    apis.checkEncoded.mockResolvedValueOnce(false).mockResolvedValueOnce(true);
    const response = await app();

    expect(apis.checkEncoded).toBeCalledTimes(2);
    expect(apis.checkBlocks).toBeCalledTimes(1);
    expect(response).toBeTruthy();
  });

  it("should to return false if the blocks array is not sorted", async () => {
    apis.checkEncoded.mockResolvedValueOnce(false).mockResolvedValueOnce(false);
    const response = await app();

    expect(apis.checkEncoded).toBeCalledTimes(2);
    expect(apis.checkBlocks).toBeCalledTimes(1);
    expect(response).toBeTruthy();
  });
});
