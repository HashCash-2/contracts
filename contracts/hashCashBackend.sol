pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract hashCashBackend {
	IERC20 private HCtokenAddress;
	//mapping( userAddress => mapping( tokenAddress => value))
	mapping(address => mapping(address => uint256)) userDeposits;
	//mapping( userAddress => mapping( tokenAddress => boolean))
	mapping(address => mapping(address => bool)) userDepositBoolean;
	event depositEvent(address from,uint256 tokenAmount);
	event heey(address from,uint date);
	event DoneStuff(address from);
	constructor (IERC20 _tokenAddress) public {
		HCtokenAddress = _tokenAddress;
	}
	function doStuff() external {
		address from = msg.sender;

		HCtokenAddress.transferFrom(from, address(this), 1000);

		emit DoneStuff(from);
	}

	function showTokenBal(address _userAdd)public view returns(uint256) {
		uint256 a;
		a = HCtokenAddress.balanceOf(_userAdd);
		return a;
	}
	function hey() public returns(string memory){
		emit heey(msg.sender,now);

		return 'hey';
		
	}
	function thisaddress()public view returns(address){
		return address(this);
	}
	//deposit
	//approve and transferFrom
	function app(uint256 _amount) public {
		HCtokenAddress.approve(address(this), _amount);
	}
	function addresscollector() public view returns(address){
		return msg.sender;
	}
	function updateUserDeposits(uint256 _amount,address tokenTypeAddress) public {
		if(userDepositBoolean[msg.sender][tokenTypeAddress] == true){
		userDeposits[msg.sender][tokenTypeAddress] = userDeposits[msg.sender][tokenTypeAddress] + _amount;
		}
		else {
			userDepositBoolean[msg.sender][tokenTypeAddress] = true;
			userDeposits[msg.sender][tokenTypeAddress] = userDeposits[msg.sender][tokenTypeAddress] + _amount;
		}
	}
	function showUserDeposits(address tokenTypeAddress) public view returns(bool) {
		return userDepositBoolean[msg.sender][tokenTypeAddress];
	}
	// function depositTokens(uint256 _amount,address tokenTypeAddress) public {
	function depositTokens(uint256 _amount) external {
		uint256 userBal;
		userBal = showTokenBal(msg.sender);
		require(userBal >= _amount);
		// HCtokenAddress.approve(address(this),_amount);
		HCtokenAddress.transferFrom(msg.sender, address(this), _amount);

		emit depositEvent(msg.sender, _amount);

	}
	//token contract will approve
	function withdrawToken(uint256 _amount,address tokenTypeAddress) public returns(bool) {
		if(userDepositBoolean[msg.sender][tokenTypeAddress] == true){
			uint256 userBal;
			userBal = showTokenBal(msg.sender);
			require(_amount <= userBal);
			HCtokenAddress.transferFrom(address(this),msg.sender,_amount);
			return true;
		}
		else{
			return false;
		}
	}
	//withdraw

}
//0x7fF01A8833A4c251399dC0161054455b4df9c234
//approve,function app call from hashCashBackend not working but working from token contract
//maintain a deposit field ? for withdraw purpose?

