let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   ADD TO CART (WITH QUANTITY)
   ========================= */
function addToCart(name, price) {

let existing = cart.find(i => i.name === name);

if(existing){
existing.qty += 1;
} else {
cart.push({ name, price, qty: 1 });
}

saveCart();
alert(name + " added to cart");
loadCartCount();
}

/* =========================
   SAVE CART
   ========================= */
function saveCart(){
localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   CART COUNT
   ========================= */
function loadCartCount() {

let el = document.getElementById("cartCount");

if(el){

let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

el.innerText = totalQty;

}

}

/* =========================
   RENDER CART (WITH + / - / REMOVE)
   ========================= */
function renderCart() {

let list = document.getElementById("cartList");
let totalBox = document.getElementById("totalAmount");

if(!list) return;

list.innerHTML = "";
let total = 0;

cart.forEach((i, index) => {

let itemTotal = i.price * i.qty;
total += itemTotal;

let li = document.createElement("li");

li.innerHTML = `
<div class="cart-item">
<span>${i.name}</span>

<div>
<button onclick="decreaseQty(${index})">−</button>
<span> ${i.qty} </span>
<button onclick="increaseQty(${index})">+</button>
</div>

<span>Rs ${itemTotal}</span>

<button onclick="removeItem(${index})">Remove</button>
</div>
`;

list.appendChild(li);

});

totalBox.innerText = "Total: Rs " + total;

saveCart();
loadCartCount();
}

/* =========================
   QUANTITY CONTROL
   ========================= */
function increaseQty(index){
cart[index].qty += 1;
renderCart();
}

function decreaseQty(index){

cart[index].qty -= 1;

if(cart[index].qty <= 0){
cart.splice(index, 1);
}

renderCart();
}

function removeItem(index){
cart.splice(index, 1);
renderCart();
}

/* =========================
   WHATSAPP CHECKOUT
   ========================= */
function checkout() {

let name = document.getElementById("custName").value;
let phone = document.getElementById("custPhone").value;
let address = document.getElementById("custAddress").value;

if(!name || !phone || !address){
alert("Please fill all details");
return;
}

if(cart.length === 0){
alert("Cart is empty");
return;
}

let msg = "🍫 Sweet Rush Order%0A%0A";

msg += "👤 Name: " + name + "%0A";
msg += "📞 Phone: " + phone + "%0A";
msg += "🏠 Address: " + address + "%0A%0A";

msg += "🛍 Items:%0A";

let total = 0;

cart.forEach(i => {

let itemTotal = i.price * i.qty;

msg += "- " + i.name + " x" + i.qty + " = Rs " + itemTotal + "%0A";

total += itemTotal;

});

msg += "%0A💰 Total: Rs " + total;

window.open("https://wa.me/923343570114?text=" + msg);

}