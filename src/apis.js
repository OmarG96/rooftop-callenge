const axios = require("axios");

const getApiToken = async () => {
  try {
    const {
      data: { token },
    } = await axios.get("/token", {
      params: {
        email: process.env.USER_EMAIL,
      },
    });

    return token;
  } catch (error) {
    console.error("Error getting the blocks");
  }
};

const getBlocks = async (token) => {
  try {
    const {
      data: { data },
    } = await axios.get("/blocks", {
      params: { token },
    });

    return data;
  } catch (error) {
    console.error("Error getting the blocks");
  }
};

const checkBlocks = async (blocks, token) => {
  try {
    const {
      data: { message },
    } = await axios.post(
      "/check",
      {
        blocks,
      },
      { params: { token } }
    );

    return message;
  } catch (error) {
    console.error("Error checking the blocks");
  }
};

const checkEncoded = async (encoded, token) => {
  try {
    const {
      data: { message },
    } = await axios.post(
      "/check",
      {
        encoded,
      },
      {
        params: { token },
      }
    );

    return message;
  } catch (error) {
    console.error("Error checking the encoded");
  }
};

module.exports = {
  getApiToken,
  getBlocks,
  checkBlocks,
  checkEncoded,
};
