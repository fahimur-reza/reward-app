import React from 'react';
import PropTypes from 'prop-types';
import { customerContants } from '../constant'


const CustomerTable = ({
    name,
    headers,
    rowData,
    getCustomerInfo,
    getRewardForAmount,
    displayInfo,
}) => {
    return (
        <div>
            <h2>{name === customerContants.customerInfo && displayInfo} {name}</h2>
            {rowData.length ? 
            <div className='table-box'>
                <table className="customers-list-table">
                    <thead>
                        <tr>
                            {headers.map((header, i) => <th key={`${i}-${header}`}>{header}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {rowData.map((row, i) => <tr key={`${i}-${row.customerName}`}>
                            {Object.keys(row).map((value, ind) => <td key={ind}>{row[value]}</td>)}
                            {name === customerContants.customerInfo && <td>{getRewardForAmount(row.amount)}</td>}
                            {name === customerContants.customersList && <td><button onClick={() => getCustomerInfo(row.customerName)}>Get Info</button></td>}
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
                : <></>}
        </div>
    )
}

CustomerTable.propTypes = {
    name: PropTypes.string.isRequired,
    headers: PropTypes.array.isRequired,
    rowData: PropTypes.array.isRequired,
    getCustomerInfo: PropTypes.func,
    getRewardForAmount: PropTypes.func,
    displayInfo: PropTypes.string
}

export default CustomerTable