// Login popup js - logging in

const loginBtn = document.querySelector(".login-button");
const popup = document.querySelector(".login-popup");
const closeBtn = document.querySelector(".back-button");
const blur_effect = document.querySelector(".blur-effect");

if (loginBtn) {
    loginBtn.onclick = function(){
        popup.style.display = "block";
        blur_effect.style.display = "block"
    }
}

if (closeBtn) {
    closeBtn.onclick = function(){
        popup.style.display = "none";
        blur_effect.style.display = "none";
    }
}

// Search box js

const searchBox = document.querySelector(".walletSearch");
const walletOptionsPopup = document.querySelector(".wallet-options-popup");

if (walletOptionsPopup && searchBox) {
    searchBox.onclick = function(){
        walletOptionsPopup.style.display = "block";
    }

    window.onclick = function(event){      /*Capture clicks on other than wallet options*/
        if (!searchBox.contains(event.target) && !walletOptionsPopup.contains(event.target)) {
            walletOptionsPopup.style.display = "none";
        }
    };
}

// Login options for option 1 - metamask

const metamaskWallet = document.querySelector(".wallet1");

if (metamaskWallet) {
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
}

// function to get the logged-in wallet address

function getWalletAddress() {
    const wallet = localStorage.getItem("wallet");

    if (wallet) {
        document.querySelector(".wallet-address").innerHTML = "Connected Wallet - " + wallet.slice(0, 6) + "..." + wallet.slice(-4);
    }
}

// function to logout the connected wallet

function logout() {
    localStorage.removeItem("wallet");

    const wallet = localStorage.getItem("wallet");

        if(!wallet){
            window.location.href = "home.html";
        }
}

// js to open the popup of mint button

const mintButton = document.querySelector(".new-project-button");
const mintProject = document.querySelector(".new-project");

if (mintButton) {
    mintButton.onclick = function(){
        mintProject.style.display = "block";
    }
}

// js to close popup of mint button

const cancelBtn = document.querySelector(".cancel");

if(cancelBtn){
    cancelBtn.onclick = function(){
        mintProject.style.display = "none";
    }
}

// function to add a new project

const mintSubmit = document.querySelector(".new-project-submit");

if(mintSubmit){
    mintSubmit.onclick = function(){
        const projectTitle = document.getElementById("project-title").value.trim();
        const projectDesc = document.getElementById("project-desc").value.trim();
        const projectDate = document.getElementById("date-completed").value.trim();

        // Check if all inputs are filled
        if (!projectTitle || !projectDesc || !projectDate) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        // Update the display-project section
        document.querySelector(".display-project .project-name").innerHTML = projectTitle;
        document.querySelector(".display-project .project-desc").innerHTML = projectDesc;
        document.querySelector(".display-project .project-date").innerHTML = projectDate;

        // Clear the inputs
        document.getElementById("project-title").value = "";
        document.getElementById("project-desc").value = "";
        document.getElementById("date-completed").value = "";

        // Hide the new project popup
        mintProject.style.display = "none";
    }
}
