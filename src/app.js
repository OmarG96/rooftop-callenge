require("dotenv").config();
const { getApiToken, getBlocks, checkEncoded } = require("./apis");
const { check } = require("./check");
const { initAxios } = require("./config/axios.config");

initAxios();

const app = async () => {
  const token = await getApiToken();
  const blocksToSort = await getBlocks(token);

  let isSorted = await checkEncoded(blocksToSort.join(""), token);

  if (isSorted) {
    return true;
  }

  const sortedBlocks = await check(blocksToSort, token);
  isSorted = await checkEncoded(sortedBlocks.join(""), token);

  if (isSorted) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  app,
};
