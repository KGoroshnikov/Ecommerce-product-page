let mainImage = document.getElementById("big-img");
let miniImages = document.getElementsByClassName("img-small");
let currentImg = 0;

let lightboxContainer = document.getElementById("lightbox-container");
let mainImage_lightbox = document.getElementById("main-lightbox");
let miniImages_lightbox = document.getElementsByClassName("img-small-lightbox");
let currentImg_lightbox = 0;

let itemAmount = 0;
let itemAdded = 0;
let cartOpened = false;
let itemAmount_cart = document.getElementById("item-amount-cart");
let itemAmount_text = document.getElementById("amount-text");
let cartContainer = document.getElementById("cart-container");
let item = document.getElementById("cart-item");
let btnCheckout = document.getElementById("checkout-btn");
let noitem = document.getElementById("empty-cart");

var preloadedImages = [];
for(let i = 0; i < 4; i++){ // preload images
  let temp = new Image();
  temp.src = "images/image-product-" + (i + 1) + ".jpg";
  preloadedImages.push(temp);
}

function selectImage(idImg){
  currentImg = idImg;
  mainImage.src = preloadedImages[idImg].src;

  for(let i = 0; i < miniImages.length; i++){
    miniImages[i].style.borderColor = "white";
    miniImages[i].style.opacity = "1";
  }
  miniImages[idImg].style.borderColor = "hsl(26, 100%, 55%)";
  miniImages[idImg].style.opacity = "0.5";
}

function selectImage_Lightbox(idImg){
  currentImg_lightbox = idImg;
  mainImage_lightbox.src = preloadedImages[idImg].src;

  for(let i = 0; i < miniImages_lightbox.length; i++)
    miniImages_lightbox[i].style.opacity = "1";

    miniImages_lightbox[idImg].style.opacity = "0.5";
}

function skipImg_Lightbox(dir){
  currentImg_lightbox += dir;
  if (currentImg_lightbox < 0) currentImg_lightbox = 3;
  else if (currentImg_lightbox > 3) currentImg_lightbox = 0;

  selectImage_Lightbox(currentImg_lightbox);
}

function closeLightbox(){
  lightboxContainer.style.display = "none";
}

function openLightbox(){
  lightboxContainer.style.display = "flex";
  selectImage_Lightbox(currentImg);
}

function openCart(){
  cartOpened = !cartOpened
  if (cartOpened) cartContainer.style.display = "flex";
  else cartContainer.style.display = "none";
  updateItem();
}

function changeAmount(a){
  itemAmount += a;
  if (itemAmount < 0) itemAmount = 0;

  itemAmount_text.textContent = "" + itemAmount;
}

function addToCart(){
  itemAdded = itemAmount;
  
  if (!cartOpened) openCart();
  else updateItem();
}

function updateItem(){
  itemAmount_cart.innerHTML = "$125.00 x " + itemAdded + " <span id='final-amount'>$" + (125*itemAdded).toFixed(2) + "</span>";

  if (itemAdded > 0){
    item.style.display = "flex";
    btnCheckout.style.display = "block";
    noitem.style.display = "none";
  }
  else{
    item.style.display = "none";
    btnCheckout.style.display = "none";
    noitem.style.display = "block";
  }
}

function removeItem(){
  itemAdded = 0;
  updateItem();
}

function mobileSkipImg(a){
  currentImg += a;
  if (currentImg < 0) currentImg = 3;
  else if (currentImg > 3) currentImg = 0;
  mainImage.src = preloadedImages[currentImg].src;
}

let menuActive = false;
let timeAnimMob = 500;
let objMob = document.getElementById("mobile-side-js");
let objMob_Container = document.getElementById("mobile-side-container");
function menuMobile(){
  menuActive = !menuActive;

  if (menuActive){
    objMob_Container.style.display = "block";

    const anim = objMob.animate(
      [{left: "-100vw" }, { left: "0" }],
      {
        fill: "forwards",
        easing: "ease",
        duration: timeAnimMob,
      }
    );
    anim.play();
  }
  else{
    setTimeout(() => {
      objMob_Container.style.display = "none";
    }, timeAnimMob);
    const anim = objMob.animate(
      [{ right: "0" }, { left: "-100vw" }],
      {
        fill: "forwards",
        easing: "ease",
        duration: timeAnimMob,
      }
    );
    anim.play();
  }
}