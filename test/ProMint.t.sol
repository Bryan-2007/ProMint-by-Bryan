// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ProMint} from "../contracts/ProMintContract.sol";

interface Vm {
    function prank(address sender) external;
    function expectRevert(bytes calldata revertData) external;
}

contract ProMintTest {
    Vm private constant vm = Vm(address(uint160(uint256(keccak256("hevm cheat code")))));

    address private constant FACULTY =
        address(bytes20(hex"26839094202c7582de5279eb61239b55c481fe2d"));
    address private constant STUDENT = address(0x1001);
    address private constant OTHER = address(0x2002);

    ProMint private proMint;

    function setUp() public {
        proMint = new ProMint();
    }

    function test_FacultyWalletIsExpectedAddress() public view {
        require(proMint.getFacultyWallet() == FACULTY, "Unexpected faculty wallet");
    }

    function test_CreateProjectStoresStudentProject() public {
        vm.prank(STUDENT);
        uint256 projectId = proMint.createProject(
            "Capstone",
            "Solidity, UI",
            "2026-05-12"
        );

        require(projectId == 0, "Unexpected project id");
        require(proMint.getTotalProjects() == 1, "Unexpected total project count");

        ProMint.Project memory project = proMint.getProject(projectId);
        require(project.id == projectId, "Project id mismatch");
        require(project.studentWallet == STUDENT, "Student wallet mismatch");
        require(!project.minted, "Project should start unminted");
    }

    function test_OnlyFacultyCanMintProject() public {
        vm.prank(STUDENT);
        uint256 projectId = proMint.createProject("Capstone", "Solidity", "2026-05-12");

        vm.prank(STUDENT);
        vm.expectRevert(bytes("Only faculty can perform this action"));
        proMint.mintProject(projectId);
    }

    function test_MintProjectCreatesLockedSoulboundNft() public {
        vm.prank(STUDENT);
        uint256 projectId = proMint.createProject("Capstone", "Solidity", "2026-05-12");

        vm.prank(FACULTY);
        proMint.mintProject(projectId);

        ProMint.Project memory project = proMint.getProject(projectId);
        require(project.minted, "Project should be marked minted");
        require(proMint.ownerOf(projectId) == STUDENT, "Token owner mismatch");
        require(proMint.balanceOf(STUDENT) == 1, "Student balance mismatch");
        require(proMint.locked(projectId), "Token should be locked");
        require(bytes(proMint.tokenURI(projectId)).length > 0, "Missing token URI");
    }

    function test_MintedTokenCannotBeTransferredOrApproved() public {
        vm.prank(STUDENT);
        uint256 projectId = proMint.createProject("Capstone", "Solidity", "2026-05-12");

        vm.prank(FACULTY);
        proMint.mintProject(projectId);

        vm.prank(STUDENT);
        vm.expectRevert(bytes("Soulbound token is non-transferable"));
        proMint.transferFrom(STUDENT, OTHER, projectId);

        vm.prank(STUDENT);
        vm.expectRevert(bytes("Soulbound token is non-transferable"));
        proMint.safeTransferFrom(STUDENT, OTHER, projectId);

        vm.prank(STUDENT);
        vm.expectRevert(bytes("Soulbound token is non-transferable"));
        proMint.approve(OTHER, projectId);
    }

    function test_CannotMintProjectTwice() public {
        vm.prank(STUDENT);
        uint256 projectId = proMint.createProject("Capstone", "Solidity", "2026-05-12");

        vm.prank(FACULTY);
        proMint.mintProject(projectId);

        vm.prank(FACULTY);
        vm.expectRevert(bytes("Project already minted"));
        proMint.mintProject(projectId);
    }
}
