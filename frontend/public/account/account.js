let signup_sl = document.querySelector(".signup_sl");
let login_sl = document.querySelector(".login_sl");
let slider = document.querySelector(".slider");

let signbtn = document.querySelector(".signbtn");
let logbtn = document.querySelector(".logbtn");
let formSection = document.querySelector(".form-section");


signup_sl.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
});

login_sl.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
});

function Login(login, password) {

    fetch('http://127.0.0.1:8000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "username": login,
            "password": password
        })
    })
        .then(res => res.json())
        .then((data) => {
            console.log('Успешно:', data);
            localStorage.setItem('access', data["access"]);
            document.cookie = `refresh=${data["refresh"]};`;
            window.location = 'http://127.0.0.1:3000/';
        })
        .catch(error => console.error('Ошибка:', error));
};

function Signup(login, email, password) {

    fetch('http://127.0.0.1:8000/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "username": login,
            "email": email,
            "password": password
        })
    })
        .then(res => res.json())
        .then((data) => {
            console.log('Успешно:', data);
            slider.classList.remove("moveslider");
            formSection.classList.remove("form-section-move");
        })
        .catch(error => console.error('Ошибка:', error));
};

document.getElementById("input_signup_password")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === "Enter") {
        document.getElementById("signbtn").click();
    }
});

document.getElementById("input_login_password")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === "Enter") {
        document.getElementById("logbtn").click();
    }
});

signbtn.addEventListener("click", () => {
    var input_s_l = document.getElementById("input_signup_login").value;
    var input_s_e = document.getElementById("input_signup_email").value;
    var input_s_p = document.getElementById("input_signup_password").value;

    Signup(input_s_l, input_s_e, input_s_p);
});

logbtn.addEventListener("click", () => {
    var input_l_l = document.getElementById("input_login_login").value;
    var input_l_p = document.getElementById("input_login_password").value;

    Login(input_l_l, input_l_p);
});