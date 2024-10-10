// Get Category From API
const getCategory = async () => {
  try {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const data = await res.json();
    showCategory(data.categories);
  } catch (error) {
    console.log("Something went wrong into getCategory()");
  }
};

// Show Category From getCategory()
const categoryContainer = document.querySelector("#categoryContainer");
const showCategory = (categories) => {
  categories.forEach((category) => {
    const { idCategory, strCategory, strCategoryThumb } = category;

    const item = document.createElement("div");
    item.className =
      "flex items-center justify-center gap-3 border px-5 py-1 rounded-full hover:bg-primary-light hover:border-primary-light";
    item.innerHTML = `
        <img src="${strCategoryThumb}" class="w-12 h-12 object-contain" alt="" />
        <h4>${strCategory}</h4>
    `;
    categoryContainer.appendChild(item);
  });
};

// Function Calls
getCategory();
