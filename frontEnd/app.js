const loginBtn = document.querySelector(".login-button");
const popup = document.querySelector(".login-popup");
const closeBtn = document.querySelector(".back");

loginBtn.onclick = function(){
    popup.style.display = "block";
}

closeBtn.onclick = function(){
    popup.style.display = "none";
}