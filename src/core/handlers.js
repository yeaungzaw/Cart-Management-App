import { categoryRender } from "../app/categories";
import { productRender } from "../app/products";
import { categories, products } from "./data";
import { searchBar, searchBarInput, searchBtn } from "./selectors";

export const cartBtnHandler = () => {
    cartBox.classList.toggle("translate-x-full");
    cartBox.classList.add("duration-300");
}

export const searchBtnHandler = () => {
    searchBar.classList.toggle("-translate-x-[300px]");
    searchBar.classList.toggle("opacity-0");
    searchBar.classList.add("duration-300");
    searchBarInput.focus();
    searchBtn.classList.toggle("bg-neutral-600");
    searchBtn.classList.toggle("text-white");
}

export const searchBarInputHandler = () => {
    const keyword = searchBarInput.value.toLowerCase();

    const currentProducts = products.filter(product =>
        product.title.toLowerCase().includes(keyword)
        ||
        product.description.toLowerCase().includes(keyword)
    );

    productRender(currentProducts);
}

export const searchBarInputAllClearBtnHandler = () => {
    searchBarInput.value = null;
    productRender(products);
}