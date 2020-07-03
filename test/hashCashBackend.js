const HashCashBackend = artifacts.require('hashCashBackend');
const TokenCreator = artifacts.require('tokenCreator');

contract('HashCash Backend', async accounts => {
	let tokenCreator = null;
	let hashCashBackend = null;
	before(async () => {
		tokenCreator = await TokenCreator.deployed();
		hashCashBackend = await HashCashBackend.deployed();
	});
	it('get address of hashCashBackend deployed contract', async () => {
		var hashCashBackend_address = hashCashBackend.address ;
		console.log(hashCashBackend_address);
	});
	it('accounts[0] gets all tokens when the contracts are deployed', async () => {
		var balance = (await tokenCreator.balanceOf(accounts[0])).toString();
		assert(balance != 0 && balance != null);
		console.log('balance of accounts[0]',balance);
	});
	it('no tokens transferred till now, balance of hashCash contract should be 0',async () => {
		var balance_hc = (await tokenCreator.balanceOf(hashCashBackend.address)).toString();
		assert(balance_hc == 0);
		console.log('balance of accounts[0]',balance_hc);
	});
	it('account[0] approves hashCashBackend contract for 100 tokens',async () => {
		await tokenCreator.approve(hashCashBackend.address,1000);

		var allowance = (await tokenCreator.allowance(accounts[0],hashCashBackend.address)).toString();
		assert(allowance == 1000);
	});
	it('no deposits till now,userDeposit show return false',async () => {
		var userDepositResult = await hashCashBackend.showUserDeposits(tokenCreator.address);
		console.log(userDepositResult);
		assert(!userDepositResult);
	});
	it('hashCash contract deposits 100 token to itself,balance of hashCash contract should be 100 tokens',async () => {
		var account_balA = (await tokenCreator.balanceOf(accounts[0])).toString();
		var hc_balA = (await tokenCreator.balanceOf(hashCashBackend.address)).toString();
		await hashCashBackend.depositTokens(100);
		// await hashCashBackend.updateUserDeposits(100,tokenCreator.address);
		var account_balB = (await tokenCreator.balanceOf(accounts[0])).toString();
		var hc_balB = (await tokenCreator.balanceOf(hashCashBackend.address)).toString();
		// assert(hc_balA == 0);
		assert(hc_balB == 100);
		console.log(account_balA,account_balB);
		// assert(account_balA - account_balB == 100);
	});
	it('deposits done,userDeposit show return true',async () => {
		await hashCashBackend.depositTokens(100);
		await hashCashBackend.updateUserDeposits(100,tokenCreator.address);
		var userDepositResult = await hashCashBackend.showUserDeposits(tokenCreator.address);
		console.log(userDepositResult);
		assert(userDepositResult);
	});

})

