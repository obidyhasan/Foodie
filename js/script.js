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

// Get Foods from API
const getFoods = async (search = "") => {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    );
    const data = await res.json();
    showFoods(data.meals);
  } catch (error) {
    console.log("Something went wrong in getFoods()");
  }
};

// Show Foods from getFoods
const foodContainer = document.querySelector("#foodContainer");
const showFoods = (foods) => {
  foods.forEach((food) => {
    const { strMeal, strMealThumb, strInstructions } = food;
    const item = document.createElement("div");
    item.className = "p-4 border rounded-md space-y-3";
    item.innerHTML = `
        <figure class="w-full h-[200px]">
            <img
            src="${strMealThumb}"
            class="w-full h-full object-cover rounded-lg"
            alt=""
            />
        </figure>
        <h2 class="text-xl font-semibold">${strMeal}</h2>
        <p
            class="line-clamp-2 text-sm text-gray-500"
        >
        ${strInstructions}
        </p>
        <button class="btn bg-primary">Show Details</button>
    `;
    foodContainer.appendChild(item);
  });
};

// Function Calls
getCategory();
getFoods();
