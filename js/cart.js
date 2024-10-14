// Cart Section
const getDataFromLocalStorage = () => {
  let arr = [];
  const storedDate = localStorage.getItem("cart");
  if (storedDate) {
    arr = JSON.parse(storedDate);
  }

  return arr;
};

// cart count
const cartCount = document.querySelector("#itemCount");
const setCartCount = () => {
  cartCount.innerText = getDataFromLocalStorage().length;
};
setCartCount();

/*
Cart Item Section
*/
const getProduct = () => {
  const arr = getDataFromLocalStorage();

  arr.map((id) => {
    getProductFromApi(id);
  });
};

const getProductFromApi = async (id = "") => {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    displayProduct(data.meals);
  } catch (error) {
    console.log(error);
  }
};

// Display product
const productContainer = document.querySelector("#foodContainer");
const displayProduct = (product) => {
  const { strMeal, strMealThumb, strInstructions, idMeal } = product[0];
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
         
      `;
  productContainer.appendChild(item);
};

getProduct();
