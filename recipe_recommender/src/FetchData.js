const readJsonFile = async (apiKey) => {
  try {
    const response = await fetch(apiKey);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();
    console.log("Fetching!");
    return jsonData;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return null;
  }
};
export default readJsonFile;
