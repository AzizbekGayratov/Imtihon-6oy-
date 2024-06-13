import {
    checkToken,
    redirect,
    logout
} from './js/utils.js';
import productsArr from './js/form.js';
const products_box = document.querySelector('.main__list')

// logout
const logout_btn = document.querySelector('.header__btn');
logout_btn.onclick = logout;

// checking token
const hasToken = checkToken();
if (!hasToken) {
    redirect('/login.html');
}


const render = (data) => {
    data.map((item) => {
        const card = document.createElement('li');
        card.classList.add('main__item');
        card.innerHTML = `
        <div class="main__card">
            <div class="main__item__title_box">
                <span class="main__item__cap">Title:</span>
                <h3 class="main__card__title">${item.title}</h3>
            </div>
            <div class="main__item__price__box">
                <span class="main__item__cap">Price:</span>
                <span class="main__card__price">${item.price} $</span>
            </div>
            <div class="main__item__des__box">
                <span class="main__item__cap">Description:</span>
                <p class="main__card__des">${item.des}</p>
            </div>
            <div class="main__item__btn__box">
                <button class="main__item__btn">Edit</button>
                <button class="main__item__btn">Delete</button>
            </div>
        </div>`

        products_box.prepend(card)
    })
}

const getData = () => {
    const data = productsArr;
    render(data)
}
getData();