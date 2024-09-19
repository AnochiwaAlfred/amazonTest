import { addToCart, cart } from "../../data/cart.js";



describe("TEST SUITE: addToCart", () => {
    it("Add an existing product to the cart", () => {});
    it("Add a new product to the cart", () => {
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([]);
        });
        // console.log(localStorage.getItem("cart"));
        addToCart("77919bbe-0e56-475b-adde-4f24dfed3a04");
        expect(cart.length).toEqual(1);
    });
})