import 'regenerator-runtime/runtime'

import { initContract, login, logout } from './utils'

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

// global variable used throughout
let currentBalance
let currentFund

const balanceButton = document.getElementById('balance-button')

//////////////////////////////////////////////////////////////////////////


document.getElementById('balance').onsubmit = async (event) => {
  event.preventDefault()
  const { fieldset, balance } = event.target.elements
  balanceButton.disabled=true
  try {
    // make an update call to the smart contract
    await fetchBalance(balance.value)
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
  // document.querySelector('[data-behavior=notification]').style.display = 'block'
  // remove notification again after css animation completes
  // this allows it to be shown again next time the form is submitted
  // setTimeout(() => {
  //   document.querySelector('[data-behavior=notification]').style.display = 'none'
  // }, 11000)
}

document.getElementById('fund').onsubmit = async (event) => {
  event.preventDefault()
  const { fieldset, fund } = event.target.elements
  balanceButton.disabled=true
  try {
    // make an update call to the smart contract
    await fetchFund(fund.value)
    // await fetchFund()
    
  } catch (e) {
    alert("Fund does not exist!")
    
  } finally {
    // re-enable the form, whether the call succeeded or failed
    balanceButton.disabled=false
  }
}

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

  // // populate links in the notification box
  // const accountLink = document.querySelector('[data-behavior=notification] a:nth-of-type(1)')
  // accountLink.href = accountLink.href + window.accountId
  // accountLink.innerText = '@' + window.accountId
  // const contractLink = document.querySelector('[data-behavior=notification] a:nth-of-type(2)')
  // contractLink.href = contractLink.href + window.contract.contractId
  // contractLink.innerText = '@' + window.contract.contractId

  // update with selected networkId
  // accountLink.href = accountLink.href.replace('testnet', networkId)
  // contractLink.href = contractLink.href.replace('testnet', networkId)
}

async function fetchFund(fundId) {
  currentFund = await contract.getFund({fundId: fundId})
  document.querySelectorAll('[data-behavior=fundId]').forEach(el => {
    // set divs, spans, etc
    el.innerText = currentFund.fundId
    // set input elements
    el.value = currentFund.fundId
  })
  document.querySelectorAll('[data-behavior=fundTokens]').forEach(el => {
    el.innerText = currentFund.tokens
    el.value = currentFund.tokens
  })
  document.querySelectorAll('[data-behavior=fundManager]').forEach(el => {
    el.innerText = currentFund.manager
    el.value = currentFund.manager
  })
  document.querySelectorAll('[data-behavior=fundDescription]').forEach(el => {
    el.innerText = currentFund.description
    el.value = currentFund.description
  })
}

async function fetchBalance(owner) {
  currentBalance = await contract.balanceOf({tokenOwner:owner})
  // alert(owner)
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
