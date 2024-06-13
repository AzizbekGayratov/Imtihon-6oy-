const titleInput = document.getElementById('title');
const priceInput = document.getElementById('price');
const desInput = document.getElementById('des');
const form = document.querySelector('.admin__form');


// Qo'shimcha funksiyalar
// "card_price" funksiyasi price inputda faqat raqam va . belgisini qaytarish uchun
const card_price = (price) => {
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

form.onsubmit = () => {
    const data = {
        title: titleInput.value,
        price: card_price(priceInput.value),
        des: desInput.value
    }
    
    
    const productsArr=JSON.parse(localStorage.getItem('examProducts')) || [];
    productsArr.push(data);
    localStorage.setItem('examProducts',JSON.stringify(productsArr));
    
    titleInput.value = '';
    priceInput.value = '';
    desInput.value = '';
    
}

const productsArr = JSON.parse(localStorage.getItem('examProducts')) || [];

export default productsArr;