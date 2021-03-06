import 'regenerator-runtime/runtime'

import { initContract, login, logout } from './utils'

import getConfig from './config'
//import {Fund} from '../assembly/main.ts'
import { context } from 'near-api-js'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

// global variable used throughout
let currentBalance
let currentFund

let obtainedFund



const balanceButton = document.getElementById('balance-button')

//////////////////////////////////////////////////////////////////////////


document.getElementById('balance').onsubmit = async (event) => {
  event.preventDefault()
  const account = document.getElementById("balance-input").value
  alert(account)
  try {
    // make an update call to the smart contract

    await fetchBalance(account)

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


///////////////////////////////////////////////////////////////////////
document.getElementById('obtainFundInfo').onsubmit = async (event) => {
  event.preventDefault()
  const fundID = document.getElementById("fund-info").value
  console.log("hello");
  alert(fundID)
  try {
    // make an update call to the smart contract
    await fetchFund2(fundID)
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


///////////////////////////////////////////////////////////////////////
document.getElementById('donate').onsubmit = async (event) => {
  event.preventDefault()
  const fundID = document.getElementById("donate-fund").value
  const amount = document.getElementById("donate-amount").value
  console.log(fundID);
  alert(fundID)
  try {
    // make an update call to the smart contract
    await donate(fundID,amount)
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
  alert(id)
   currentFund = await contract.createFund({fundId:id,manager:window.accountId,description:description})
  
   if(currentFund) {alert("Fund created successfully")} else {alert("fund creation failed")}
}

// async function fetchFund() {
//   currentFund = await contract.
//   document.querySelectorAll('[data-behavior=fund]').forEach(el => {
//     // set divs, spans, etc
//     el.innerText = currentFund
//     // set input elements
//     el.value = currentFund
//   })
// }


async function fetchBalance(owner) {
  currentBalance = await contract.balanceOf({tokenOwner:owner})
  
  document.querySelectorAll('[data-behavior=balance]').forEach(el => {
    // set divs, spans, etc
    el.innerText = currentBalance
    // set input elements
    el.value = currentBalance
  })
}

async function donate(toFund,amount) {
  await contract.donate({fundId:toFund,tokens:amount})
  alert("funds have been donated successfully")
}

async function fetchFund2(fund_id) {
  alert("funds being obtained")
  obtainedFund = await contract.getFund({fundId:fund_id})
  alert("object obtained")
  let id = obtainedFund.fundId
  let tokens =obtainedFund.tokens
  let manager =obtainedFund.manager
  let description =obtainedFund.description
  document.querySelectorAll('[data-behavior=fund-id]').forEach(el => {
    // set divs, spans, etc
    el.innerText = id
    // set input elements
    el.value = id
  })
  ////////////////////////
  document.querySelectorAll('[data-behavior=fund-tokens]').forEach(el => {
    // set divs, spans, etc
    el.innerText = tokens
    // set input elements
    el.value = tokens
  })
  /////////////////////////
  document.querySelectorAll('[data-behavior=fund-manager]').forEach(el => {
    // set divs, spans, etc
    el.innerText = manager
    // set input elements
    el.value = manager
  })
  ///////////////////////////
  document.querySelectorAll('[data-behavior=fund-description]').forEach(el => {
    // set divs, spans, etc
    el.innerText = description
    // set input elements
    el.value = description
  })
  alert("fund information retrieved successfully");
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