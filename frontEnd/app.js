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
    if (typeof window.ethereum == "undefined") {
        alert("Metamask wallet extension not found!");
        return;
    }

    try{
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        const walletAddress = accounts[0];

        console.log("Connected wallet address: ", walletAddress);
        localStorage.setItem("wallet", walletAddress);
        window.location.href = "login.html";
    }

    catch(error){
        console.log("User did not approve request to log in");
    }
}

// function to get the logged-in wallet address

function getWalletAddress() {
    const wallet = localStorage.getItem("wallet");

    document.querySelector(".wallet-address").innerHTML = "Connected wallet address: " + wallet.slice(0, 6) + "..." + wallet.slice(-4);
}

