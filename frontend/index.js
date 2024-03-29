const addressContract = '0xe78a0f7e598cc8b0bb87894b0f60dd2a88d6a8ab';
const abiJsonInterface = [{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_releaseTime","type":"uint256"}],"name":"mintTimelocked","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];

let account;
let web3;
let MyCoin;

function init(){
    if(typeof window.ethereum !== 'undefined'){
        const metamaskBtn=document.getElementById('enableEthereumButton');
        metamaskBtn.classList.remove('d-none');

        metamaskBtn.addEventListener('click', async() => {
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'});
            account = accounts[0];

            metamaskBtn.classList.add('d-none');
            document.getElementById('accountSelected').innerHTML = account;
            document.getElementById('accountSelected').classList.add('border');
            
            detectChangeAccount();
            contract();

        })
    }
}

function detectChangeAccount(){
    window.ethereum.on('accountsChanged', function(accounts){
        console.log(accounts);
        account = accounts[0];
        document.getElementById('accountSelected').innerHTML=account;
        Swal.fire({
            position: 'top-start',
            icon: 'success',
            title: 'Cuenta conectada',
            showConfirmButton: false,
            timer: 1500
        });
    });
    
}

function contract(){
    web3=new Web3(window.ethereum);
    MyCoin=new web3.eth.Contract(abiJsonInterface, addressContract);

    const address = document.getElementById('accountSelected');
    //const value = address.value;
    const value = '0x6400Fc06970c47736DbC8a0d5df4df73d5BdB595';


    MyCoin.methods.balanceOf(value).call().then(res => {
        const amount = web3.utils.fromWei(res, 'ether');
        const valueSpan = document.getElementById('balance');
        valueSpan.innerHTML=amount;
    });
    interact();
}
function interact(){
    const btnGetBalance = document.getElementById('btnGetBalance');
    btnGetBalance.addEventListener('click', () => {
        const address = document.getElementById('addressGetBalance');
        console.log(address.value);
        const value = address.value;

        MyCoin.methods.balanceOf(value).call().then(res =>{
            const amount = web3.utils.fromWei(res, 'ether');
            const valueSpan = document.getElementById('balance');
            valueSpan.innerHTML = amount;
        });
    });
    const transfer = document.getElementById('btnTransfer');
    transfer.addEventListener('click', ()=>{
        const address = document.getElementById('addressBeneficiaria');
        const addressValue = address.value;

        const amount = document.getElementById('cantidad');
        const amountString = amount.value.toString();
        const amountTransfer = web3.utils.toWei(amountString, 'ether');

        MyCoin.methods.transfer(addressValue, amountTransfer).send({from: account}).then(res => {
            address.value='';
            amount.value=0;
            Swal.fire({
                position: 'top-start',
                icon: 'success',
                title: 'Transferencia realizada',
                showConfirmButton: false,
                timer: 1500
            });
        });
    });

}

window.onload = init();