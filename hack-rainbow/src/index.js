import 'regenerator-runtime/runtime'

import { initContract, login, logout } from './utils'

import getConfig from './config'
import { context } from 'near-api-js'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

// global variable used throughout
let currentBalance
let currentFund

const balanceButton = document.getElementById('balance-button')

//////////////////////////////////////////////////////////////////////////


document.getElementById('balance').onsubmit = async (event) => {
  event.preventDefault()
  const account = document.getElementById("balance-input").value
  alert(account)
  try {
    // make an update call to the smart contract
    await fetchBalance(account)
    // await fetchFund()
    
  } catch (e) {
    alert(
      'Something went wrong! ' +
      'Maybe you need to sign out and back in? ' +
      'Check your browser console for more info.'+
      e
    )
    throw e
  } finally {
    // re-enable the form, whether the call succeeded or failed
    balanceButton.disabled=false
  }

  // update the counter in the UI
  

  // show notification
  document.querySelector('[data-behavior=notification]').style.display = 'block'
  // remove notification again after css animation completes
  // this allows it to be shown again next time the form is submitted
  setTimeout(() => {
    document.querySelector('[data-behavior=notification]').style.display = 'none'
  }, 11000)
}

///////////////////////////////////////////////////////////////////////
document.getElementById('createFund').onsubmit = async (event) => {
  event.preventDefault()
  const fundID = document.getElementById("create-fund-id").value
  const fundManager = document.getElementById("create-fund-manager").value
  const fundDescription = document.getElementById("create-fund-description").value
  alert(fundID)
  try {
    // make an update call to the smart contract
    await fetchFund(fundID,fundDescription)
    // await fetchFund()
    
  } catch (e) {
    alert(
      'Something went wrong! ' +
      'Maybe you need to sign out and back in? ' +
      'Check your browser console for more info.'+
      e
    )
    throw e
  } finally {
    // re-enable the form, whether the call succeeded or failed
    balanceButton.disabled=false
  }

  // update the counter in the UI
  

  // show notification
  document.querySelector('[data-behavior=notification]').style.display = 'block'
  // remove notification again after css animation completes
  // this allows it to be shown again next time the form is submitted
  setTimeout(() => {
    document.querySelector('[data-behavior=notification]').style.display = 'none'
  }, 11000)
}
/////////////////////////////////////////////////////////////////
document.querySelector('#sign-in-button').onclick = login
document.querySelector('#sign-out-button').onclick = logout

// Display the signed-out-flow container
function signedOutFlow() {
  document.querySelector('#signed-out-flow').style.display = 'block'
}

// Displaying the signed in flow container and fill in account-specific data
function signedInFlow() {
  document.querySelector('#signed-in-flow').style.display = 'block'

  document.querySelectorAll('[data-behavior=account-id]').forEach(el => {
    el.innerText = window.accountId
  })

  // populate links in the notification box
  const accountLink = document.querySelector('[data-behavior=notification] a:nth-of-type(1)')
  accountLink.href = accountLink.href + window.accountId
  accountLink.innerText = '@' + window.accountId
  const contractLink = document.querySelector('[data-behavior=notification] a:nth-of-type(2)')
  contractLink.href = contractLink.href + window.contract.contractId
  contractLink.innerText = '@' + window.contract.contractId

  // update with selected networkId
  accountLink.href = accountLink.href.replace('testnet', networkId)
  contractLink.href = contractLink.href.replace('testnet', networkId)
}

async function fetchFund(id,description) {
   currentFund = await contract.createFund({fundId:id,manager:walletAccount.getAccountId(),description})
   document.querySelectorAll('[data-behavior=fund]').forEach(el => {
     // set divs, spans, etc
     el.innerText = currentFund
     // set input elements
    el.value = currentFund
   })
   if(currentFund) {alert("Fund created successfully")} else {alert("fund creation failed")}
}

async function fetchBalance(owner) {
  alert(owner+"asd")
  currentBalance = await contract.balanceOf({tokenOwner:owner})
  
  document.querySelectorAll('[data-behavior=balance]').forEach(el => {
    // set divs, spans, etc
    el.innerText = currentBalance
    // set input elements
    el.value = currentBalance
  })
}

async function initToken() {
  await contract.init({initialOwner: walletAccount.getAccountId()})
}

// `nearInitPromise` gets called on page load
window.nearInitPromise = initContract()
  .then(() => {
    if (window.walletConnection.isSignedIn()) signedInFlow()
    else signedOutFlow()
  })
  .catch(console.error)