const email_input = document.getElementById('emailAddress');
const password_input = document.getElementById('password');
const login_form = document.forms[0];
const visibility__btn = document.querySelector('.visibility__btn');
const loader = document.querySelector('.loader_box');

import {
    checkToken,
    redirect
} from './utils.js';


const hasToken = checkToken();
console.log(hasToken);
if (hasToken) {
    redirect('/index.html');
}


// Bu kod yozilgan ishlatilganda email va parol avtomatik kiritiladi
// window.addEventListener('load', () => {
//     email_input.value = "john@mail.com";
//     password_input.value = "changeme";
//     console.log(access);
//     console.log(email_input.value, password_input.value);
// })

let visibility = false;
visibility__btn.onclick = (e) => {
    e.preventDefault();
    visibility = visibility ? false : true;

    if (visibility) {
        password_input.type = 'text';
        visibility__btn.style.backgroundImage = 'url("/src/assets/visibility.svg")';
    } else {
        password_input.type = 'password';
        visibility__btn.style.backgroundImage = 'url("/src/assets/no_visible.svg")';
    }
}


const creadentials = {
    email: email_input.value,
    password: password_input.value
}

email_input.oninput = (e) => {
    creadentials.email = e.target.value;
}
password_input.oninput = (e) => {
    creadentials.password = e.target.value;
}
login_form.onsubmit = (e) => {
    e.preventDefault();
    console.log(creadentials);

    if (creadentials.email == "john@mail.com" && creadentials.password == "changeme") {
        login()
    } else {
        alert('Email yoki parol noto`g`ri')
    }
}


const login = async () => {
    try {
        loader.style.display = 'block';

        const url = 'https://api.escuelajs.co/api/v1/auth/login';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer {your access token}",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(creadentials)
        });
        const data = await response.json();
        console.log(data);

        const { access_token, refresh_token } = data;
        sessionStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        const hasToken = checkToken();
        if (hasToken) {
            redirect('/index.html');
        }
    } catch (error) {
        console.log(error);
    } finally {
        loader.style.display = 'none';
    }
}