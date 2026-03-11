// Login popup js

const loginBtn = document.querySelector(".login-button");
const popup = document.querySelector(".login-popup");
const closeBtn = document.querySelector(".back");
const blur_effect = document.querySelector(".blur-effect");

loginBtn.onclick = function(){
    popup.style.display = "block";
    blur_effect.style.display = "block"
}

closeBtn.onclick = function(){
    popup.style.display = "none";
    blur_effect.style.display = "none";
}

// Search box js

const searchBox = document.querySelector(".walletSearch");
const walletOptionsPopup = document.querySelector(".wallet-options-popup");

searchBox.onclick = function(){
    walletOptionsPopup.style.display = "block";
}

window.onclick = function(event){      /*Capture clicks on other than wallet options*/
    if (!searchBox.contains(event.target) && !walletOptionsPopup.contains(event.target)) {
        walletOptionsPopup.style.display = "none";
    }
};

// Login options for option 1 - metamask

const metamaskWallet = document.querySelector(".wallet1");

metamaskWallet.onclick = async function(){
    if (typeof window.ethereum) {
        
    }
}