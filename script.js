function getValueFromElement(elementId) {
    const element = document.getElementById(elementId);
    const elementText = element.innerText;
    const elementValue = parseFloat(elementText);
    return elementValue;
}

function setText(elementId, text) {
    const element = document.getElementById(elementId);
    element.innerText = text;
}
const couponField = document.getElementById("coupon-field");
if(couponField.disabled){
    couponField.setAttribute("title","Invest at least 200TK to unlock this field");
}
function getDetails(target) {
    const productName = target.childNodes[3].childNodes[3].innerText;
    const productPriceString = target.childNodes[3].childNodes[5].childNodes[0].innerText;
    const productPrice = parseFloat(productPriceString);
    const previousTotalPrice = getValueFromElement("total-price");
    const newTotalPriceText = previousTotalPrice + productPrice;
    const newTotalPrice = newTotalPriceText.toFixed(2);
    setText("total-price", newTotalPrice);
    const previousMainTotal = getValueFromElement("main-total");
    const newMianTotalText = previousMainTotal + productPrice;
    const newMianTotal = newMianTotalText.toFixed(2);
    setText("main-total", newMianTotal);
    const purchaseBtn = document.getElementById("Purchase-btn");
    const couponField = document.getElementById("coupon-field");
    const listContainer = document.getElementById("selected-items");
    const p = document.createElement("p");
    const applyBtn = document.getElementById("apply-btn");
    const count = listContainer.childElementCount;
    p.innerHTML = `
       ${count + 1}. ${productName}
    `;
    p.classList.add("font-bold");
    listContainer.appendChild(p);
    if (newTotalPrice >= 0) {
        purchaseBtn.removeAttribute("disabled");
    }
    if (newTotalPrice >= 200) {
        couponField.removeAttribute("disabled");
        couponField.removeAttribute("title");
        applyBtn.removeAttribute("disabled");
    }
}

document.getElementById("home-btn").addEventListener("click", function () {
    const previousTotalPriceElement = document.getElementById("total-price");
    const previousMainTotalElement = document.getElementById("main-total");
    const discountPriceField = document.getElementById("discount-price");
    previousTotalPriceElement.innerText = "00";
    previousMainTotalElement.innerText = "00";
    discountPriceField.innerText = "00"
    const purchaseBtn = document.getElementById("Purchase-btn");
    purchaseBtn.disabled = true;
    const listContainer = document.getElementById("selected-items");
    while (listContainer.hasChildNodes()) {
        listContainer.removeChild(listContainer.firstChild);
    }
    const applyBtn = document.getElementById("apply-btn");
    applyBtn.disabled = true;
    const couponField = document.getElementById("coupon-field");
    couponField.value = "";
    couponField.disabled = true;
    couponField.title = "Invest at least 200TK to unlock this field";
})
document.getElementById("apply-btn").addEventListener("click", function () {
    const couponField = document.getElementById("coupon-field");    
    if (couponField.value === "SELL200") {
        const previousTotalPrice = getValueFromElement("total-price")
        const discountPriceText = (previousTotalPrice * .20);
        const discountPrice = discountPriceText.toFixed(2);
        const previousMainTotalElement = document.getElementById("main-total");
        const discountPriceField = document.getElementById("discount-price");
        discountPriceField.innerText = discountPrice;
        const newTotalPrice = previousTotalPrice - discountPrice;
        previousMainTotalElement.innerText = newTotalPrice;
        const applyBtn = document.getElementById("apply-btn");
        couponField.value = "";
        applyBtn.disabled = true;
        couponField.disabled = true;
    } else {
        alert("Please insert correct coupon code");
    }
})