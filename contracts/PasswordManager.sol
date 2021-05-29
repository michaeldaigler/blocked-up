pragma solidity ^0.7.3;
import "hardhat/console.sol";

// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

contract PasswordManager {
    // using Counters for Counters.Counter;

    address owner;
    mapping(uint => string) private passwords;
    mapping(address => mapping(string => string)) public passwordsOf;
    mapping(uint => string) platforms;
    mapping(address => uint) public balances;

    constructor() {
        // owner = msg.sender;
    }

    event PasswordSet(string newPassword, address caller);

    function widthraw(uint _amount) external payable {
        require(_amount <= address(this).balance, "Not enough");
        require(_amount < balances[msg.sender], "not enough funds.");
        assert(balances[msg.sender] >= balances[msg.sender] - _amount);
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);

    }

    function setPassword(string memory _newPassword, string memory _whichAccount) external {
        // require(msg.sender == owner);
        console.log("Changing password %s to %s",  passwordsOf[msg.sender][_whichAccount] ,_newPassword);
        passwordsOf[msg.sender][_whichAccount] = _newPassword;
        emit PasswordSet(passwordsOf[msg.sender][_whichAccount], msg.sender);
    }

    function getPassword(string memory account) external view returns(string memory) {
        string memory userPassword = (passwordsOf[msg.sender][account]);
        return userPassword;
    }

    function recieve() external payable {
        balances[msg.sender] += msg.value;
    }
}

