beforeAll(async function () {
  // NOTE: nearlib and nearConfig are made available by near-cli/test_environment
  const near = await nearlib.connect(nearConfig)
  window.accountId = nearConfig.contractName
  window.contract = await near.loadContract(nearConfig.contractName, {
    viewMethods: ['getGreeting','getCounter','balanceOf'],
    changeMethods: ['setGreeting','incrementCounter','createFund'],
    sender: window.accountId
  })
})

test('getGreeting', async () => {
  const message = await window.contract.getGreeting({ accountId: window.accountId })
  expect(message).toEqual('Hello')
})
