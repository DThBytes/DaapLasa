const path = require('path');
const fs = require('fs');
const solc = require('solc');

const MyCoinPath = path.join(__dirname, '../MyCoin.sol');
const code = fs.readFileSync(MyCoinPath, 'utf8');

const input ={
    language: 'Solidity',
    sources: {
        'MyCoin.sol':{
            content: code
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));


module.exports = {
    abi: output.contracts['MyCoin.sol'].MyCoin.abi,
    bytecode: output.contracts['MyCoin.sol'].MyCoin.evm.bytecode.object
}