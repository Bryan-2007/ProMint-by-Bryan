// ==================== CONTRACT CONFIGURATION ====================
// IMPORTANT: Update these values after deploying the contract to Sepolia

// Check if ethers is loaded
if (typeof ethers === "undefined") {
    console.error("CRITICAL: ethers library not loaded!");
    alert("ERROR: ethers library failed to load. Please check your internet connection or try refreshing the page.");
}

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

// Global contract instance
let contract = null;
let provider = null;
let signer = null;

// Initialize contract connection
async function initializeContract() {
    console.log("=== initializeContract called ===");
    
    // Verify ethers is available
    if (typeof ethers === "undefined") {
        console.error("ethers library is not loaded!");
        alert("ERROR: ethers library failed to load. Please refresh the page.");
        return false;
    }
    
    if (typeof window.ethereum === "undefined") {
        console.error("MetaMask not installed");
        alert("Please install MetaMask extension.");
        return false;
    }
    
    console.log("MetaMask detected:", window.ethereum);

    try {
        console.log("ethers is available, creating BrowserProvider...");
        console.log("ethers version/type:", typeof ethers, Object.keys(ethers).slice(0, 5));
        
        provider = new ethers.BrowserProvider(window.ethereum);
        console.log("BrowserProvider created successfully");
        
        console.log("Requesting accounts...");
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        console.log("Connected accounts:", accounts);
        
        if (!accounts || accounts.length === 0) {
            console.error("No accounts connected");
            alert("Please connect your MetaMask wallet.");
            return false;
        }
        
        console.log("Getting network...");
        const network = await provider.getNetwork();
        console.log("Current network:", network);
        console.log("Current network chainId:", network.chainId, "Type:", typeof network.chainId);
        
        if (network.chainId !== 11155111n) {
            console.error("Wrong network. Expected 11155111, got", network.chainId);
            alert("Please switch to Sepolia testnet in MetaMask. Current network: " + network.name);
            return false;
        }
        
        console.log("Network is correct (Sepolia), getting signer...");
        signer = await provider.getSigner();
        console.log("Signer obtained:", await signer.getAddress());
        
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

// Listen for network changes
if (typeof window.ethereum !== "undefined") {
    window.ethereum.on('chainChanged', (chainId) => {
        console.log("Network changed to:", chainId);
        // Reload the page when network changes
        window.location.reload();
    });
    
    window.ethereum.on('accountsChanged', (accounts) => {
        console.log("Accounts changed:", accounts);
        if (accounts.length === 0) {
            console.log("No accounts connected");
        }
    });
}

// ==================== LOGIN POPUP ====================

const loginBtn = document.querySelector(".login-button");
const popup = document.querySelector(".login-popup");
const closeBtn = document.querySelector(".back-button");
const blur_effect = document.querySelector(".blur-effect");

if (loginBtn) {
    loginBtn.onclick = function () {
        popup.style.display = "block";
        blur_effect.style.display = "block"
    }
}

if (closeBtn) {
    closeBtn.onclick = function () {
        popup.style.display = "none";
        blur_effect.style.display = "none";
    }
}

// ==================== WALLET SEARCH ====================

const searchBox = document.querySelector(".walletSearch");
const walletOptionsPopup = document.querySelector(".wallet-options-popup");

if (walletOptionsPopup && searchBox) {
    searchBox.onclick = function () {
        walletOptionsPopup.style.display = "block";
    }

    window.onclick = function (event) {
        if (!searchBox.contains(event.target) && !walletOptionsPopup.contains(event.target)) {
            walletOptionsPopup.style.display = "none";
        }
    };
}

// ==================== METAMASK LOGIN ====================

// Toast notification function
function showToast(message, icon, type = 'loading', duration = 3000) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return null;
    
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

const metamaskWallet = document.querySelector(".wallet1");

if (metamaskWallet) {
    metamaskWallet.onclick = async function () {
        if (typeof window.ethereum == "undefined") {
            alert("Metamask wallet extension not found!");
            return;
        }

        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });

            const walletAddress = accounts[0];

            console.log("Connected wallet address: ", walletAddress);
            localStorage.setItem("wallet", walletAddress);

            const FACULTY_WALLET = "0x26839094202c7582DE5279eB61239B55C481Fe2d".toLowerCase();
            const isFaculty = walletAddress.toLowerCase() === FACULTY_WALLET;
            
            // Set flag to show success toast on dashboard
            localStorage.setItem("showLoginToast", "true");
            localStorage.setItem("userType", isFaculty ? "faculty" : "student");

            // Redirect to appropriate page
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

// Show login success toast on dashboard if flagged
function showLoginSuccessToast() {
    if (localStorage.getItem("showLoginToast") === "true") {
        const userType = localStorage.getItem("userType") || "user";
        showToast(`Logged in as ${userType} ✓`, '✓', 'success', 2500);
        localStorage.removeItem("showLoginToast");
        localStorage.removeItem("userType");
    }
}

// ==================== WALLET ADDRESS DISPLAY ====================

function getWalletAddress() {
    const wallet = localStorage.getItem("wallet");

    if (wallet) {
        const walletDisplay = wallet.slice(0, 6) + "..." + wallet.slice(-4);
        document.querySelector(".wallet-address").innerHTML = `
            Connected Wallet - ${walletDisplay}
            <img class="copy-wallet" src="../assets/copy-symbol.png" title="Copy wallet address" alt="Copy">
        `;

        // Add copy functionality
        const copyButton = document.querySelector(".copy-wallet");
        if (copyButton) {
            copyButton.onclick = function (e) {
                e.stopPropagation();
                navigator.clipboard.writeText(wallet).then(() => {
                    const originalSrc = copyButton.src;
                    const checkmarkSVG = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

                    copyButton.src = checkmarkSVG;
                    copyButton.style.filter = "drop-shadow(0 0 2px green)";

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

// ==================== LOGOUT ====================

function logout() {
    localStorage.removeItem("wallet");

    const wallet = localStorage.getItem("wallet");

    if (!wallet) {
        window.location.href = "home.html";
    }
}

// ==================== NEW PROJECT POPUP ====================

const mintButton = document.querySelector(".new-project-button");
const mintProject = document.querySelector(".new-project");
const popupBackdrop = document.querySelector(".popup-backdrop");

if (mintButton) {
    mintButton.onclick = function () {
        mintProject.style.display = "block";
        if (popupBackdrop) popupBackdrop.classList.add("active");
    }
}

const cancelBtn = document.querySelector(".cancel");

if (cancelBtn) {
    cancelBtn.onclick = function () {
        mintProject.style.display = "none";
        if (popupBackdrop) popupBackdrop.classList.remove("active");
    }
}

if (popupBackdrop) {
    popupBackdrop.onclick = function () {
        mintProject.style.display = "none";
        popupBackdrop.classList.remove("active");
    }
}

// ==================== CREATE PROJECT (BLOCKCHAIN) ====================

const mintSubmit = document.querySelector(".new-project-submit");

if (mintSubmit) {
    mintSubmit.onclick = async function () {
        const projectName = document.getElementById("project-name").value.trim();
        const projectDomains = document.getElementById("project-domains").value.trim();
        const projectDate = document.getElementById("date-completed").value.trim();

        if (!projectName || !projectDomains || !projectDate) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        try {
            // Initialize contract if not already done
            if (!contract) {
                const initialized = await initializeContract();
                if (!initialized) {
                    alert("Failed to connect to blockchain. Please ensure you're on Sepolia testnet.");
                    return;
                }
            }

            // Disable button to prevent double-click
            mintSubmit.disabled = true;
            mintSubmit.textContent = "Creating...";

            // Call contract to create project
            const tx = await contract.createProject(projectName, projectDomains, projectDate);

            // Show transaction hash
            alert("Transaction sent! Hash: " + tx.hash + "\nWaiting for confirmation...");

            // Wait for transaction to be mined
            const receipt = await tx.wait();

            alert("Project created successfully!");

            // Clear the inputs
            document.getElementById("project-name").value = "";
            document.getElementById("project-domains").value = "";
            document.getElementById("date-completed").value = "";

            // Hide the popup
            mintProject.style.display = "none";
            if (popupBackdrop) popupBackdrop.classList.remove("active");

            // Refresh student projects
            if (typeof renderStudentProjects === "function") {
                renderStudentProjects();
            }

        } catch (error) {
            console.error("Error creating project:", error);
            alert("Error creating project: " + error.message);
        } finally {
            // Re-enable button
            mintSubmit.disabled = false;
            mintSubmit.textContent = "Submit";
        }
    }
}

// ==================== RENDER STUDENT PROJECTS ====================

async function renderStudentProjects() {
    const displayProject = document.querySelector(".display-project");
    if (!displayProject) return;

    try {
        if (!contract) {
            const initialized = await initializeContract();
            if (!initialized) {
                displayProject.innerHTML = "<p style='text-align: center; color: #999;'>Unable to connect to blockchain</p>";
                return;
            }
        }

        const wallet = localStorage.getItem("wallet");
        const projects = await contract.getStudentProjects(wallet);

        displayProject.innerHTML = "";
        if (projects.length === 0) {
            displayProject.innerHTML = "<p style='text-align: center; color: #999; padding: 20px;'>No projects yet. Create your first project!</p>";
            return;
        }

        projects.forEach(p => {
            const row = document.createElement("div");
            row.className = "project-row";
            row.style.border = "1px solid #ccc";
            row.style.margin = "10px 0";
            row.style.padding = "15px";
            row.style.borderRadius = "5px";
            row.style.backgroundColor = "#f9f9f9";

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
}

// ==================== SEARCH STUDENT PROJECTS ====================

const projectSearch = document.querySelector(".projects-search");

if (projectSearch && document.querySelector(".display-project")) {
    projectSearch.addEventListener("input", async function () {
        const searchTerm = this.value.toLowerCase().trim();

        try {
            if (!contract) {
                const initialized = await initializeContract();
                if (!initialized) return;
            }

            const wallet = localStorage.getItem("wallet");
            let projects = await contract.getStudentProjects(wallet);

            // Filter by search term
            if (searchTerm) {
                projects = projects.filter(p =>
                    p.name.toLowerCase().includes(searchTerm) ||
                    p.domains.toLowerCase().includes(searchTerm)
                );
            }

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

// ==================== RENDER FACULTY PROJECTS ====================

async function renderFacultyDashboard() {
    console.log("=== renderFacultyDashboard called ===");
    const displayAll = document.querySelector(".display-all-projects");
    if (!displayAll) {
        console.error("display-all-projects element not found");
        return;
    }

    try {
        if (!contract) {
            console.log("Contract not initialized, initializing...");
            const initialized = await initializeContract();
            if (!initialized) {
                console.error("Failed to initialize contract");
                displayAll.innerHTML = "<p style='text-align: center; color: #999;'>Unable to connect to blockchain. Please check console for details.</p>";
                return;
            }
        }

        console.log("Calling getAllProjects...");
        const projects = await contract.getAllProjects();
        console.log("Projects retrieved:", projects);

        displayAll.innerHTML = "";
        if (projects.length === 0) {
            displayAll.innerHTML = "<p style='text-align: center; color: #999; padding: 20px;'>No student projects found.</p>";
            return;
        }

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
}

// ==================== SEARCH FACULTY PROJECTS ====================

const facultyProjectSearch = document.querySelector(".projects-search");

if (facultyProjectSearch && document.querySelector(".display-all-projects")) {
    facultyProjectSearch.addEventListener("input", async function () {
        const searchTerm = this.value.toLowerCase().trim();
        const displayAll = document.querySelector(".display-all-projects");

        try {
            if (!contract) {
                const initialized = await initializeContract();
                if (!initialized) return;
            }

            let projects = await contract.getAllProjects();

            // Filter by search term
            if (searchTerm) {
                projects = projects.filter(p =>
                    p.name.toLowerCase().includes(searchTerm) ||
                    p.domains.toLowerCase().includes(searchTerm) ||
                    p.studentWallet.toLowerCase().includes(searchTerm)
                );
            }

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

// ==================== MINT PROJECT (BLOCKCHAIN) ====================

async function mintProjectNFT(projectId) {
    try {
        if (!contract) {
            const initialized = await initializeContract();
            if (!initialized) {
                alert("Failed to connect to blockchain. Please ensure you're on Sepolia testnet.");
                return;
            }
        }

        const confirmMint = confirm("Are you sure you want to mint this project as an NFT?");
        if (!confirmMint) return;

        const tx = await contract.mintProject(projectId);
        alert("Mint transaction sent! Hash: " + tx.hash + "\nWaiting for confirmation...");

        const receipt = await tx.wait();
        alert("Project successfully minted as Soulbound Token (Non-transferrable)!");

        if (typeof renderFacultyDashboard === "function") {
            renderFacultyDashboard();
        }
    } catch (error) {
        console.error("Minting failed:", error);
        alert("Minting failed: " + error.message);
    }
}

// ==================== INITIALIZE ON PAGE LOAD ====================

// Initialize contract when page loads
window.addEventListener('load', async function () {
    await initializeContract();
});

// ==================== JOURNEY POPUP ====================

// Get journey popup elements
const journeyPopupOverlay = document.querySelector(".journey-popup-overlay");
const journeyPopupClose = document.querySelector(".journey-popup-close");
const getStartedButtons = document.querySelectorAll(".btn-primary.login-button, .login-button");

// Open journey popup when "Get Started" button is clicked
getStartedButtons.forEach(button => {
    button.addEventListener("click", function (e) {
        // Check if it's the hero section "Get Started" button (first one in hero-buttons)
        if (button.closest(".hero-buttons")) {
            e.preventDefault();
            journeyPopupOverlay.classList.add("active");
        }
    });
});

// Close journey popup when close button is clicked
if (journeyPopupClose) {
    journeyPopupClose.addEventListener("click", function () {
        journeyPopupOverlay.classList.remove("active");
    });
}

// Close journey popup when clicking on the overlay background
if (journeyPopupOverlay) {
    journeyPopupOverlay.addEventListener("click", function (e) {
        if (e.target === journeyPopupOverlay) {
            journeyPopupOverlay.classList.remove("active");
        }
    });
}

// ==================== THEME TOGGLE ====================

const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;
const bodyElement = document.body;

// Load theme preference from localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        htmlElement.classList.add("dark-mode");
        bodyElement.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    } else {
        htmlElement.classList.remove("dark-mode");
        bodyElement.classList.remove("dark-mode");
        themeToggle.textContent = "🌙";
    }
}

// Toggle theme
if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        if (htmlElement.classList.contains("dark-mode")) {
            // Switch to light mode
            htmlElement.classList.remove("dark-mode");
            bodyElement.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙";
        } else {
            // Switch to dark mode
            htmlElement.classList.add("dark-mode");
            bodyElement.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "☀️";
        }
    });
}

// Load theme on page load
loadTheme();
