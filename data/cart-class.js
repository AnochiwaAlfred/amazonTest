
class Cart{
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey
        this.#loadFromStorage();
    }

    #loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
        
        if(!this.cartItems){
            this.cartItems = [
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
            this.saveToStorage();
        }
    }
    saveToStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }
    addToCart(productId){
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{
          if(cartItem.productId === productId){
            matchingItem = cartItem;
          }
        });
        
        if(matchingItem){
          matchingItem.quantity += 1;
        }else {
          this.cartItems.push(
            {
              productId: productId,
              quantity: 1,
              deliveryOptionId: '1'
            }
          );
        }
        this.saveToStorage()
    }
    removeFromCart(productId){
        const newCart = [];
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId !== productId){
                newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;
        this.saveToStorage();
    }
    updateDeliveryOption(productId, deliveryOptionId){
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{
          if(cartItem.productId === productId){
            matchingItem = cartItem;
          }
        });
        
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
    updateCartQuantity(productId, quantity){
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{
          if(cartItem.productId === productId){
            matchingItem = cartItem;
          }
        });
        
        if(matchingItem){
          matchingItem.quantity = quantity;
        }
        this.saveToStorage()
        return matchingItem.quantity
    }

}

  

  
  
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

// console.log(cart);
// console.log(businessCart);
  
    
  