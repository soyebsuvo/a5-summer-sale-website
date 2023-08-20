function getValueFromElement(elementId){
    const element = document.getElementById(elementId);
    const elementText = element.innerText;
    const elementValue = parseFloat(elementText);
    return elementValue;
}

function setText(elementId,text){
    const element = document.getElementById(elementId);
    element.innerText = text;
}

function getDetails(target){
    const productName = target.childNodes[3].childNodes[3].innerText;
    const productPriceString = target.childNodes[3].childNodes[5].childNodes[0].innerText;
    const productPrice = parseFloat(productPriceString); 
    const previousTotalPrice = getValueFromElement("total-price");
    const newTotalPriceText = previousTotalPrice + productPrice;
    const newTotalPrice = newTotalPriceText.toFixed(2);
    setText("total-price",newTotalPrice);    
    const previousMainTotal = getValueFromElement("main-total");
    const newMianTotalText = previousMainTotal + productPrice;
    const newMianTotal = newMianTotalText.toFixed(2);
    setText("main-total", newMianTotal);   
    const purchaseBtn = document.getElementById("Purchase-btn");
    const couponField = document.getElementById("coupon-field");
    if(newTotalPrice >= 0){
        purchaseBtn.removeAttribute("disabled");
    }
    if(newTotalPrice >= 200){
        couponField.removeAttribute("disabled");
    }
    const p = document.createElement("p");
    p.innerHTML = `
        ${productName}
    `;
    p.classList.add("font-bold");
    const listContainer = document.getElementById("selected-items");
    listContainer.appendChild(p);
}

document.getElementById("home-btn").addEventListener("click", function(){
    const previousTotalPriceElement = document.getElementById("total-price");
    const previousMainTotalElement = document.getElementById("main-total");
    const discountPriceField = document.getElementById("discount-price");
    previousTotalPriceElement.innerText = "00";
    previousMainTotalElement.innerText = "00";
    discountPriceField.innerText = "00"
    const purchaseBtn = document.getElementById("Purchase-btn");
    purchaseBtn.disabled = true;
})

const couponField = document.getElementById("coupon-field");
couponField.addEventListener("keyup", function(){
    const applyBtn = document.getElementById("apply-btn");
    if(couponField.value === "SELL200"){
        applyBtn.removeAttribute("disabled");
    }else{
        applyBtn.disabled = true;
    }
})

document.getElementById("apply-btn").addEventListener("click", function(){ 
    const previousTotalPrice = getValueFromElement("total-price")
    const discountPriceText = (previousTotalPrice * .20);
    const discountPrice = discountPriceText.toFixed(2);
    const previousMainTotalElement = document.getElementById("main-total");   
    const discountPriceField = document.getElementById("discount-price");
    discountPriceField.innerText = discountPrice;
    const newTotalPrice = previousTotalPrice - discountPrice;
    previousMainTotalElement.innerText = newTotalPrice;
    const applyBtn = document.getElementById("apply-btn");
    applyBtn.value = "";
    applyBtn.disabled = true;
    couponField.disabled = true;
})