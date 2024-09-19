

import { cart, removeFromCart, updateCartQuantity, updateDeliveryOption } from "../../data/cart.js"; // Named Export
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.13/esm/index.js' // Default Export
import deliveryOptions from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { calculateDeliveryDate } from "../../data/deliveryOptions.js"

export function renderOrderSummary(){


    updateCheckoutTotal()

    let cartSummaryHTML = "";

    cart.forEach((cartItem)=>{

        const productId = cartItem.productId;
        const matchingProduct = getProduct(productId);

        cartSummaryHTML+= `
        <div class="cart-item-container cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${getTopDate(cartItem)}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary"
                    data-product-id="${matchingProduct.id}">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary"
                    data-product-id="${matchingProduct.id}">
                        Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
        </div>
        `
    })

    document.querySelector(".order-summary")
    .innerHTML = cartSummaryHTML

    document.querySelectorAll(".delete-quantity-link").forEach((link)=>{
        link.addEventListener("click", ()=>{
            const productId = link.dataset.productId
            removeFromCart(productId)
            // document.querySelector(`.cart-item-container-${productId}`).remove()
            renderOrderSummary();
            renderPaymentSummary();
        });
    })


    document.querySelectorAll(".update-quantity-link").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            const updateHTML = `
                <input class="quantity-input quantity-input-${productId}">
                <span class="save-quantity-link link-primary" data-product-id="${productId}">Save</span>
            `
            link.insertAdjacentHTML('afterend', updateHTML);
            const container = document.querySelector(`.cart-item-container-${productId}`)
            container.classList.add('is-editing-quantity');

            document.querySelector(".save-quantity-link").addEventListener("click", () =>{
                const newQuantity = Number(document.querySelector(`.quantity-input-${productId}`).value)
                
                if(newQuantity > 0){
                    // cart.find((item)=> item.productId === productId).quantity = newQuantity
                    const updatedQuantity = updateCartQuantity(productId, newQuantity);
                    document.querySelector(`.quantity-label-${productId}`).textContent = updatedQuantity
                    renderPaymentSummary();
                }
                container.classList.remove('is-editing-quantity');
            });
        });
    });







    function updateCheckoutTotal(){
        document.querySelector("#checkout-header")
        .innerHTML = `${cart.length} items`;
    }




    function deliveryOptionsHTML(matchingProduct, cartItem){
        let html = ""
        deliveryOptions.forEach((deliveryOption) => {
            let {dateString, priceString} = calculateDeliveryDate(deliveryOption);
            const isChecked = deliveryOption.id===cartItem.deliveryOptionId;
            html += `
                <div class="delivery-option"
                    data-product-id="${matchingProduct.id}" 
                    data-delivery-option-id="${deliveryOption.id}"
                >
                    <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                    </div>
                </div>
            `
        })
        return html;
    }

    function getTopDate(cartItem){
        let html = ""
        deliveryOptions.forEach((deliveryOption) => {
            let {dateString, priceString} = calculateDeliveryDate(deliveryOption);
            const isChecked = deliveryOption.id===cartItem.deliveryOptionId;
            if (isChecked) {html = dateString}
        });
        return html;
    }



    document.querySelectorAll(".delivery-option")
    .forEach((element) => {
        element.addEventListener("click", () =>{
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId)
            renderOrderSummary();
            renderPaymentSummary();
        })
    })

}


