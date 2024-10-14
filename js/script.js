// Global Scope
let isButtonClicked = true;

document
  .querySelector("#categoryAllItem")
  .classList.add("border-primary", "bg-primary-light");

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

    item.addEventListener("click", (e) => {
      getFoodsByCategory(`${strCategory}`);

      // Set category active
      setCategoryActive(e.target);
    });

    item.className =
      "categoryBtn flex items-center justify-center gap-3 border px-5 py-1 rounded-full hover:bg-primary-light hover:border-primary";
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
    isButtonClicked ? showFoods(data.meals) : showFoods(data.meals.slice(0, 8));
  } catch (error) {
    console.log("Something went wrong in getFoods()");
  }
};

// Show Foods from getFoods
const foodContainer = document.querySelector("#foodContainer");
const showFoods = (foods) => {
  foodContainer.innerHTML = "";
  foodContainer.classList.remove("grid");
  foodContainer.innerHTML = `<span class="loading loading-spinner text-warning loading-lg"></span>`;
  // set timeout
  setTimeout(() => {
    foodContainer.innerHTML = "";
    foodContainer.classList.add("grid");
    foods.map((food) => {
      const { strMeal, strMealThumb, strInstructions, idMeal } = food;
      const item = document.createElement("div");
      item.className = "p-4 border rounded-md space-y-3 relative";
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
          ${strInstructions || "N/A"}
          </p>
          <button class="btn bg-primary">Show Details</button>
          <button onclick="cartClicked(${idMeal})" class="w-10 h-10 btn bg-black border-black text-xl text-white btn-sm rounded absolute -top-3 right-0"><i class='bx bx-cart'></i></button>

      `;
      foodContainer.appendChild(item);
    });
  }, 1000);
};

// Get Foods from API using Categories
const getFoodsByCategory = async (category = "") => {
  try {
    const res = await fetch(
      `${
        category
          ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
          : `https://www.themealdb.com/api/json/v1/1/search.php?s=`
      }`
    );
    const data = await res.json();
    showFoods(data.meals);
  } catch (e) {
    console.log(e);
  }
};

// Set category active
const setCategoryActive = (e) => {
  const categoriesBtn = document.getElementsByClassName("categoryBtn");
  for (const category of categoriesBtn) {
    category.classList.remove("border-primary", "bg-primary-light");
  }

  e.closest(".categoryBtn").classList.add("border-primary", "bg-primary-light");
};

// Search Input
document.querySelector("#searchInput").addEventListener("keyup", (e) => {
  getFoods(e.target.value);
});

// See All Foods Button
const seeAllFoods = () => {
  isButtonClicked = true;
  const container = document.querySelector("#seeAllContainer");
  container.innerHTML = `<span class="loading loading-spinner text-warning loading-lg"></span>`;

  setTimeout(() => {
    getFoods();
    container.innerHTML = "";
  }, 1000);
};

// Function Calls
getCategory();
getFoods();

const getDataFromLocalStorage = () => {
  let arr = [];
  const storedDate = localStorage.getItem("cart");
  if (storedDate) {
    arr = JSON.parse(storedDate);
  }

  return arr;
};

const cartClicked = (id) => {
  const storedData = getDataFromLocalStorage();
  storedData.push(id);
  localStorage.setItem("cart", JSON.stringify(storedData));

  cartCount.innerText = storedData.length;
};

// Cart Section
// cart count
const cartCount = document.querySelector("#itemCount");
const setCartCount = () => {
  cartCount.innerText = getDataFromLocalStorage().length;
};
setCartCount();

const cartBtn = () => {
  window.location.href = "../cart.html";
};
