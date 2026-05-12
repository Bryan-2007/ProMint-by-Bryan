// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProMint {
    string public constant name = "ProMint Soulbound Project";
    string public constant symbol = "PROMINT";

    // Hardcoded faculty wallet: 0x26839094202c7582de5279eb61239b55c481fe2d
    address private facultyWallet =
        address(bytes20(hex"26839094202c7582de5279eb61239b55c481fe2d"));

    struct Project {
        uint256 id;
        string name;
        string domains;
        string date;
        address studentWallet;
        bool minted;
        uint256 timestamp;
    }

    mapping(uint256 => Project) private projects;
    mapping(address => uint256[]) private studentProjects;
    mapping(uint256 => address) private tokenOwners;
    mapping(address => uint256) private ownedTokenCount;
    mapping(address => mapping(address => bool)) private operatorApprovals;

    uint256 private projectCounter = 0;

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

    event FacultyWalletUpdated(
        address indexed previousFaculty,
        address indexed newFaculty
    );

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    event Locked(uint256 indexed tokenId);

    modifier onlyFaculty() {
        require(msg.sender == facultyWallet, "Only faculty can perform this action");
        _;
    }

    function createProject(
        string memory _name,
        string memory _domains,
        string memory _date
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Project name cannot be empty");
        require(bytes(_domains).length > 0, "Domains cannot be empty");
        require(bytes(_date).length > 0, "Date cannot be empty");
        require(bytes(_name).length <= 256, "Project name too long");
        require(bytes(_domains).length <= 512, "Domains too long");
        require(bytes(_date).length <= 64, "Date too long");

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

    function mintProject(uint256 _projectId) public onlyFaculty {
        require(_projectId < projectCounter, "Project does not exist");
        require(!projects[_projectId].minted, "Project already minted");

        Project storage project = projects[_projectId];
        project.minted = true;

        tokenOwners[_projectId] = project.studentWallet;
        ownedTokenCount[project.studentWallet]++;

        emit Transfer(address(0), project.studentWallet, _projectId);
        emit Locked(_projectId);
        emit ProjectMinted(_projectId, msg.sender, block.timestamp);
    }

    function getAllProjects() public view returns (Project[] memory) {
        return getProjects(0, projectCounter);
    }

    function getProjects(uint256 _offset, uint256 _limit)
        public
        view
        returns (Project[] memory)
    {
        if (_offset >= projectCounter) {
            return new Project[](0);
        }

        uint256 end = _offset + _limit;
        if (end > projectCounter) {
            end = projectCounter;
        }

        Project[] memory projectList = new Project[](end - _offset);
        for (uint256 i = _offset; i < end; i++) {
            projectList[i - _offset] = projects[i];
        }

        return projectList;
    }

    function getStudentProjects(address _studentWallet)
        public
        view
        returns (Project[] memory)
    {
        uint256[] memory projectIds = studentProjects[_studentWallet];
        Project[] memory studentProjectsList = new Project[](projectIds.length);

        for (uint256 i = 0; i < projectIds.length; i++) {
            studentProjectsList[i] = projects[projectIds[i]];
        }

        return studentProjectsList;
    }

    function getProject(uint256 _projectId) public view returns (Project memory) {
        require(_projectId < projectCounter, "Project does not exist");
        return projects[_projectId];
    }

    function getTotalProjects() public view returns (uint256) {
        return projectCounter;
    }

    function getFacultyWallet() public view returns (address) {
        return facultyWallet;
    }

    function updateFacultyWallet(address _newFaculty) public onlyFaculty {
        require(_newFaculty != address(0), "Invalid address");
        address previousFaculty = facultyWallet;
        facultyWallet = _newFaculty;
        emit FacultyWalletUpdated(previousFaculty, _newFaculty);
    }

    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "Invalid owner");
        return ownedTokenCount[owner];
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = tokenOwners[tokenId];
        require(owner != address(0), "Token does not exist");
        return owner;
    }

    function locked(uint256 tokenId) public view returns (bool) {
        ownerOf(tokenId);
        return true;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        ownerOf(tokenId);
        Project memory project = projects[tokenId];

        return string.concat(
            "data:application/json;utf8,{",
            '"name":"',
            _escapeJson(project.name),
            '",',
            '"description":"ProMint soulbound certification for a student project.",',
            '"attributes":[',
            '{"trait_type":"Domains","value":"',
            _escapeJson(project.domains),
            '"},',
            '{"trait_type":"Date Completed","value":"',
            _escapeJson(project.date),
            '"},',
            '{"trait_type":"Student Wallet","value":"',
            _addressToString(project.studentWallet),
            '"}',
            "]}"
        );
    }

    function approve(address, uint256) public pure {
        revert("Soulbound token is non-transferable");
    }

    function getApproved(uint256 tokenId) public view returns (address) {
        ownerOf(tokenId);
        return address(0);
    }

    function setApprovalForAll(address operator, bool approved) public {
        operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function isApprovedForAll(address owner, address operator) public view returns (bool) {
        return operatorApprovals[owner][operator];
    }

    function transferFrom(address, address, uint256) public pure {
        revert("Soulbound token is non-transferable");
    }

    function safeTransferFrom(address, address, uint256) public pure {
        revert("Soulbound token is non-transferable");
    }

    function safeTransferFrom(address, address, uint256, bytes memory) public pure {
        revert("Soulbound token is non-transferable");
    }

    function supportsInterface(bytes4 interfaceId) public pure returns (bool) {
        return
            interfaceId == 0x01ffc9a7 ||
            interfaceId == 0x80ac58cd ||
            interfaceId == 0x5b5e139f ||
            interfaceId == 0xb45a3c0e;
    }

    function _escapeJson(string memory value) private pure returns (string memory) {
        bytes memory input = bytes(value);
        bytes memory output = new bytes(input.length * 2);
        uint256 length = 0;

        for (uint256 i = 0; i < input.length; i++) {
            bytes1 char = input[i];
            if (char == '"' || char == "\\") {
                output[length++] = "\\";
            }
            output[length++] = char;
        }

        bytes memory trimmed = new bytes(length);
        for (uint256 i = 0; i < length; i++) {
            trimmed[i] = output[i];
        }

        return string(trimmed);
    }

    function _addressToString(address account) private pure returns (string memory) {
        bytes20 value = bytes20(account);
        bytes16 symbols = "0123456789abcdef";
        bytes memory buffer = new bytes(42);
        buffer[0] = "0";
        buffer[1] = "x";

        for (uint256 i = 0; i < 20; i++) {
            buffer[2 + i * 2] = symbols[uint8(value[i] >> 4)];
            buffer[3 + i * 2] = symbols[uint8(value[i] & 0x0f)];
        }

        return string(buffer);
    }
}
