const apis = require("../apis");
const { check } = require("../check");

jest.mock("../apis");

afterEach(() => {
  jest.resetAllMocks();
});

const mockExpected = ["first", "second", "third", "fourth", "fifth"];
const mockToSort = ["first", "third", "second", "fourth", "fifth"];
const mockToken = "token123";

describe("The check function", () => {
  it("should to sort a blocks array and return it", async () => {
    apis.checkBlocks
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(true);
    const sortedBlocks = await check(mockToSort, mockToken);

    expect(sortedBlocks).toEqual(mockExpected);
    expect(apis.checkBlocks).toBeCalledTimes(4);
    expect(apis.checkBlocks).toHaveBeenNthCalledWith(
      1,
      ["first", "third"],
      mockToken
    );
    expect(apis.checkBlocks).toHaveBeenNthCalledWith(
      2,
      ["first", "second"],
      mockToken
    );
    expect(apis.checkBlocks).toHaveBeenNthCalledWith(
      3,
      ["second", "third"],
      mockToken
    );
    expect(apis.checkBlocks).toHaveBeenNthCalledWith(
      4,
      ["third", "fourth"],
      mockToken
    );
  });

  it("shouldn't to call checkBlocks api if the array length to sort is 2 or less", async () => {
    const sortedBlocks = await check(["12", "34"], mockToken);

    expect(sortedBlocks).toEqual(["12", "34"]);
    expect(apis.checkBlocks).toBeCalledTimes(0);
  });
});
