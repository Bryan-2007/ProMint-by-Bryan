// ==================== CONTRACT CONFIGURATION ====================
// IMPORTANT: Update these values after deploying the contract to Sepolia

const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with deployed address
const CONTRACT_ABI = [
    {
        "inputs": [],
        "name": "createProject",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "nonpayable",
        "type": "function",
        "constant": false,
        "payable": false,
        "inputs": [
            {"name": "_name", "type": "string"},
            {"name": "_domains", "type": "string"},
            {"name": "_date", "type": "string"}
        ]
    },
    {
        "inputs": [{"internalType": "uint256", "name": "_projectId", "type": "uint256"}],
        "name": "mintProject",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllProjects",
        "outputs": [
            {
                "components": [
                    {"internalType": "uint256", "name": "id", "type": "uint256"},
                    {"internalType": "string", "name": "name", "type": "string"},
                    {"internalType": "string", "name": "domains", "type": "string"},
                    {"internalType": "string", "name": "date", "type": "string"},
                    {"internalType": "address", "name": "studentWallet", "type": "address"},
                    {"internalType": "bool", "name": "minted", "type": "bool"},
                    {"internalType": "uint256", "name": "timestamp", "type": "uint256"}
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
        "inputs": [{"internalType": "address", "name": "_studentWallet", "type": "address"}],
        "name": "getStudentProjects",
        "outputs": [
            {
                "components": [
                    {"internalType": "uint256", "name": "id", "type": "uint256"},
                    {"internalType": "string", "name": "name", "type": "string"},
                    {"internalType": "string", "name": "domains", "type": "string"},
                    {"internalType": "string", "name": "date", "type": "string"},
                    {"internalType": "address", "name": "studentWallet", "type": "address"},
                    {"internalType": "bool", "name": "minted", "type": "bool"},
                    {"internalType": "uint256", "name": "timestamp", "type": "uint256"}
                ],
                "internalType": "struct ProMint.Project[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Global contract instance
let contract = null;
let provider = null;
let signer = null;

// Initialize contract connection
async function initializeContract() {
    if (typeof window.ethereum === "undefined") {
        console.log("MetaMask not installed, using fallback");
        return false;
    }

    try {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = await provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        console.log("Contract initialized successfully");
        return true;
    } catch (error) {
        console.error("Failed to initialize contract:", error);
        return false;
    }
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
            if (walletAddress.toLowerCase() === FACULTY_WALLET) {
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
    const displayAll = document.querySelector(".display-all-projects");
    if (!displayAll) return;

    try {
        if (!contract) {
            const initialized = await initializeContract();
            if (!initialized) {
                displayAll.innerHTML = "<p style='text-align: center; color: #999;'>Unable to connect to blockchain</p>";
                return;
            }
        }

        const projects = await contract.getAllProjects();

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
        console.error("Error fetching faculty projects:", error);
        displayAll.innerHTML = "<p style='text-align: center; color: red;'>Error loading projects</p>";
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
