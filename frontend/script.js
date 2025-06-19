let web3;
let account;

const contractAddress = "PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";
const contractABI = [/* Paste ABI from Remix here */];

let contract;

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
    document.getElementById('accountDisplay').innerText = "Connected: " + account;
    contract = new web3.eth.Contract(contractABI, contractAddress);
  } else {
    alert("Install MetaMask");
  }
}

async function getRecords() {
  const patient = document.getElementById('patientAddress').value;
  const records = await contract.methods.viewRecord(patient).call({ from: account });

  let html = `<h3>Records for ${patient}</h3>`;
  records.forEach((r, i) => {
    html += `<p><strong>${i+1}. ${r.description}</strong> - <a href='https://ipfs.io/ipfs/${r.ipfsHash}' target='_blank'>View File</a></p>`;
  });

  document.getElementById('records').innerHTML = html;
}
