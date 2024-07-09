import axios from "axios";

const readJsonFile = async (apiKey, filterList, page = 1, limit = 20) => {
  try {
    let params = new URLSearchParams({
      page: page,
      limit: limit,
    });

    if (filterList.length > 0) {
      filterList.forEach((filter) => {
        params.append("categories", filter);
      });
    }

    const response = await axios.post(`${apiKey}/filter/`, null, {
      params: params,
    });

    console.log("Fetching!");
    return response.data.data;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return null;
  }
};

export default readJsonFile;
