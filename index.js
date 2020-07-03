var Web3 = require('web3');
var tokenCreator = require('./build/contracts/tokenCreator.json');
var hashCashBackend = require('./build/contracts/hashCashBackend.json');


var init = async () => {
	// var web3 = new Web3('http://127.0.0.1:9545');
	var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
	var id = await web3.eth.net.getId();
	var deployedNetwork = hashCashBackend.networks[id];

	var hcContract = new web3.eth.Contract(
		hashCashBackend.abi,
		deployedNetwork.address
	);
	var deployedNetworkToken = tokenCreator.networks[id];
	var tokenContract = new web3.eth.Contract(
		tokenCreator.abi,
		deployedNetworkToken.address
	);
	var hcContractAddress = deployedNetwork.address;
	var tokenContractAddress = deployedNetworkToken.address;
	console.log(hcContractAddress,tokenContractAddress);
	// console.log(hcContract);
	console.log('tx hash',deployedNetwork.transactionHash);
	var trx = await web3.eth.getTransaction(deployedNetwork.transactionHash);
	console.log('get TRansaction',trx);
	console.log(typeof trx);
	// console.log('blocknum',trx["blockNumber"]);
	var address = await web3.eth.getAccounts();
	console.log(address);

	var res = await hcContract.methods.hey().send({from:address[0]});
	console.log("res",res);
	var eventres = await hcContract.getPastEvents(
		'heey',
		{
			// filter:{
				// value: 'key'
			// }
			fromBlock:0
		}
	);
	// console.log("eventeafe",eventres);
	console.log(await web3.eth.getBlockNumber());
	// console.log("token",tokenContract);
	console.log("approval o/p");
	var at = await tokenContract.methods.balanceOf(address[0]).call();
	console.log("at",at);
	var approval_receipt = await tokenContract.methods.approve(hcContractAddress,10000).send({from:address[0]});
	console.log("approve",approval_receipt);
	var allowance = await tokenContract.methods.allowance(address[0],hcContractAddress).call();
	console.log("allowanceclear",allowance);
	// var depo = await hcContract.methods.depositTokens(3).send({from:address[0]});
	// console.log("depo",depo);
	// hcContract.methods.depositTokens(3).send({from:address[0]}).then(receipt => {
	// 	console.log("receipt",receipt);
	// 	hcContract.methods.updateUserDeposits(3,hcContractAddress).call().then(res => {
	// 		console.log("address",res);
	// 	});
		
	// });
	var depres = await hcContract.methods.depositTokens(3).send({from:address[0]});
	console.log("receipt",depres);
	var upd = await hcContract.methods.updateUserDeposits(3,hcContractAddress).call();
	console.log("address",upd);
	var boolresp = await hcContract.methods.showUserDeposits(hcContractAddress).call();
	console.log("bool resp",boolresp);
	// console.log("depo",depo);
	var bal = await hcContract.methods.showTokenBal(hcContractAddress).call();
	console.log("at",bal);
	var at = await tokenContract.methods.balanceOf(address[0]).call();
	console.log("at",at);
	var at = await tokenContract.methods.balanceOf(hcContractAddress).call();
	console.log("at",at);
	var allowance = await tokenContract.methods.allowance(address[0],hcContractAddress).call();
	console.log("allowance remaining",allowance);
	// var bal = await hcContract.methods.addresscollector(hcContractAddress).call();
	// console.log("at",bal);
	var boolresp = await hcContract.methods.showUserDeposits(hcContractAddress).call();
	console.log("bool resp",boolresp);
}
init();