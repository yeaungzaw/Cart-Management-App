import { cartBody, cartBox, cartBtn, productCard, productLists, ratingStars } from "../core/selectors";
import { addToCart, added } from "./cart";

export const createProductCard = ({ id, image, title, price, description, rating: { rate, count } }) => {
    const clone = productCard.content.cloneNode(true);
    const card = clone.querySelector(".product-card");
    const cardImg = card.querySelector(".product-card-img");
    const cardTitle = card.querySelector(".product-card-title");
    const cardDescription = card.querySelector(".product-card-description");
    const cardRatingText = card.querySelector(".product-card-rating-text");
    const cardRatingStars = card.querySelector(".product-card-rating-stars");
    const cardPrice = card.querySelector(".product-price");
    const addToCart = card.querySelector(".add-to-cart");


    cardImg.src = image;
    cardTitle.innerText = title;
    cardDescription.innerText = description;
    cardRatingText.innerText = `(${rate} / ${count})`;
    cardRatingStars.append(createRatingStars(rate));
    cardPrice.innerText = price;

    card.setAttribute("product-id", id);

    const isExitInCart = cartBody.querySelector(`[cart-item-id="${id}"]`);
    if (isExitInCart) {
        addToCart.innerText = "Added";
        addToCart.classList.add("bg-neutral-600", "text-white");
        addToCart.disabled = true;
    }

    return card;
}

export const productRender = (productArr) => {
    productLists.innerHTML = `
    <div class="product-empty-stage m-auto col-span-full row-span-full py-4 flex-col justify-center items-center gap-4 hidden last:flex">
        <img class="w-72" src="../src/img/empty.png"></img>
        <p class="text-center text-xl text-zinc-600">No results matched</p>
    </div>
    `;
    productArr.forEach(product => productLists.append(createProductCard(product)))
}

export const createRatingStars = (rate) => {
    const div = document.createElement("div");
    div.classList.add("flex", "gap-1");

    for (let i = 0; i < 5; i++) {
        const clone = ratingStars.content.cloneNode(true);
        const star = clone.querySelector(".star");
        i < parseInt(rate) && star.classList.add("fill-orange-500");
        div.append(star);
    }

    return div;
}

export const productListHandler = (event) => {
    if (event.target.classList.contains("add-to-cart")) {
        const currentProductCard = event.target.closest(".product-card");
        const currentProductCardId = currentProductCard.getAttribute("product-id");
        const currentAddToCartBtn = currentProductCard.querySelector(".add-to-cart");

        const currentImg = currentProductCard.querySelector(".product-card-img");
        const currentImgPosition = currentImg.getBoundingClientRect();
        const cartBtnPosition = cartBtn.getBoundingClientRect();

        const img = new Image();
        img.src = currentImg.src;
        img.classList.add("fixed", `h-32`, `z-50`);
        img.style.top = currentImgPosition.top + "px";
        img.style.left = currentImgPosition.left + "px";

        let keyframe;

        if (cartBox.classList.contains("translate-x-full")) {
            keyframe = [
                {
                    top: `${currentImgPosition.top}px`,
                    left: `${currentImgPosition.left}px`
                },
                {
                    top: cartBtnPosition.top + 10 + "px",
                    left: cartBtnPosition.left + 10 + "px",
                    height: "10px",
                    rotate: "2turn"
                },
            ];
        } else {
            const cartItemPosition = cartBody.querySelector(".cart-item:last-child")?.getBoundingClientRect();

            const top = cartItemPosition ? (cartItemPosition.bottom + 10 + "px") : (cartBody.getBoundingClientRect().top + 10 + "px");
            const left = cartItemPosition ? (cartItemPosition.left + 10 + "px") : (cartBody.getBoundingClientRect().left + "px");

            keyframe = [
                {
                    top: `${currentImgPosition.top}px`,
                    left: `${currentImgPosition.left}px`
                },
                {
                    top: top,
                    left: left,
                    height: "10px",
                    rotate: "2turn"
                },
            ];
        }


        const options = {
            duration: 500,
            iterations: 1,
            fill: "both",
        }

        const imgAnimation = img.animate(keyframe, options);

        imgAnimation.addEventListener("finish", () => {
            addToCart(currentProductCardId);
            added(currentAddToCartBtn);
            img.remove();

            cartBtn.classList.add("animate__tada");
            cartBtn.addEventListener("animationend", () => {
                cartBtn.classList.remove("animate__tada");
            })
        })

        app.append(img);
    }
}