import "./style.css";

document.addEventListener("DOMContentLoaded", function () {
  // A/B Test Popup Logic
  const abTestPopupOverlay = document.getElementById("ab-test-popup-overlay");
  const popupA = document.getElementById("popup-a");
  const popupB = document.getElementById("popup-b");
  const popupCloseButtons = document.querySelectorAll(".popup-close-button");

  const variant = Math.random() < 0.5 ? "A" : "B"; // 50/50 A/B split
  console.log("Showing popup variant:", variant);

  if (variant === "A") {
    popupA.style.display = "block";
  } else {
    popupB.style.display = "block";
  }
  abTestPopupOverlay.style.display = "flex";
  abTestPopupOverlay.style.zIndex = "9999"; // Ensure popup is on top
  console.log("abTestPopupOverlay display set to flex");

  popupCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      abTestPopupOverlay.style.display = "none";
    });
  });

  // Close popup when clicking outside the modal content
  if (abTestPopupOverlay) {
    abTestPopupOverlay.addEventListener("click", (event) => {
      if (event.target === abTestPopupOverlay) {
        abTestPopupOverlay.style.display = "none";
      }
    });
  }

  // Cart Modal Logic
  const cartModalOverlay = document.getElementById("cart-modal-overlay");
  const closeButton = document.querySelector(".modal-content .close-button");
  const modalProductTitle = document.getElementById("modal-product-title");
  const colorSelect = document.getElementById("color-select");
  const sizeSelect = document.getElementById("size-select");
  const addToCartBtn = document.getElementById("add-to-cart-btn");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalSpan = document.getElementById("cart-total");
  const plusIcons = document.querySelectorAll(".plus-icon");
  const cartQuantityBadge = document.getElementById("cart-quantity-badge");
  const selectedProductDetails = document.getElementById(
    "selected-product-details"
  );
  const modalQuantityMinus = document.getElementById("modal-quantity-minus");
  const modalQuantity = document.getElementById("modal-quantity");
  const modalQuantityPlus = document.getElementById("modal-quantity-plus");

  let cart = []; // Array to store cart items
  let currentModalQuantity = 1; // Default quantity for the product in modal

  function updateCartQuantityBadge() {
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (totalQuantity > 0) {
      cartQuantityBadge.innerText = totalQuantity;
      cartQuantityBadge.style.display = "block";
    } else {
      cartQuantityBadge.style.display = "none";
    }
  }

  function showSelectedProductDetails() {
    const productName = modalProductTitle.innerText;
    const productPrice = parseInt(modalProductTitle.dataset.price);
    const selectedColor = colorSelect.value;
    const selectedSize = sizeSelect.value;

    if (selectedColor !== "option" && selectedSize !== "option") {
      selectedProductDetails.innerHTML = `
        <p>${productName} - ${selectedColor} / ${selectedSize} (수량: ${currentModalQuantity})</p>
        <div class="item-details">
          <span class="item-price">${(
            productPrice * currentModalQuantity
          ).toLocaleString()}원</span>
        </div>
      `;
      modalQuantity.innerText = currentModalQuantity;
      selectedProductDetails.style.display = "block";
      document.querySelector(".quantity-selector").style.display = "flex";
      addToCartBtn.style.display = "block";
    } else {
      selectedProductDetails.innerHTML = "";
      selectedProductDetails.style.display = "none";
      document.querySelector(".quantity-selector").style.display = "none";
      addToCartBtn.style.display = "none";
    }
  }

  function renderCart() {
    cartItemsContainer.innerHTML = ""; // Clear existing items
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>장바구니가 비어있습니다.</p>";
    } else {
      cart.forEach((item, index) => {
        let productImage = "public/image.png";
        if (item.name.includes("비즈 목걸이")) {
          productImage = "public/image copy 2.png";
        } else if (item.name.includes("오가닉 니트")) {
          productImage = "public/image copy.png";
        } else if (item.name.includes("blue 패딩")) {
          productImage = "public/image copy 4.png";
        } else if (item.name.includes("누가쳐다봐 나시")) {
          productImage = "public/image copy 5.png";
        } else if (item.name.includes("기지개 하네스")) {
          productImage = "public/image copy 6.png";
        } else if (item.name.includes("내꼬 장난감")) {
          productImage = "public/image copy 7.png";
        } else if (item.name.includes("해충방지 나시 Tee")) {
          productImage = "public/image copy 2.png";
        }

        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
          <div style="display:flex;align-items:center;gap:12px;">
            <img src='${productImage}' alt='상품이미지' style='width:48px;height:48px;border-radius:8px;object-fit:cover;border:1px solid #eee;' />
            <div>
              <p style="margin:0 0 4px 0;font-size:1.05rem;font-weight:500;color:#222;">${
                item.name
              }</p>
              <span style="color:#555;font-size:0.98rem;">${item.color} / ${
          item.size
        }</span>
            </div>
          </div>
          <div class="item-details" style="margin-top:8px;">
            <span class="item-price">${item.price.toLocaleString()}원</span>
            <div class="quantity-controls">
              <button class="quantity-minus" data-index="${index}">-</button>
              <span class="item-quantity">${item.quantity}</span>
              <button class="quantity-plus" data-index="${index}">+</button>
            </div>
            <button class="remove-item" data-index="${index}">삭제</button>
          </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
      });
    }

    cartTotalSpan.innerText = total.toLocaleString() + "원";
    updateCartQuantityBadge(); // Update badge after rendering cart

    // Add event listeners for quantity controls and remove buttons
    document.querySelectorAll(".quantity-minus").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          cart.splice(index, 1); // Remove item if quantity is 1 and minus is clicked
        }
        renderCart();
      });
    });

    document.querySelectorAll(".quantity-plus").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        cart[index].quantity++;
        renderCart();
      });
    });

    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        cart.splice(index, 1);
        renderCart();
      });
    });
  }

  // Open modal when plus icon is clicked
  plusIcons.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent the link from being followed
      event.stopPropagation(); // Prevent hover-card click event from firing
      const card = event.target.closest(".hover-card");
      const productName = card.querySelector(".title").innerText;
      const productPrice = parseInt(card.querySelector(".price").dataset.price); // Get price from data-price

      modalProductTitle.innerText = productName;
      modalProductTitle.dataset.price = productPrice; // Store price in modal title for easy access

      // Reset select options to default
      colorSelect.value = "option";
      sizeSelect.value = "option";
      currentModalQuantity = 1; // Reset quantity when modal opens
      showSelectedProductDetails(); // Clear details when modal opens

      cartModalOverlay.style.display = "flex";
    });
  });

  // Update selected product details when color or size changes
  colorSelect.addEventListener("change", showSelectedProductDetails);
  sizeSelect.addEventListener("change", showSelectedProductDetails);

  // Quantity controls in modal
  if (modalQuantityMinus) {
    modalQuantityMinus.addEventListener("click", () => {
      if (currentModalQuantity > 1) {
        currentModalQuantity--;
        showSelectedProductDetails(); // Update details including price
      }
    });
  }

  if (modalQuantityPlus) {
    modalQuantityPlus.addEventListener("click", () => {
      currentModalQuantity++;
      showSelectedProductDetails(); // Update details including price
    });
  }

  // Close modal when close button is clicked
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      cartModalOverlay.style.display = "none";
    });
  }

  // Close modal when clicking outside the modal content
  if (cartModalOverlay) {
    cartModalOverlay.addEventListener("click", (event) => {
      if (event.target === cartModalOverlay) {
        cartModalOverlay.style.display = "none";
      }
    });
  }

  // Add to Cart button logic
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const productName = modalProductTitle.innerText;
      const productPrice = parseInt(modalProductTitle.dataset.price);
      const selectedColor = colorSelect.value;
      const selectedSize = sizeSelect.value;
      const quantityToAdd = currentModalQuantity;

      if (selectedColor === "option" || selectedSize === "option") {
        alert("색상과 사이즈를 선택해주세요.");
        return;
      }

      // 상품명에 따라 이미지 자동 매핑
      let productImage = "public/image.png";
      if (productName.includes("비즈 목걸이")) {
        productImage = "public/image copy 2.png";
      } else if (productName.includes("우산")) {
        productImage = "public/image.png";
      } else if (productName.includes("고양이 장난감")) {
        productImage = "public/image copy 2.png";
      } else if (productName.includes("오가닉 니트")) {
        productImage = "public/image copy.png";
      } else if (productName.includes("해충방지 나시 Tee")) {
        productImage = "public/image copy 2.png";
      } else if (productName.includes("blue 패딩")) {
        productImage = "public/image copy 4.png";
      } else if (productName.includes("누가쳐다봐 나시")) {
        productImage = "public/image copy 5.png";
      } else if (productName.includes("기지개 하네스")) {
        productImage = "public/image copy 6.png";
      } else if (productName.includes("내꼬 장난감")) {
        productImage = "public/image copy 7.png";
      }

      const existingItem = cart.find(
        (item) =>
          item.name === productName &&
          item.color === selectedColor &&
          item.size === selectedSize
      );

      if (existingItem) {
        existingItem.quantity += quantityToAdd;
      } else {
        cart.push({
          name: productName,
          price: productPrice,
          color: selectedColor,
          size: selectedSize,
          quantity: quantityToAdd,
          image: productImage,
        });
      }
      renderCart();
      // 장바구니 내역을 localStorage에 저장
      localStorage.setItem("cart", JSON.stringify(cart));
    });
  }

  // '장바구니로 가기' 버튼 클릭 시 cart.html 새 창으로 이동
  const goToCartBtn = document.getElementById("go-to-cart-btn");
  if (goToCartBtn) {
    goToCartBtn.addEventListener("click", function () {
      // 장바구니 내역을 localStorage에 저장 (최신화)
      localStorage.setItem("cart", JSON.stringify(cart));
      window.open("cart.html", "_blank");
    });
  }

  // Initial render of the cart when the page loads
  renderCart();

  let slideIndex = 0; // Represents the current slide being shown (0-indexed)
  const slideInterval = 3000; // 3 seconds

  // Initial call to start the slideshow
  showSlides();

  function showSlides() {
    let slides = document.querySelectorAll(".slideshow-container .slide");
    let slidesWrapper = document.querySelector(
      ".slideshow-container .slides-wrapper"
    );

    if (!slidesWrapper || slides.length === 0) return;

    // Calculate the transform for the current slide
    const offset = -slideIndex * 100;
    slidesWrapper.style.transform = `translateX(${offset}%)`;

    // Increment slideIndex for the next iteration
    slideIndex++;

    // If we are at the last slide (the duplicate of the first actual slide)
    if (slideIndex === slides.length) {
      // After the current slide (duplicate) has been shown for `slideInterval`
      setTimeout(() => {
        // Instantly jump back to the first actual slide (index 0)
        slidesWrapper.style.transition = "none"; // Disable transition
        slidesWrapper.style.transform = `translateX(0%)`;
        slideIndex = 0; // Reset index to the first actual slide

        // After a very short delay, re-enable transition and schedule the next slide
        setTimeout(() => {
          slidesWrapper.style.transition = "transform 0.5s ease-in-out"; // Re-enable transition
          // The next call to showSlides will increment slideIndex to 1 and show the second slide (first actual slide after reset)
          showSlides(); // Call showSlides immediately to start the next cycle
        }, 50); // Small delay to ensure transition:none applies
      }, slideInterval); // Wait for the current slide (duplicate) to be displayed
    } else {
      // Normal slide transition
      setTimeout(showSlides, slideInterval); // Schedule next slide
    }
  }
});
