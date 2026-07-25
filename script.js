// ================================
// E-Commerce Landing Page
// script.js
// ================================

const API_URL = "https://fakestoreapi.com/products";

let products = [];
let filteredProducts = [];

// DOM Elements
const productContainer = document.getElementById("productContainer");
const categoryContainer = document.getElementById("categoryButtons");
const searchInput = document.getElementById("searchInput");
const errorBox = document.getElementById("errorMessage");
const loading = document.getElementById("loading");

// ===============================
// FETCH PRODUCTS
// ===============================

async function loadProducts() {
  loading.innerHTML = "<h4>Loading Products...</h4>";
  errorBox.innerHTML = "";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Unable to fetch products.");
    }

    products = await response.json();

    filteredProducts = [...products];

    renderCategories(products);
    renderProducts(filteredProducts);
  } catch (error) {
    errorBox.innerHTML = `
            <div class="alert alert-danger text-center">
                <h5>⚠ Unable to load products.</h5>
                <p>${error.message}</p>
                <button class="btn btn-primary mt-2"
                    onclick="loadProducts()">
                    Retry
                </button>
            </div>
        `;
  } finally {
    loading.innerHTML = "";
  }
}

// ===============================
// RENDER PRODUCTS (.map())
// ===============================

function renderProducts(data) {
  if (!data.length) {
    productContainer.innerHTML = `
            <div class="col-12">
                <h4 class="text-center">
                    No products found.
                </h4>
            </div>
        `;

    return;
  }

  productContainer.innerHTML = data
    .map(
      (product) => `

        <div class="product-card">

            <img
                src="${product.image}"
                alt="${product.title}"
                class="product-image">

            <h5>${product.title}</h5>

            <p class="category">
                ${product.category}
            </p>

            <h4>$${product.price}</h4>

            <button
                class="btn btn-primary addCart"
                data-id="${product.id}">
                Add to Cart
            </button>

        </div>

    `,
    )
    .join("");
}

// ===============================
// CATEGORY BUTTONS (.map())
// ===============================

function renderCategories(products) {
  const categories = ["All", ...new Set(products.map((item) => item.category))];

  categoryContainer.innerHTML = categories
    .map(
      (category) => `

        <button
            class="btn btn-outline-dark filterBtn"
            data-category="${category}">
            ${category}
        </button>

    `,
    )
    .join("");
}

// ===============================
// FILTER (.filter())
// ===============================

document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("filterBtn")) return;

  const category = e.target.dataset.category;

  if (category === "All") {
    filteredProducts = [...products];
  } else {
    filteredProducts = products.filter(
      (product) => product.category === category,
    );
  }

  renderProducts(filteredProducts);
});

// ===============================
// SEARCH (.filter())
// ===============================

searchInput.addEventListener("keyup", function () {
  const keyword = this.value.toLowerCase();

  const results = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(keyword),
  );

  renderProducts(results);
});
