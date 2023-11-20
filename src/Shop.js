import { cartBodyHandler, cartObserver } from "./app/cart";
import { categoryListHandler, categoryRender } from "./app/categories";
import { productListHandler, productRender } from "./app/products";
import { categories, products } from "./core/data";
import { cartBtnHandler, searchBarInputAllClearBtnHandler, searchBarInputHandler, searchBtnHandler } from "./core/handlers";
import { cartBody, cartBtn, cartCloseBtn, categoryLists, nav, productLists, searchBarInput, searchBarInputAllClearBtn, searchBtn } from "./core/selectors";

class Shop {

    observer() {
        cartObserver();
    }

    initialRender() {
        categoryRender(categories);
        productRender(products);
    }

    listener() {
        cartBtn.addEventListener("click", cartBtnHandler);
        cartCloseBtn.addEventListener("click", cartBtnHandler);
        searchBtn.addEventListener("click", searchBtnHandler);
        searchBarInput.addEventListener("keyup", searchBarInputHandler);
        searchBarInputAllClearBtn.addEventListener("click", searchBarInputAllClearBtnHandler);
        categoryLists.addEventListener("click", categoryListHandler);
        productLists.addEventListener("click", productListHandler);
        cartBody.addEventListener("click", cartBodyHandler);
    }

    navShowHide() {
        let lastScrollY = window.scrollY;

        window.addEventListener("scroll", () => {
            if (window.scrollY > lastScrollY) {
                // console.log("down");
                nav.classList.add("nav--hidden");
            } else {
                // console.log("up");
                nav.classList.remove("nav--hidden");
            }
            lastScrollY = window.scrollY;
        });
    }

    init() {
        // console.log("hello");
        this.observer();
        this.initialRender();
        this.listener();
        this.navShowHide();
    }

}

export default Shop;