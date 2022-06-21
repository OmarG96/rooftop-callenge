const axios = require("axios");

const initAxios = () => {
  axios.defaults.baseURL = process.env.API_BASE_URL;
};

module.exports = {
  initAxios,
};
