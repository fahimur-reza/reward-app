import React, { useEffect, useState } from 'react'
import CustomerTable from './Common/CustomerTable'
import { customerContants } from './constant'
import { getRewardForAmount, getUserData } from './utils'
import './RewardsList.css'

const RewardsList = () => {
  const [customersList, setCustomersList] = useState({})
  const [customersTotalInfo, setCustomersTotalInfo] = useState([])
  const [displayInfo, setDisplayInfo] = useState('')
  const [customerInfo, setCustomerInfo] = useState([])

  useEffect(() => {
      getUserData(setCustomersList,setCustomersTotalInfo);
  }, [])

  const getCustomerInfo = (name) => {
    setDisplayInfo(name)
    if (customersList[name]) {
      const customerInfo = customersList[name].sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
      })
      setCustomerInfo(customerInfo)
    }
  }

  return (
    <div className='reward-program-container'>
      {customersTotalInfo.length > 0 ?
        <div className={customerContants.customerInfo}>
          <CustomerTable 
            name={customerContants.customersList}
            headers={customerContants.customersListTableHeaders}
            rowData={customersTotalInfo}
            getCustomerInfo={getCustomerInfo}
          />
        </div>
        : 
        <p>No Customer Data To Display</p>
      }
      {displayInfo ?
        <div className={customerContants.customerInfo}>
          <CustomerTable 
            name={customerContants.customerInfo}
            headers={customerContants.cutsomersInfoTableHeaders}
            rowData={customerInfo}
            displayInfo={displayInfo}
            getRewardForAmount={getRewardForAmount}
          />
          <button onClick={() => setDisplayInfo('')}>close Info</button>
        </div>
        : 
        <p>{customersTotalInfo.length > 0 ? 'Select any customer to display Customer Info' : ''}</p>
      }
    </div>
  )
}

export default RewardsList