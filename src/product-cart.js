document.addEventListener('DOMContentLoaded', () => {
  const productImage = document.getElementById('product-image');
  const productTitle = document.getElementById('product-title');
  const productPrice = document.getElementById('product-price');
  const colorSelect = document.getElementById('color-select');
  const sizeSelect = document.getElementById('size-select');
  const quantitySpan = document.getElementById('quantity');
  const quantityMinusBtn = document.getElementById('quantity-minus');
  const quantityPlusBtn = document.getElementById('quantity-plus');
  const addToCartBtn = document.getElementById('add-to-cart-btn');

  let currentQuantity = 1;

  // URL 파라미터에서 상품 정보 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const product = urlParams.get('product');
  const price = urlParams.get('price');
  const image = urlParams.get('image');

  if (product && price && image) {
    productImage.src = `public/${image}`;
    productTitle.innerText = decodeURIComponent(product.replace(/-/g, ' '));
    productPrice.innerText = `${parseInt(price).toLocaleString()}원`;
  }

  // 수량 조절
  quantityMinusBtn.addEventListener('click', () => {
    if (currentQuantity > 1) {
      currentQuantity--;
      quantitySpan.innerText = currentQuantity;
    }
  });

  quantityPlusBtn.addEventListener('click', () => {
    currentQuantity++;
    quantitySpan.innerText = currentQuantity;
  });

  // 장바구니에 추가
  addToCartBtn.addEventListener('click', () => {
    const selectedColor = colorSelect.value;
    const selectedSize = sizeSelect.value;

    if (selectedColor === 'option' || selectedSize === 'option') {
      alert('색상과 사이즈를 선택해주세요.');
      return;
    }

    const cartItem = {
      name: productTitle.innerText,
      price: parseInt(price),
      color: selectedColor,
      size: selectedSize,
      quantity: currentQuantity,
      image: `public/${image}`
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItemIndex = cart.findIndex(item => 
      item.name === cartItem.name && 
      item.color === cartItem.color && 
      item.size === cartItem.size
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += cartItem.quantity;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('장바구니에 추가되었습니다!');
    window.location.href = 'cart.html'; // 장바구니 페이지로 이동
  });
});