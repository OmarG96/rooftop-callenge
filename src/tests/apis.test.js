const axios = require("axios");
const { getApiToken, getBlocks, checkBlocks, checkEncoded } = require("../apis");

jest.mock("axios");

const mockTestEmail = "test@test.com";
const mockToken = "token1234";
const mockBlocks = ["test1", "test2"];

beforeAll(() => {
  process.env.USER_EMAIL = mockTestEmail;
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("The apis module", () => {
  describe("when execute getApiToken", () => {
    it("return the token when the get is success", async () => {
      axios.get.mockResolvedValue({ data: { token: mockToken } });
      const token = await getApiToken();

      expect(axios.get).toBeCalledWith("/token", {
        params: {
          email: mockTestEmail,
        },
      });
      expect(token).toEqual(mockToken);
    });
  });

  describe("when execute getBlocks", () => {
    it("return the blocks when the get is success", async () => {
      axios.get.mockResolvedValue({ data: { data: mockBlocks } });
      const blocks = await getBlocks(mockToken);

      expect(axios.get).toBeCalledWith("/blocks", {
        params: {
          token: mockToken,
        },
      });
      expect(blocks).toEqual(mockBlocks);
    });
  });

  describe("when execute checkBlocks", () => {
    it("return a boolean when the get is success", async () => {
      axios.post.mockResolvedValue({ data: { message: true } });
      const response = await checkBlocks(mockBlocks, mockToken);

      expect(axios.post).toBeCalledWith(
        "/check",
        {
          blocks: mockBlocks,
        },
        {
          params: {
            token: mockToken,
          },
        }
      );
      expect(typeof response).toEqual("boolean");
    });
  });

  describe("when execute checkEncoded", () => {
    it("return a boolean when the get is success", async () => {
      axios.post.mockResolvedValue({ data: { message: true } });
      const response = await checkEncoded(mockBlocks.join(""), mockToken);

      expect(axios.post).toBeCalledWith(
        "/check",
        {
          encoded: mockBlocks.join(""),
        },
        {
          params: {
            token: mockToken,
          },
        }
      );
      expect(typeof response).toEqual("boolean");
    });
  });
});
