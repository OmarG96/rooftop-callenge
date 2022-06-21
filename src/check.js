const { checkBlocks } = require("./apis");

const check = async (blocks = [], token) => {
  let sortedBlocks = [...blocks];
  let sortedToIndex = 0;

  while (sortedToIndex !== sortedBlocks.length - 2) {
    for (let i = sortedToIndex + 1; i < sortedBlocks.length; i++) {
      const areConsecutives = await checkBlocks(
        [sortedBlocks[sortedToIndex], sortedBlocks[i]],
        token
      );

      if (areConsecutives) {
        const elementToMove = sortedBlocks.splice(i, 1);
        sortedBlocks.splice(sortedToIndex + 1, 0, elementToMove[0]);
        sortedToIndex++;
        break;
      }
    }
  }

  return sortedBlocks;
};

module.exports = {
  check,
};
