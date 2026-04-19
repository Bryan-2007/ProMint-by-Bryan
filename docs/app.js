// ============================================================================
// PROMINT FRONTEND APPLICATION
// Purpose: Connect to Ethereum blockchain and interact with ProMint smart contract
//          Handles user authentication, project creation, and NFT minting
// ============================================================================


// ========================================================================
// SECTION 1: CONTRACT CONFIGURATION & SETUP
// Description: Configure contract address, ABI, and validate dependencies
// ========================================================================

// ===== Ethers Library Validation =====
// Checks if ethers.js library is loaded before proceeding
// This library is essential for blockchain interactions
if (typeof ethers === "undefined") {
    console.error("CRITICAL: ethers library not loaded!");
    alert("ERROR: ethers library failed to load. Please check your internet connection or try refreshing the page.");
}

// ===== Contract Address and ABI Configuration =====
// CONTRACT_ADDRESS: The deployed ProMint contract address on Sepolia testnet
// CONTRACT_ABI: Contains function definitions and event specifications for the contract
// IMPORTANT: Update CONTRACT_ADDRESS after deploying to Sepolia
const CONTRACT_ADDRESS = "0x7580cEE2A2B474B73951B231782355432F577857"; // Replace with deployed address
const CONTRACT_ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "studentWallet",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "ProjectCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "facultyWallet",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "ProjectMinted",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_domains",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_date",
                "type": "string"
            }
        ],
        "name": "createProject",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllProjects",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "domains",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "date",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "studentWallet",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "minted",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct ProMint.Project[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getFacultyWallet",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_projectId",
                "type": "uint256"
            }
        ],
        "name": "getProject",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "domains",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "date",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "studentWallet",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "minted",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct ProMint.Project",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_studentWallet",
                "type": "address"
            }
        ],
        "name": "getStudentProjects",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "domains",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "date",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "studentWallet",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "minted",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct ProMint.Project[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTotalProjects",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_projectId",
                "type": "uint256"
            }
        ],
        "name": "mintProject",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_newFaculty",
                "type": "address"
            }
        ],
        "name": "updateFacultyWallet",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// ===== Global Contract Instance Variables =====
// contract: The contract instance used to call smart contract functions
// provider: Ethers provider to interact with the Sepolia network
// signer: The wallet signer (user's MetaMask account)
let contract = null;
let provider = null;
let signer = null;

// ========================================================================
// SECTION 2: CONTRACT INITIALIZATION
// Description: Connect to blockchain via MetaMask and initialize contract instance
//              Validates network, wallet, and contract availability
// ========================================================================

async function initializeContract() {
    console.log("=== initializeContract called ===");
    
    // ===== Check Ethers Library =====
    // Verify ethers.js is available before attempting blockchain operations
    if (typeof ethers === "undefined") {
        console.error("ethers library is not loaded!");
        alert("ERROR: ethers library failed to load. Please refresh the page.");
        return false;
    }
    
    // ===== Check MetaMask Extension =====
    // Verify MetaMask wallet extension is installed
    if (typeof window.ethereum === "undefined") {
        console.error("MetaMask not installed");
        alert("Please install MetaMask extension.");
        return false;
    }
    
    console.log("MetaMask detected:", window.ethereum);

    try {
        // ===== Create Blockchain Provider =====
        // BrowserProvider connects to Sepolia network via MetaMask
        console.log("ethers is available, creating BrowserProvider...");
        console.log("ethers version/type:", typeof ethers, Object.keys(ethers).slice(0, 5));
        
        provider = new ethers.BrowserProvider(window.ethereum);
        console.log("BrowserProvider created successfully");
        
        // ===== Request Connected Accounts =====
        // Get list of accounts currently connected to MetaMask
        console.log("Requesting accounts...");
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        console.log("Connected accounts:", accounts);
        
        // Verify at least one account is connected
        if (!accounts || accounts.length === 0) {
            console.error("No accounts connected");
            alert("Please connect your MetaMask wallet.");
            return false;
        }
        
        // ===== Verify Network =====
        // Check that user is on Sepolia testnet (chainId: 11155111)
        console.log("Getting network...");
        const network = await provider.getNetwork();
        console.log("Current network:", network);
        console.log("Current network chainId:", network.chainId, "Type:", typeof network.chainId);
        
        // Ensure correct network is selected
        if (network.chainId !== 11155111n) {
            console.error("Wrong network. Expected 11155111, got", network.chainId);
            alert("Please switch to Sepolia testnet in MetaMask. Current network: " + network.name);
            return false;
        }
        
        // ===== Get Signer =====
        // Get the user's wallet signer for transactions
        console.log("Network is correct (Sepolia), getting signer...");
        signer = await provider.getSigner();
        console.log("Signer obtained:", await signer.getAddress());
        
        // ===== Create Contract Instance =====
        // Initialize contract instance with address, ABI, and signer
        console.log("Creating contract instance with address:", CONTRACT_ADDRESS);
        if (CONTRACT_ADDRESS === "0x0000000000000000000000000000000000000000") {
            console.error("Contract address is not set!");
            alert("Contract address not configured. Please check app.js");
            return false;
        }
        
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        console.log("Contract initialized successfully");
        
        return true;
    } catch (error) {
        console.error("Failed to initialize contract:", error);
        console.error("Error stack:", error.stack);
        alert("Error connecting to blockchain: " + error.message);
        return false;
    }
}

// ===== Network Change Listener =====
// Reload page when user changes network in MetaMask
if (typeof window.ethereum !== "undefined") {
    window.ethereum.on('chainChanged', (chainId) => {
        console.log("Network changed to:", chainId);
        // Reload the page when network changes
        window.location.reload();
    });
    
    // ===== Account Change Listener =====
    // Handle when user switches accounts in MetaMask
    window.ethereum.on('accountsChanged', (accounts) => {
        console.log("Accounts changed:", accounts);
        if (accounts.length === 0) {
            console.log("No accounts connected");
        }
    });
}



// ========================================================================
// SECTION 3: LOGIN POPUP UI MANAGEMENT
// Description: Handle opening and closing the login modal/popup
// ========================================================================

const loginBtn = document.querySelector(".login-button");
const popup = document.querySelector(".login-popup");
const closeBtn = document.querySelector(".back-button");
const blur_effect = document.querySelector(".blur-effect");

// ===== Open Login Popup =====
// Show login popup when user clicks the login button
if (loginBtn) {
    loginBtn.onclick = function () {
        popup.style.display = "block";
        blur_effect.style.display = "block"
    }
}

// ===== Close Login Popup =====
// Hide login popup when user clicks the back/close button
if (closeBtn) {
    closeBtn.onclick = function () {
        popup.style.display = "none";
        blur_effect.style.display = "none";
    }
}


// ========================================================================
// SECTION 4: WALLET SEARCH & DROPDOWN
// Description: Manage wallet selection dropdown for choosing login method
// ========================================================================

const searchBox = document.querySelector(".walletSearch");
const walletOptionsPopup = document.querySelector(".wallet-options-popup");

// ===== Toggle Wallet Dropdown =====
// Show/hide wallet options when clicking on search box
if (walletOptionsPopup && searchBox) {
    searchBox.onclick = function () {
        walletOptionsPopup.style.display = "block";
    }

    // ===== Close Dropdown When Clicking Elsewhere =====
    // Hide wallet options when clicking outside the dropdown
    window.onclick = function (event) {
        if (!searchBox.contains(event.target) && !walletOptionsPopup.contains(event.target)) {
            walletOptionsPopup.style.display = "none";
        }
    };
}


// ========================================================================
// SECTION 5: TOAST NOTIFICATION SYSTEM
// Description: Display temporary notification messages to users
// ========================================================================

// ===== Toast Notification Function =====
// Creates and displays toast notifications with icons and auto-removal
function showToast(message, icon, type = 'loading', duration = 3000) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return null;
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after duration (only for success toasts, loading toasts stay until manually removed)
    if (type === 'success') {
        setTimeout(() => {
            toast.classList.add('remove');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
    
    return toast;
}


// ========================================================================
// SECTION 6: METAMASK WALLET LOGIN
// Description: Connect user's MetaMask wallet and redirect to appropriate dashboard
// ========================================================================

const metamaskWallet = document.querySelector(".wallet1");

if (metamaskWallet) {
    metamaskWallet.onclick = async function () {
        // ===== Check MetaMask Installation =====
        if (typeof window.ethereum == "undefined") {
            alert("Metamask wallet extension not found!");
            return;
        }

        try {
            // ===== Request Account Connection =====
            // Ask user to connect their MetaMask account
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });

            const walletAddress = accounts[0];

            console.log("Connected wallet address: ", walletAddress);
            // Store wallet address in browser storage for later use
            localStorage.setItem("wallet", walletAddress);

            // ===== Check If User Is Faculty =====
            // Compare wallet address with faculty wallet to determine user type
            const FACULTY_WALLET = "0x26839094202c7582DE5279eB61239B55C481Fe2d".toLowerCase();
            const isFaculty = walletAddress.toLowerCase() === FACULTY_WALLET;
            
            // Set flag to show success toast on dashboard
            localStorage.setItem("showLoginToast", "true");
            localStorage.setItem("userType", isFaculty ? "faculty" : "student");

            // ===== Redirect to Appropriate Dashboard =====
            // Send faculty to faculty dashboard, students to student dashboard
            if (isFaculty) {
                window.location.href = "faculty-login.html";
            } else {
                window.location.href = "student-login.html";
            }
        }

        catch (error) {
            console.log("User did not approve request to log in");
        }
    }
}

// ===== Show Login Success Toast =====
// Display success message on dashboard after login
function showLoginSuccessToast() {
    if (localStorage.getItem("showLoginToast") === "true") {
        const userType = localStorage.getItem("userType") || "user";
        showToast(`Logged in as ${userType} ✓`, '✓', 'success', 2500);
        localStorage.removeItem("showLoginToast");
        localStorage.removeItem("userType");
    }
}

// ========================================================================
// SECTION 7: WALLET ADDRESS DISPLAY & COPY
// Description: Display user's connected wallet address with copy to clipboard
// ========================================================================

function getWalletAddress() {
    const wallet = localStorage.getItem("wallet");

    if (wallet) {
        // ===== Format Wallet Address =====
        // Display shortened version: first 6 and last 4 characters
        const walletDisplay = wallet.slice(0, 6) + "..." + wallet.slice(-4);
        document.querySelector(".wallet-address").innerHTML = `
            Connected Wallet - ${walletDisplay}
            <img class="copy-wallet" src="../assets/copy-symbol.png" title="Copy wallet address" alt="Copy">
        `;

        // ===== Copy Wallet to Clipboard =====
        // Handle click to copy full wallet address
        const copyButton = document.querySelector(".copy-wallet");
        if (copyButton) {
            copyButton.onclick = function (e) {
                e.stopPropagation();
                navigator.clipboard.writeText(wallet).then(() => {
                    // Show success feedback with checkmark
                    const originalSrc = copyButton.src;
                    const checkmarkSVG = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

                    copyButton.src = checkmarkSVG;
                    copyButton.style.filter = "drop-shadow(0 0 2px green)";

                    // Revert to original icon after 1.5 seconds
                    setTimeout(() => {
                        copyButton.src = originalSrc;
                        copyButton.style.filter = "none";
                    }, 1500);
                }).catch(() => {
                    alert("Failed to copy wallet address");
                });
            };
        }
    }
}


// ========================================================================
// SECTION 8: CONTRACT ADDRESS DISPLAY & COPY
// Description: Display smart contract address with copy to clipboard
// ========================================================================

function displayContractAddress() {
    const contractAddressElement = document.querySelector(".contract-address");
    
    if (contractAddressElement) {
        // ===== Format Contract Address =====
        // Display shortened version: first 6 and last 4 characters
        const contractDisplay = CONTRACT_ADDRESS.slice(0, 6) + "..." + CONTRACT_ADDRESS.slice(-4);
        contractAddressElement.innerHTML = `
            ${contractDisplay}
            <img class="copy-contract" src="../assets/copy-symbol.png" title="Copy contract address" alt="Copy">
        `;

        // ===== Copy Contract Address to Clipboard =====
        // Handle click to copy full contract address
        const copyButton = contractAddressElement.querySelector(".copy-contract");
        if (copyButton) {
            copyButton.onclick = function (e) {
                e.stopPropagation();
                navigator.clipboard.writeText(CONTRACT_ADDRESS).then(() => {
                    // Show success feedback with checkmark
                    const originalSrc = copyButton.src;
                    const checkmarkSVG = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

                    copyButton.src = checkmarkSVG;
                    copyButton.style.filter = "drop-shadow(0 0 2px green)";

                    // Revert to original icon after 1.5 seconds
                    setTimeout(() => {
                        copyButton.src = originalSrc;
                        copyButton.style.filter = "none";
                    }, 1500);
                }).catch(() => {
                    alert("Failed to copy contract address");
                });
            };
        }
    }
}


// ========================================================================
// SECTION 9: LOGOUT FUNCTIONALITY
// Description: Clear user session and redirect to home page
// ========================================================================

function logout() {
    // ===== Clear Session Storage =====
    // Remove wallet address from browser storage
    localStorage.removeItem("wallet");

    const wallet = localStorage.getItem("wallet");

    // ===== Redirect to Home =====
    // Return user to home page after logout
    if (!wallet) {
        window.location.href = "index.html";
    }
}

// ========================================================================
// SECTION 10: NEW PROJECT POPUP MANAGEMENT
// Description: Handle opening and closing project creation modal
// ========================================================================

const mintButton = document.querySelector(".new-project-button");
const mintProject = document.querySelector(".new-project");
const popupBackdrop = document.querySelector(".popup-backdrop");

// ===== Open Project Creation Popup =====
// Show project creation form when user clicks "New Project" button
if (mintButton) {
    mintButton.onclick = function () {
        mintProject.style.display = "block";
        if (popupBackdrop) popupBackdrop.classList.add("active");
    }
}

// ===== Close Project Creation Popup (Cancel Button) =====
// Hide popup when user clicks cancel button
const cancelBtn = document.querySelector(".cancel");

if (cancelBtn) {
    cancelBtn.onclick = function () {
        mintProject.style.display = "none";
        if (popupBackdrop) popupBackdrop.classList.remove("active");
    }
}

// ===== Close Project Creation Popup (Backdrop Click) =====
// Hide popup when user clicks on the backdrop/overlay
if (popupBackdrop) {
    popupBackdrop.onclick = function () {
        mintProject.style.display = "none";
        popupBackdrop.classList.remove("active");
    }
}


// ========================================================================
// SECTION 11: CREATE PROJECT (BLOCKCHAIN TRANSACTION)
// Description: Submit new project to smart contract on blockchain
// ========================================================================

const mintSubmit = document.querySelector(".new-project-submit");

if (mintSubmit) {
    mintSubmit.onclick = async function () {
        // ===== Get Form Input Values =====
        // Retrieve project details from form fields
        const projectName = document.getElementById("project-name").value.trim();
        const projectDomains = document.getElementById("project-domains").value.trim();
        const projectDate = document.getElementById("date-completed").value.trim();

        // ===== Validate Form Input =====
        // Ensure all fields are filled before submitting
        if (!projectName || !projectDomains || !projectDate) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        try {
            // ===== Initialize Contract Connection =====
            // Ensure contract is connected before transaction
            if (!contract) {
                const initialized = await initializeContract();
                if (!initialized) {
                    alert("Failed to connect to blockchain. Please ensure you're on Sepolia testnet.");
                    return;
                }
            }

            // ===== Disable Button During Transaction =====
            // Prevent duplicate submissions while transaction is pending
            mintSubmit.disabled = true;
            mintSubmit.textContent = "Creating...";

            // ===== Call Smart Contract Function =====
            // Execute createProject function on the blockchain
            const tx = await contract.createProject(projectName, projectDomains, projectDate);

            // Show transaction hash to user
            alert("Transaction sent! Hash: " + tx.hash + "\nWaiting for confirmation...");

            // ===== Wait for Transaction Confirmation =====
            // Wait for blockchain to include transaction in a block
            const receipt = await tx.wait();

            alert("Project created successfully!");

            // ===== Clear Form Fields =====
            // Reset form inputs after successful submission
            document.getElementById("project-name").value = "";
            document.getElementById("project-domains").value = "";
            document.getElementById("date-completed").value = "";

            // ===== Close Popup =====
            // Hide the project creation modal
            mintProject.style.display = "none";
            if (popupBackdrop) popupBackdrop.classList.remove("active");

            // ===== Refresh Project List =====
            // Update the display to show the new project
            if (typeof renderStudentProjects === "function") {
                renderStudentProjects();
            }

        } catch (error) {
            console.error("Error creating project:", error);
            alert("Error creating project: " + error.message);
        } finally {
            // ===== Re-enable Submit Button =====
            // Allow user to submit again after error or success
            mintSubmit.disabled = false;
            mintSubmit.textContent = "Submit";
        }
    }
}

// ========================================================================
// SECTION 12: RENDER STUDENT PROJECTS
// Description: Fetch and display student's projects from blockchain
// ========================================================================

async function renderStudentProjects() {
    const displayProject = document.querySelector(".display-project");
    if (!displayProject) return;

    try {
        // ===== Initialize Contract Connection =====
        // Ensure contract is connected before fetching data
        if (!contract) {
            const initialized = await initializeContract();
            if (!initialized) {
                displayProject.innerHTML = "<p style='text-align: center; color: #999;'>Unable to connect to blockchain</p>";
                return;
            }
        }

        // ===== Fetch Student's Projects =====
        // Get current user's wallet address and retrieve their projects
        const wallet = localStorage.getItem("wallet");
        const projects = await contract.getStudentProjects(wallet);

        // ===== Clear Display =====
        // Remove old project list before rendering new one
        displayProject.innerHTML = "";

        // ===== Handle Empty Project List =====
        // Show message if student hasn't created any projects yet
        if (projects.length === 0) {
            displayProject.innerHTML = "<p style='text-align: center; color: #999; padding: 20px;'>No projects yet. Create your first project!</p>";
            return;
        }

        // ===== Render Each Project =====
        // Create and display a row for each project
        projects.forEach(p => {
            const row = document.createElement("div");
            row.className = "project-row";
            row.style.border = "1px solid #ccc";
            row.style.margin = "10px 0";
            row.style.padding = "15px";
            row.style.borderRadius = "5px";
            row.style.backgroundColor = "#f9f9f9";

            // Display project details: name, domains, date, and minting status
            row.innerHTML = `
                <div class="project-name" style="font-weight: bold; font-size: 1.2em; margin-bottom: 8px;">${p.name}</div>
                <div class="project-desc" style="font-size: 0.9em; color: #666; margin-bottom: 5px;">Domains: ${p.domains}</div>
                <div class="project-date" style="font-size: 0.9em; color: #666; margin-bottom: 8px;">Completed: ${p.date}</div>
                <div class="project-status" style="margin-top: 8px; color: ${p.minted ? 'green' : 'orange'}; font-weight: 500;">
                    Status: ${p.minted ? '✓ NFT Minted (Non-transferrable)' : '⏳ Pending Mint'}
                </div>
            `;
            displayProject.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching student projects:", error);
        displayProject.innerHTML = "<p style='text-align: center; color: red;'>Error loading projects</p>";
    }
    
    // ===== Display Contract Address =====
    // Show the smart contract address on the page
    displayContractAddress();
}


// ========================================================================
// SECTION 13: SEARCH STUDENT PROJECTS
// Description: Filter and search through student's projects in real-time
// ========================================================================

const projectSearch = document.querySelector(".projects-search");

if (projectSearch && document.querySelector(".display-project")) {
    projectSearch.addEventListener("input", async function () {
        // ===== Get Search Term =====
        // Get the search text and convert to lowercase for comparison
        const searchTerm = this.value.toLowerCase().trim();

        try {
            // ===== Initialize Contract Connection =====
            // Ensure contract is ready before querying
            if (!contract) {
                const initialized = await initializeContract();
                if (!initialized) return;
            }

            // ===== Fetch All Projects =====
            // Get student's projects from blockchain
            const wallet = localStorage.getItem("wallet");
            let projects = await contract.getStudentProjects(wallet);

            // ===== Filter Projects =====
            // Search in project name and domains
            if (searchTerm) {
                projects = projects.filter(p =>
                    p.name.toLowerCase().includes(searchTerm) ||
                    p.domains.toLowerCase().includes(searchTerm)
                );
            }

            // ===== Display Filtered Results =====
            // Render the filtered project list
            const displayProject = document.querySelector(".display-project");
            displayProject.innerHTML = "";
            if (projects.length === 0) {
                displayProject.innerHTML = "<p style='text-align: center; color: #999; padding: 20px;'>No projects found</p>";
                return;
            }

            projects.forEach(p => {
                const row = document.createElement("div");
                row.className = "project-row";
                row.style.border = "1px solid #ccc";
                row.style.margin = "10px 0";
                row.style.padding = "10px";
                row.style.borderRadius = "5px";
                row.innerHTML = `
                    <div class="project-name" style="font-weight: bold; font-size: 1.2em;">${p.name}</div>
                    <div class="project-desc">Domains: ${p.domains}</div>
                    <div class="project-date">Completed: ${p.date}</div>
                    <div class="project-status" style="margin-top: 5px; color: ${p.minted ? 'green' : 'orange'}">
                        Status: ${p.minted ? 'NFT Minted (Non-transferrable)' : 'Pending Mint'}
                    </div>
                `;
                displayProject.appendChild(row);
            });
        } catch (error) {
            console.error("Error searching projects:", error);
        }
    });
}

// ========================================================================
// SECTION 14: RENDER FACULTY DASHBOARD
// Description: Display all student projects for faculty approval and minting
// ========================================================================

async function renderFacultyDashboard() {
    console.log("=== renderFacultyDashboard called ===");
    const displayAll = document.querySelector(".display-all-projects");
    if (!displayAll) {
        console.error("display-all-projects element not found");
        return;
    }

    try {
        // ===== Initialize Contract Connection =====
        // Ensure contract is connected before fetching data
        if (!contract) {
            console.log("Contract not initialized, initializing...");
            const initialized = await initializeContract();
            if (!initialized) {
                console.error("Failed to initialize contract");
                displayAll.innerHTML = "<p style='text-align: center; color: #999;'>Unable to connect to blockchain. Please check console for details.</p>";
                return;
            }
        }

        // ===== Fetch All Projects =====
        // Get all student projects from the smart contract
        console.log("Calling getAllProjects...");
        const projects = await contract.getAllProjects();
        console.log("Projects retrieved:", projects);

        // ===== Clear Display =====
        // Remove old project list before rendering new one
        displayAll.innerHTML = "";

        // ===== Handle Empty Project List =====
        // Show message if no projects have been submitted
        if (projects.length === 0) {
            displayAll.innerHTML = "<p style='text-align: center; color: #999; padding: 20px;'>No student projects found.</p>";
            return;
        }

        // ===== Render Each Project =====
        // Create a detailed row for each project with minting action
        projects.forEach(p => {
            const row = document.createElement("div");
            row.className = "project-row";
            row.style.border = "1px solid #ccc";
            row.style.margin = "10px 0";
            row.style.padding = "15px";
            row.style.borderRadius = "5px";
            row.style.display = "flex";
            row.style.justifyContent = "space-between";
            row.style.alignItems = "flex-start";
            row.style.gap = "20px";

            // ===== Project Details Section =====
            // Display project information
            const detailsDiv = document.createElement("div");
            detailsDiv.style.flex = "1";
            detailsDiv.style.minWidth = "0";

            detailsDiv.innerHTML = `
                <div class="project-name" style="font-weight: bold; font-size: 1.2em; margin-bottom: 8px;">${p.name}</div>
                <div class="project-desc" style="font-size: 0.9em; color: #666; margin-bottom: 5px;">Student: <span style="font-family: monospace;">${p.studentWallet}</span></div>
                <div class="project-desc" style="font-size: 0.9em; color: #666; margin-bottom: 5px;">Domains: ${p.domains}</div>
                <div class="project-date" style="font-size: 0.9em; color: #666; margin-bottom: 8px;">Completed: ${p.date}</div>
                <div class="project-status" style="margin-top: 8px; color: ${p.minted ? 'green' : 'orange'}; font-weight: 500;">
                    Status: ${p.minted ? '✓ NFT Minted' : '⏳ Pending Mint'}
                </div>
            `;

            row.appendChild(detailsDiv);

            // ===== Action Button Section =====
            // Show "Mint Project" button for pending projects, "Minted" for completed
            const buttonDiv = document.createElement("div");
            buttonDiv.style.display = "flex";
            buttonDiv.style.gap = "10px";
            buttonDiv.style.flexShrink = "0";

            if (!p.minted) {
                const btn = document.createElement("button");
                btn.innerText = "Mint Project";
                btn.style.padding = "10px 15px";
                btn.style.backgroundColor = "#4CAF50";
                btn.style.color = "white";
                btn.style.border = "none";
                btn.style.cursor = "pointer";
                btn.style.borderRadius = "5px";
                btn.onclick = () => mintProjectNFT(p.id);
                buttonDiv.appendChild(btn);
            } else {
                const btn = document.createElement("div");
                btn.innerText = "Minted";
                btn.style.padding = "10px 15px";
                btn.style.backgroundColor = "transparent";
                btn.style.color = "green";
                btn.style.border = "1px solid green";
                btn.style.borderRadius = "5px";
                btn.style.fontWeight = "500";
                buttonDiv.appendChild(btn);
            }

            row.appendChild(buttonDiv);
            displayAll.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching faculty projects:", error);
        console.error("Error stack:", error.stack);
        displayAll.innerHTML = "<p style='text-align: center; color: red;'>Error loading projects: " + error.message + "</p>";
    }
    
    // ===== Display Contract Address =====
    // Show the smart contract address on the page
    displayContractAddress();
}


// ========================================================================
// SECTION 15: SEARCH FACULTY PROJECTS
// Description: Filter and search through all projects in real-time
// ========================================================================

const facultyProjectSearch = document.querySelector(".projects-search");

if (facultyProjectSearch && document.querySelector(".display-all-projects")) {
    facultyProjectSearch.addEventListener("input", async function () {
        // ===== Get Search Term =====
        // Get the search text and convert to lowercase for comparison
        const searchTerm = this.value.toLowerCase().trim();
        const displayAll = document.querySelector(".display-all-projects");

        try {
            // ===== Initialize Contract Connection =====
            // Ensure contract is ready before querying
            if (!contract) {
                const initialized = await initializeContract();
                if (!initialized) return;
            }

            // ===== Fetch All Projects =====
            // Get all projects from the blockchain
            let projects = await contract.getAllProjects();

            // ===== Filter Projects =====
            // Search in project name, domains, and student wallet
            if (searchTerm) {
                projects = projects.filter(p =>
                    p.name.toLowerCase().includes(searchTerm) ||
                    p.domains.toLowerCase().includes(searchTerm) ||
                    p.studentWallet.toLowerCase().includes(searchTerm)
                );
            }

            // ===== Display Filtered Results =====
            // Render the filtered project list
            displayAll.innerHTML = "";
            if (projects.length === 0) {
                displayAll.innerHTML = "<p style='text-align: center; color: #999; padding: 20px;'>No student projects found</p>";
                return;
            }

            projects.forEach(p => {
                const row = document.createElement("div");
                row.className = "project-row";
                row.style.border = "1px solid #ccc";
                row.style.margin = "10px 0";
                row.style.padding = "10px";
                row.style.borderRadius = "5px";
                row.style.display = "flex";
                row.style.justifyContent = "space-between";
                row.style.alignItems = "center";

                row.innerHTML = `
                    <div>
                        <div class="project-name" style="font-weight: bold; font-size: 1.2em;">${p.name}</div>
                        <div class="project-desc">Student: ${p.studentWallet}</div>
                        <div class="project-desc">Domains: ${p.domains}</div>
                        <div class="project-date">Completed: ${p.date}</div>
                        <div class="project-status" style="margin-top: 5px; color: ${p.minted ? 'green' : 'orange'}">
                            Status: ${p.minted ? 'NFT Minted (Non-transferrable)' : 'Pending Mint'}
                        </div>
                    </div>
                `;

                // ===== Add Mint Button if Needed =====
                // Only show button for projects that haven't been minted
                if (!p.minted) {
                    const btn = document.createElement("button");
                    btn.innerText = "Mint Project";
                    btn.style.padding = "10px";
                    btn.style.backgroundColor = "#4CAF50";
                    btn.style.color = "white";
                    btn.style.border = "none";
                    btn.style.cursor = "pointer";
                    btn.style.borderRadius = "5px";
                    btn.onclick = () => mintProjectNFT(p.id);
                    row.appendChild(btn);
                } else {
                    const btn = document.createElement("div");
                    btn.innerText = "Minted";
                    btn.style.padding = "10px";
                    btn.style.backgroundColor = "transparent";
                    btn.style.color = "green";
                    btn.style.border = "1px solid green";
                    btn.style.borderRadius = "5px";
                    row.appendChild(btn);
                }

                displayAll.appendChild(row);
            });
        } catch (error) {
            console.error("Error searching projects:", error);
        }
    });
}

// ========================================================================
// SECTION 16: MINT PROJECT NFT
// Description: Faculty function to mint a project as Soulbound NFT
// ========================================================================

async function mintProjectNFT(projectId) {
    try {
        // ===== Initialize Contract Connection =====
        // Ensure contract is connected before minting
        if (!contract) {
            const initialized = await initializeContract();
            if (!initialized) {
                alert("Failed to connect to blockchain. Please ensure you're on Sepolia testnet.");
                return;
            }
        }

        // ===== Confirm Minting Action =====
        // Get faculty confirmation before proceeding with blockchain transaction
        const confirmMint = confirm("Are you sure you want to mint this project as an NFT?");
        if (!confirmMint) return;

        // ===== Execute Mint Transaction =====
        // Call the smart contract's mintProject function
        const tx = await contract.mintProject(projectId);
        alert("Mint transaction sent! Hash: " + tx.hash + "\nWaiting for confirmation...");

        // ===== Wait for Confirmation =====
        // Wait for blockchain to include transaction in a block
        const receipt = await tx.wait();
        alert("Project successfully minted as Soulbound Token (Non-transferrable)!");

        // ===== Refresh Dashboard =====
        // Update the display to show updated minting status
        if (typeof renderFacultyDashboard === "function") {
            renderFacultyDashboard();
        }
    } catch (error) {
        console.error("Minting failed:", error);
        alert("Minting failed: " + error.message);
    }
}


// ========================================================================
// SECTION 17: PAGE INITIALIZATION
// Description: Initialize contract and UI when page loads
// ========================================================================

// ===== Initialize Contract on Page Load =====
// Ensure contract is connected when user visits the page
window.addEventListener('load', async function () {
    await initializeContract();
});


// ========================================================================
// SECTION 18: JOURNEY POPUP MANAGEMENT
// Description: Handle opening and closing the journey/welcome modal
// ========================================================================

// ===== Get Journey Popup Elements =====
// Select DOM elements for the journey popup
const journeyPopupOverlay = document.querySelector(".journey-popup-overlay");
const journeyPopupClose = document.querySelector(".journey-popup-close");
const getStartedButtons = document.querySelectorAll(".btn-primary.login-button, .login-button");

// ===== Open Journey Popup =====
// Show journey popup when user clicks "Get Started" button
getStartedButtons.forEach(button => {
    button.addEventListener("click", function (e) {
        // Check if it's the hero section "Get Started" button (first one in hero-buttons)
        if (button.closest(".hero-buttons")) {
            e.preventDefault();
            journeyPopupOverlay.classList.add("active");
        }
    });
});

// ===== Close Journey Popup (Close Button) =====
// Hide journey popup when user clicks close button
if (journeyPopupClose) {
    journeyPopupClose.addEventListener("click", function () {
        journeyPopupOverlay.classList.remove("active");
    });
}

// ===== Close Journey Popup (Backdrop Click) =====
// Hide journey popup when user clicks on the overlay/backdrop
if (journeyPopupOverlay) {
    journeyPopupOverlay.addEventListener("click", function (e) {
        if (e.target === journeyPopupOverlay) {
            journeyPopupOverlay.classList.remove("active");
        }
    });
}


// ========================================================================
// SECTION 19: THEME TOGGLE (DARK/LIGHT MODE)
// Description: Allow users to switch between dark and light themes
// ========================================================================

// ===== Theme Toggle Elements =====
// Select HTML and body elements for theme application
const htmlElement = document.documentElement;
const bodyElement = document.body;

// ===== Initialize Theme on Page Load =====
// Apply saved theme preference when page loads
function initializeTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        htmlElement.classList.add("dark-mode");
        bodyElement.classList.add("dark-mode");
    } else {
        htmlElement.classList.remove("dark-mode");
        bodyElement.classList.remove("dark-mode");
    }
}

// Call initialization immediately
initializeTheme();

// ===== Load Theme from Storage =====
// Apply theme preference from browser storage and update toggle button
function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    const themeToggle = document.getElementById("themeToggle");
    if (savedTheme === "dark") {
        htmlElement.classList.add("dark-mode");
        bodyElement.classList.add("dark-mode");
        if (themeToggle) themeToggle.textContent = "☀️";
    } else {
        htmlElement.classList.remove("dark-mode");
        bodyElement.classList.remove("dark-mode");
        if (themeToggle) themeToggle.textContent = "🌙";
    }
}

// ===== Theme Toggle Button Event Listener =====
// Switch between dark and light mode when user clicks toggle button
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        if (htmlElement.classList.contains("dark-mode")) {
            // ===== Switch to Light Mode =====
            htmlElement.classList.remove("dark-mode");
            bodyElement.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙";
        } else {
            // ===== Switch to Dark Mode =====
            htmlElement.classList.add("dark-mode");
            bodyElement.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "☀️";
        }
    });
}

// Load theme on page load
loadTheme();
