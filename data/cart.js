



export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart = [
        {
            productId: "77919bbe-0e56-475b-adde-4f24dfed3a04",
            quantity: 1,
            deliveryOptionId: '1'
        },
        {
          productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
          quantity: 4,
          deliveryOptionId: '3'
        },
        {
          productId: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
          quantity: 3,
          deliveryOptionId: '2'
        }
    ];
  saveToStorage();

}


function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId){
    let matchingItem;
    cart.forEach((cartItem)=>{
      if(cartItem.productId === productId){
        matchingItem = cartItem;
      }
    });
    
    if(matchingItem){
      matchingItem.quantity += 1;
    }else {
      cart.push(
        {
          productId: productId,
          quantity: 1,
          deliveryOptionId: '1'
        }
      );
    }
    saveToStorage()
  }

  

  export function updateCartQuantity(productId, quantity){
    let matchingItem;
    cart.forEach((cartItem)=>{
      if(cartItem.productId === productId){
        matchingItem = cartItem;
      }
    });
    
    if(matchingItem){
      matchingItem.quantity = quantity;
    }
    saveToStorage()
    return matchingItem.quantity
  }


export function removeFromCart(productId){
    const newCart = [];
    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });
  
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}