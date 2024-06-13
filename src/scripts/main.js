import {
    checkToken,
    redirect,
    logout
} from './js/utils.js';
import productsArr from './js/form.js';

// modal
const modal = document.querySelector('.modal');
const modal_form = document.querySelector('.modal__form')
const modal_title = document.getElementById('editTitle')
const modal_price = document.getElementById('editPrice')
const modal_des = document.getElementById('editDes')
const modal__close = document.querySelector('.modal__close');
modal__close.onclick = () => {
    modal.style.display = 'none';
}

const products_box = document.querySelector('.main__list')

// logout
const logout_btn = document.querySelector('.header__btn');
logout_btn.onclick = logout;

// checking token
const hasToken = checkToken();
if (!hasToken) {
    redirect('/login.html');
}

// "card_price" funksiyasi price inputda faqat raqam va . belgisini qaytarish uchun
const cardPrice = (price) => {
    let str = ""

    for (let i of price) {
        if (i === "0" || i === "1" || i === "2" || i === "3" || i === "4" || i === "5" || i === "6" || i === "7" || i === "8" || i === "9") {
            str += i
        } else if (i === ".") {
            str += i
        } else {

        }
    }

    return str
}



const deleteProduct = (id) => {
    if (confirm('Are you sure?')) {
        const products = JSON.parse(localStorage.getItem('examProducts'));
        const newProducts = [];
        products.filter((item) => {
            if (item.id !== id) {
                newProducts.push(item)
            }
        });
        localStorage.setItem('examProducts', JSON.stringify(newProducts));

        window.location.reload();
    }
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
                <button id="editBtn" class="main__item__btn">Edit</button>
                <button id="deleteBtn" class="main__item__btn">Delete</button>
            </div>
        </div>`

        // editing card
        const editBtn = card.querySelector('#editBtn');
        editBtn.onclick = () => {
            modal.style.display = 'flex';
            modal_title.focus()

            // modal inputs values 
            modal_title.value = item.title
            modal_price.value = item.price
            modal_des.value = item.des
        }
        // modal form submit process
        modal_form.onsubmit = (e) => {
            e.preventDefault();
            if (confirm('Save this changes?')) {
                // type code here
                // for edit product
                modal.style.display = 'none';
            }
        }

        const deleteBtn = card.querySelector('#deleteBtn');
        deleteBtn.onclick = () => deleteProduct(item.id)

        products_box.prepend(card)
    }).join("")
}


// trycatch bu yerda har ehtimolga qarshi qo'llanilgan
const getData = () => {
    try {
        const data = productsArr;
        render(data)
    } catch (error) {
        throw new Error(error)
    }
}
getData();