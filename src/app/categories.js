import { products } from "../core/data";
import { categoryBtn, categoryLists } from "../core/selectors";
import { productRender } from "./products";

export const createCategoryBtn = (text) => {
    const clone = categoryBtn.content.cloneNode(true);
    const btn = clone.querySelector("button");
    btn.innerText = text;
    return btn;
}

export const categoryRender = (categoryArr) => {
    categoryArr.forEach(category => categoryLists.append(createCategoryBtn(category)));
}

export const categoryListHandler = (event) => {
    if (event.target.classList.contains("category-list")) {
        categoryLists.querySelector(".category-list.active").classList.remove("active");

        event.target.classList.add("active");
        const currentCategory = event.target.innerText;

        const filteredProducts = products.filter(product => product.category === currentCategory);

        if (currentCategory === 'All') {
            productRender(products);
        } else {
            productRender(filteredProducts);        
        }
    }
}