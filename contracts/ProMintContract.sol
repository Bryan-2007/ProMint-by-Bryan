// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProMint {
    // Faculty wallet address
    address private facultyWallet = 0x26839094202c7582DE5279eB61239B55C481Fe2d;

    // Project structure
    struct Project {
        uint256 id;
        string name;
        string domains;
        string date;
        address studentWallet;
        bool minted;
        uint256 timestamp;
    }

    // Mappings
    mapping(uint256 => Project) private projects;
    mapping(address => uint256[]) private studentProjects;
    uint256 private projectCounter = 0;

    // Events
    event ProjectCreated(
        uint256 indexed projectId,
        string name,
        address indexed studentWallet,
        uint256 timestamp
    );

    event ProjectMinted(
        uint256 indexed projectId,
        address indexed facultyWallet,
        uint256 timestamp
    );

    // Modifiers
    modifier onlyFaculty() {
        require(
            msg.sender == facultyWallet,
            "Only faculty can perform this action"
        );
        _;
    }

    // Create a new project
    function createProject(
        string memory _name,
        string memory _domains,
        string memory _date
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Project name cannot be empty");
        require(bytes(_domains).length > 0, "Domains cannot be empty");

        uint256 projectId = projectCounter;
        projectCounter++;

        projects[projectId] = Project({
            id: projectId,
            name: _name,
            domains: _domains,
            date: _date,
            studentWallet: msg.sender,
            minted: false,
            timestamp: block.timestamp
        });

        studentProjects[msg.sender].push(projectId);

        emit ProjectCreated(projectId, _name, msg.sender, block.timestamp);

        return projectId;
    }

    // Mint a project (only faculty)
    function mintProject(uint256 _projectId) public onlyFaculty {
        require(_projectId < projectCounter, "Project does not exist");
        require(!projects[_projectId].minted, "Project already minted");

        projects[_projectId].minted = true;

        emit ProjectMinted(_projectId, msg.sender, block.timestamp);
    }

    // Get all projects (for faculty)
    function getAllProjects() public view returns (Project[] memory) {
        Project[] memory allProjects = new Project[](projectCounter);

        for (uint256 i = 0; i < projectCounter; i++) {
            allProjects[i] = projects[i];
        }

        return allProjects;
    }

    // Get student's projects
    function getStudentProjects(address _studentWallet)
        public
        view
        returns (Project[] memory)
    {
        uint256[] memory projectIds = studentProjects[_studentWallet];
        Project[] memory studentProjectsList = new Project[](
            projectIds.length
        );

        for (uint256 i = 0; i < projectIds.length; i++) {
            studentProjectsList[i] = projects[projectIds[i]];
        }

        return studentProjectsList;
    }

    // Get single project
    function getProject(uint256 _projectId)
        public
        view
        returns (Project memory)
    {
        require(_projectId < projectCounter, "Project does not exist");
        return projects[_projectId];
    }

    // Get total projects
    function getTotalProjects() public view returns (uint256) {
        return projectCounter;
    }

    // Get faculty wallet
    function getFacultyWallet() public view returns (address) {
        return facultyWallet;
    }

    // Update faculty wallet (only current faculty)
    function updateFacultyWallet(address _newFaculty) public onlyFaculty {
        require(_newFaculty != address(0), "Invalid address");
        facultyWallet = _newFaculty;
    }
}
