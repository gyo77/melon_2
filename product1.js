document.addEventListener("DOMContentLoaded", function () {
  const minusBtn = document.getElementById("quantity-minus");
  const plusBtn = document.getElementById("quantity-plus");
  const quantitySpan = document.getElementById("quantity");
  const colorSelect = document.getElementById("color-select");
  const sizeSelect = document.getElementById("size-select");
  const addToCartBtn = document.querySelector(".btn-primary");
  const cartBadge = document.getElementById("cart-quantity-badge");
  let quantity = 1;

  function updateDetails() {
    const details = `색상: ${colorSelect.value}, 사이즈: ${sizeSelect.value}, 수량: ${quantity}`;
    let detailsDiv = document.getElementById("selected-details");
    if (!detailsDiv) {
      detailsDiv = document.createElement("div");
      detailsDiv.id = "selected-details";
      detailsDiv.style.marginTop = "12px";
      detailsDiv.style.fontSize = "1rem";
      quantitySpan.parentNode.insertAdjacentElement("afterend", detailsDiv);
    }
    detailsDiv.innerHTML = `${details} <button id='delete-details' style='margin-left: 10px;'>삭제</button>`;

    const deleteButton = document.getElementById("delete-details");
    deleteButton.addEventListener("click", function () {
      detailsDiv.style.display = "none";
    });
  }

  function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = total;
  }

  minusBtn.addEventListener("click", function () {
    if (quantity > 1) {
      quantity--;
      quantitySpan.textContent = quantity;
      updateDetails();
    }
  });
  plusBtn.addEventListener("click", function () {
    quantity++;
    quantitySpan.textContent = quantity;
    updateDetails();
  });
  colorSelect.addEventListener("change", updateDetails);
  sizeSelect.addEventListener("change", updateDetails);

  addToCartBtn.addEventListener("click", function () {
    // 상품 정보
    const product = {
      title: document.querySelector(".product-title").textContent,
      color: colorSelect.value,
      size: sizeSelect.value,
      quantity: quantity,
    };
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();

    // 상세 내역 표시
    const detailsDiv = document.getElementById("selected-details");
    if (detailsDiv) {
      detailsDiv.style.display = "block";
    }

    alert("장바구니에 추가되었습니다!");
    window.location.href = "cart.html";
  });

  // 최초 내역 및 장바구니 뱃지 표시
  updateDetails();
  updateCartBadge();
});
