import { parse } from "postcss";
import { products } from "../core/data";
import { cartBody, cartItem, cartItemCount, productCardCount, productLists, totalAmount } from "../core/selectors"
import Swal from "sweetalert2";

export const createCartItem = ({ id, image, title, price }) => {

    const clone = cartItem.content.cloneNode(true);
    const itemImg = clone.querySelector(".cart-item-img")
    const itemTitle = clone.querySelector(".cart-item-title");
    const itemPrice = clone.querySelector(".cart-item-price");
    const itemCost = clone.querySelector(".cart-item-cost");

    itemImg.src = image;
    itemTitle.innerText = title;
    itemPrice.innerText = price;
    itemCost.innerText = price;

    clone.querySelector(".cart-item").setAttribute("cart-item-id", id);

    return clone;
}

export const addToCart = (id) => {

    const selectedProduct = products.find(product => product.id == id);
    cartBody.append(createCartItem(selectedProduct));

}

export const added = (btn) => {
    btn.classList.remove("text-zinc-700")
    btn.classList.add("bg-zinc-600", "text-zinc-100");
    btn.innerText = "Added";
    btn.disabled = true;

    return btn;
}

export const cartBodyHandler = (event) => {
    const cartItem = event.target.closest(".cart-item");
    const cartItemId = cartItem.getAttribute("cart-item-id");

    if (event.target.classList.contains("cart-item-del")) {
        removeFromCart(cartItemId);
    } else if (event.target.classList.contains("cart-item-quantity-decrement")) {
        decrementQuantity(cartItemId);
    } else if (event.target.classList.contains("cart-item-quantity-increment")) {
        incrementQuantity(cartItemId);
    }
}

export const removeFromCart = (id) => {
    const cartItem = cartBody.querySelector(`[cart-item-id="${id}"]`);

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            cartItem.classList.add("animate__animated", "animate__hinge");



            cartItem.addEventListener("animationend", () => {
                cartItem.remove();
                const productCard = productLists.querySelector(`[product-id="${id}"]`);
                const addToCartBtn = productCard.querySelector(".add-to-cart");

                addToCartBtn.innerText = "Add to Cart";
                addToCartBtn.classList.remove("bg-zinc-600", "text-zinc-100");
                addToCartBtn.disabled = false;
            })

            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Deleted xsuccessfully"
            });
        }
    });

}

export const incrementQuantity = (id) => {
    const cartItem = cartBody.querySelector(`[cart-item-id="${id}"]`);
    const quantity = cartItem.querySelector(".cart-item-quantity");
    const cost = cartItem.querySelector(".cart-item-cost");
    const price = cartItem.querySelector(".cart-item-price");

    quantity.innerText = parseInt(quantity.innerText) + 1;
    cost.innerText = (price.innerText * quantity.innerText).toFixed(2);
}

export const decrementQuantity = (id) => {
    const cartItem = cartBody.querySelector(`[cart-item-id="${id}"]`);
    const quantity = cartItem.querySelector(".cart-item-quantity");
    const cost = cartItem.querySelector(".cart-item-cost");
    const price = cartItem.querySelector(".cart-item-price");

    parseInt(quantity.innerText) > 1 && (quantity.innerText = parseInt(quantity.innerText) - 1);
    cost.innerText = (price.innerText * quantity.innerText).toFixed(2);
}

export const calcTotalCost = () => {
    return [...cartBody.querySelectorAll(".cart-item-cost")].reduce((prev, curr) => {
        return prev + parseFloat(curr.innerText);
    }, 0).toFixed(2);
}

export const countCartItem = () => {
    return cartBody.querySelectorAll(".cart-item").length;
}

export const cartObserver = () => {
    const config = { attributes: true, childList: true, subtree: true };

    const callback = () => {
        totalAmount.innerText = calcTotalCost();
        cartItemCount.innerText = countCartItem();
        productCardCount.innerText = countCartItem();
    }

    const observer = new MutationObserver(callback);
    observer.observe(cartBody, config);
}