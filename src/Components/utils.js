export const getRewardForAmount = (amount) => {
    if (amount >= 50 && amount < 100) {
      return amount - 50;
    } else if (amount > 100) {
      return (2 * (amount - 100) + 50);
    }
    return 0;
  }

export const getApiData = () => {
    const response = fetch('CustomersList.json').then(res => res.json()).then(data => data).catch(err => err)
    return response
}

export const getUserData = async (setCustomersList, setCustomersTotalInfo) => {
    const userResponseData = await getApiData()
    console.log('29::', userResponseData)
    setCustomersList(userResponseData)
    if (userResponseData) {
      const usersData = Object.keys(userResponseData).reduce((acc, cur) => {
        const userData = {};
        let totalAmount = 0
        let totalTransactions = 0
        let totalReward = 0
        userResponseData[cur].forEach(val => {
          totalAmount = totalAmount + val.amount
          totalTransactions = totalTransactions + 1
          totalReward = totalReward + getRewardForAmount(totalAmount)
        })
        userData['customerName'] = cur
        userData['totalAmount'] = totalAmount
        userData['totalTransactions'] = totalTransactions
        userData['totalReward'] = totalReward
        acc.push(userData)
        return acc
      }, [])
      setCustomersTotalInfo(usersData)
    return{
        userResponseData,
        usersData
    }
    }else{
        return userResponseData
    }
}