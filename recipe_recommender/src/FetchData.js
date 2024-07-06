const readJsonFile = async (filePath) => {
  const apiKey = process.env.REACT_APP_API;

  try {
    const response = await fetch(apiKey);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();

    if (!jsonData.hits) {
      throw new Error("The JSON data does not contain a 'hits' property");
    }

    const data = jsonData.hits.map((hit) => [
      hit.recipe.label,
      hit.recipe.source,
      hit.recipe.ingredients.map((ingredient) => ingredient.text),
      hit.recipe.image,
      hit.recipe.url,
      hit.recipe.totalTime,
      hit.recipe.yield,
    ]);

    return data;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return null;
  }
};
export default readJsonFile;
