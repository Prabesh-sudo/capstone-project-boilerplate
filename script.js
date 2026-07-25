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
// ===============================
// SHOPPING CART
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

// ===============================
// SAVE CART
// ===============================

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ===============================
// UPDATE CART COUNT
// ===============================

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}

// ===============================
// RENDER CART
// ===============================

function renderCart() {
  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="text-center">Your cart is empty.</p>
    `;

    if (cartTotal) cartTotal.textContent = "0.00";

    updateCartCount();

    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
      <div class="cart-item d-flex align-items-center justify-content-between mb-3">

          <img
            src="${item.image}"
            width="60"
            height="60"
            style="object-fit:contain">

          <div class="flex-grow-1 px-3">

              <h6>${item.title}</h6>

              <small>$${item.price}</small>

              <div class="mt-2">

                  <button
                    class="btn btn-sm btn-outline-secondary decreaseQty"
                    data-id="${item.id}">
                    -
                  </button>

                  <span class="mx-2">${item.quantity}</span>

                  <button
                    class="btn btn-sm btn-outline-secondary increaseQty"
                    data-id="${item.id}">
                    +
                  </button>

              </div>

          </div>

          <button
            class="btn btn-danger btn-sm removeCart"
            data-id="${item.id}">
            Remove
          </button>

      </div>
  `,
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartTotal) {
    cartTotal.textContent = total.toFixed(2);
  }

  updateCartCount();

  saveCart();
}

// ===============================
// ADD PRODUCT TO CART
// ===============================

function addToCart(id) {
  const product = products.find((item) => item.id == id);

  if (!product) return;

  const existing = cart.find((item) => item.id == id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  renderCart();

  showToast("Product added to cart");
}

// ===============================
// REMOVE ITEM
// ===============================

function removeFromCart(id) {
  cart = cart.filter((item) => item.id != id);

  renderCart();

  showToast("Item removed");
}

// ===============================
// CHANGE QUANTITY
// ===============================

function increaseQty(id) {
  const item = cart.find((product) => product.id == id);

  if (!item) return;

  item.quantity++;

  renderCart();
}

function decreaseQty(id) {
  const item = cart.find((product) => product.id == id);

  if (!item) return;

  item.quantity--;

  if (item.quantity <= 0) {
    cart = cart.filter((product) => product.id != id);
  }

  renderCart();
}

// ===============================
// EVENT DELEGATION
// ===============================

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("addCart")) {
    addToCart(e.target.dataset.id);
  }

  if (e.target.classList.contains("removeCart")) {
    removeFromCart(e.target.dataset.id);
  }

  if (e.target.classList.contains("increaseQty")) {
    increaseQty(e.target.dataset.id);
  }

  if (e.target.classList.contains("decreaseQty")) {
    decreaseQty(e.target.dataset.id);
  }
});

// ===============================
// TOAST MESSAGE
// ===============================

function showToast(message) {
  let toast = document.getElementById("toast");

  if (!toast) {
    toast = document.createElement("div");

    toast.id = "toast";

    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.padding = "12px 20px";
    toast.style.background = "#198754";
    toast.style.color = "#fff";
    toast.style.borderRadius = "8px";
    toast.style.zIndex = "9999";
    toast.style.fontWeight = "600";

    document.body.appendChild(toast);
  }

  toast.textContent = message;

  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}

// ===============================
// CLEAR CART
// ===============================

const clearCartBtn = document.getElementById("clearCart");

if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    cart = [];

    renderCart();

    showToast("Cart cleared");
  });
}

// ===============================
// INITIALIZE
// ===============================

window.addEventListener("DOMContentLoaded", () => {
  loadProducts();

  renderCart();
});
