const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {abi, bytecode}=require('./compile');

//Test in ganache
const mnemonic = 'vivid swamp diesel squeeze spider decrease chronic invite garment apart run inmate';
const provider = new HDWalletProvider(mnemonic, 'http://localhost:8545');

const web3 = new Web3(provider);

const deploy= async () => {
    const accounts = await web3.eth.getAccounts();

    const argumentsConstructor = [
        "CryptoArgie Coin",
        "CARGIE",
        18,
        21000000
    ];

    const gasEstimate = await new web3.eth.Contract(abi)
        .deploy({data: bytecode, arguments: argumentsConstructor})
        .estimateGas({ 
            from: accounts[0]
        });

    const result = await new web3.eth.Contract(abi)
        .deploy({data: bytecode, arguments: argumentsConstructor})
        .send({gas: gasEstimate, from: accounts[0]});
    
        console.log("Contract deployed to",result.options.address);
        console.log("Contract details: ",result);

};
deploy();

//Test in ganache
//contract: 0x4ff2e469b32852f152dfdc2aea9cc7c35752e6b4