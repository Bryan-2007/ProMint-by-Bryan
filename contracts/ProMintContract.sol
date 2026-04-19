// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// ============================================================================
// PROMINT SMART CONTRACT
// Purpose: Manage student projects and allow faculty to mint them as NFTs
//          Stores project metadata and tracks minting status on blockchain
// ============================================================================

contract ProMint {

    // ========================================================================
    // SECTION 1: STATE VARIABLES
    // Description: Define storage variables that persist on the blockchain
    //              These variables maintain the contract's state
    // ========================================================================

    // Faculty wallet address - the only account allowed to mint projects
    address private facultyWallet = 0x26839094202c7582DE5279eB61239B55C481Fe2d;


    // ========================================================================
    // SECTION 2: DATA STRUCTURES
    // Description: Define the Project struct to organize project information
    //              Each project stores student work details and minting status
    // ========================================================================

    // Project structure - represents a single student project
    struct Project {
        uint256 id;                  // Unique project identifier
        string name;                 // Project name/title
        string domains;              // Technical domains/technologies used
        string date;                 // Project completion date
        address studentWallet;       // Wallet address of the student who created it
        bool minted;                 // Whether the project has been minted as NFT
        uint256 timestamp;           // Block timestamp when project was created
    }


    // ========================================================================
    // SECTION 3: MAPPINGS (DATA STORAGE)
    // Description: Define how data is stored and organized in the contract
    //              Mappings provide efficient lookup by key
    // ========================================================================

    // Mapping: projectId => Project details
    // Stores all projects indexed by their ID
    mapping(uint256 => Project) private projects;

    // Mapping: studentWallet => array of project IDs
    // Stores which projects belong to each student
    mapping(address => uint256[]) private studentProjects;

    // Counter to generate unique project IDs
    uint256 private projectCounter = 0;


    // ========================================================================
    // SECTION 4: EVENTS
    // Description: Events are logged when important actions occur
    //              They allow frontend to listen for blockchain changes
    // ========================================================================

    // Event emitted when a new project is created
    event ProjectCreated(
        uint256 indexed projectId,
        string name,
        address indexed studentWallet,
        uint256 timestamp
    );

    // Event emitted when a project is minted by faculty
    event ProjectMinted(
        uint256 indexed projectId,
        address indexed facultyWallet,
        uint256 timestamp
    );


    // ========================================================================
    // SECTION 5: MODIFIERS
    // Description: Modifiers restrict function access to specific users
    //              Used for access control and permissions
    // ========================================================================

    // Modifier: Ensures only the faculty can execute the function
    modifier onlyFaculty() {
        require(
            msg.sender == facultyWallet,
            "Only faculty can perform this action"
        );
        _;
    }


    // ========================================================================
    // SECTION 6: PROJECT CREATION FUNCTION
    // Description: Allows students to create and submit new projects
    //              Validates input and stores project on blockchain
    // ========================================================================

    // Create a new project
    function createProject(
        string memory _name,
        string memory _domains,
        string memory _date
    ) public returns (uint256) {
        // Validate project name is not empty
        require(bytes(_name).length > 0, "Project name cannot be empty");

        // Validate domains field is not empty
        require(bytes(_domains).length > 0, "Domains cannot be empty");

        // Get next project ID
        uint256 projectId = projectCounter;
        projectCounter++;

        // Create and store the project with current data
        projects[projectId] = Project({
            id: projectId,
            name: _name,
            domains: _domains,
            date: _date,
            studentWallet: msg.sender,                    // Store caller's wallet
            minted: false,                                // Initially not minted
            timestamp: block.timestamp                    // Record creation time
        });

        // Add project ID to student's project list
        studentProjects[msg.sender].push(projectId);

        // Emit event for frontend listeners
        emit ProjectCreated(projectId, _name, msg.sender, block.timestamp);

        // Return the new project's ID
        return projectId;
    }


    // ========================================================================
    // SECTION 7: PROJECT MINTING FUNCTION
    // Description: Allows faculty to mint (approve) student projects as NFTs
    //              Only faculty can call this function
    // ========================================================================

    // Mint a project (only faculty can call this)
    function mintProject(uint256 _projectId) public onlyFaculty {
        // Verify project exists
        require(_projectId < projectCounter, "Project does not exist");

        // Verify project hasn't already been minted
        require(!projects[_projectId].minted, "Project already minted");

        // Mark project as minted
        projects[_projectId].minted = true;

        // Emit event for frontend listeners
        emit ProjectMinted(_projectId, msg.sender, block.timestamp);
    }


    // ========================================================================
    // SECTION 8: READ-ONLY FUNCTIONS (QUERIES)
    // Description: Functions that retrieve data without modifying state
    //              These can be called by anyone without spending gas
    // ========================================================================

    // Get all projects from the contract
    function getAllProjects() public view returns (Project[] memory) {
        // Create array to hold all projects
        Project[] memory allProjects = new Project[](projectCounter);

        // Loop through all projects and add to array
        for (uint256 i = 0; i < projectCounter; i++) {
            allProjects[i] = projects[i];
        }

        return allProjects;
    }

    // Get all projects created by a specific student
    function getStudentProjects(address _studentWallet)
        public
        view
        returns (Project[] memory)
    {
        // Get array of project IDs for the student
        uint256[] memory projectIds = studentProjects[_studentWallet];

        // Create array to hold student's projects
        Project[] memory studentProjectsList = new Project[](
            projectIds.length
        );

        // Loop through student's project IDs and fetch project details
        for (uint256 i = 0; i < projectIds.length; i++) {
            studentProjectsList[i] = projects[projectIds[i]];
        }

        return studentProjectsList;
    }

    // Get details of a single project
    function getProject(uint256 _projectId)
        public
        view
        returns (Project memory)
    {
        // Verify project exists
        require(_projectId < projectCounter, "Project does not exist");

        return projects[_projectId];
    }

    // Get total number of projects in the contract
    function getTotalProjects() public view returns (uint256) {
        return projectCounter;
    }

    // Get the current faculty wallet address
    function getFacultyWallet() public view returns (address) {
        return facultyWallet;
    }


    // ========================================================================
    // SECTION 9: FACULTY MANAGEMENT FUNCTIONS
    // Description: Functions that allow faculty to manage permissions
    //              Only current faculty can update the faculty wallet
    // ========================================================================

    // Update the faculty wallet address (only current faculty can call)
    function updateFacultyWallet(address _newFaculty) public onlyFaculty {
        // Verify new address is valid
        require(_newFaculty != address(0), "Invalid address");

        // Update faculty wallet
        facultyWallet = _newFaculty;
    }

}
