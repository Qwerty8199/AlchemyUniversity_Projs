import { useEffect, useState } from 'react'
import { getBlockNumber, getBlock, convertToEth } from '../utils/helper'
import { Link } from 'react-router-dom'

const AllTransactions = ({ _transactionsList = [] }) => {
  const [transactionsList, setTransactionsList] = useState([])
  const [next, setNext] = useState(10)

  useEffect( () => {
    const getLastsNTransaction = async () => {
      const lastBlock = await getBlockNumber();
      const lastBlockInfo = await getBlock(lastBlock, true)
      const transactions = lastBlockInfo.transactions.slice(0, 5)
      setTransactionsList(transactions)
    };

    if (_transactionsList.length > 0) setTransactionsList(_transactionsList)
    else {
      getLastsNTransaction()
    }
  }, []);

  const handleMoreData = () => {
    setNext(next + 10);
  };

  if (!transactionsList || transactionsList.length === 0) { return ('Getting data...') }
  if (transactionsList.length > 0) {
    return (
      <div className='flex flex-col'>
        <div className='w-full'>
          <div className='inline-block min-w-full'>
            <div className='overflow-hidden'>
              <table className='min-w-full'>
                <thead className='border-b'>
                  <tr>
                    <th scope='col' className='text-sm font-medium text-gray-900 p-2 pl-0 text-left'>
                      #
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 p-2 pl-0 text-left'>
                      From / To
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 p-2 pl-0 text-left'>
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactionsList?.slice(0,next).map((item, index) => {
                    return (
                      <tr className='border-b' key={index}>
                        <td className='text-sm font-light text-gray-900 p-2 pl-0 whitespace-nowrap'>
                          <Link className='underline' to={`/tx/${item.hash}`} title=''>{item.hash.slice(0, 6)}...</Link>
                        </td>
                        <td className='text-sm font-light text-gray-900 p-2 pl-0 whitespace-nowrap'>
                          From {item.from ? <Link className='underline' to={`/address/${item.from}`} title=''>{item.from.slice(0, 6)}...</Link> : '-'}
                          <br />
                          To {item.to ? <Link className='underline' to={`/address/${item.to}`} title=''>{item.to.slice(0, 6)}...</Link> : '-'}
                        </td>
                        <td className='text-sm font-light text-gray-900 p-2 pl-0 whitespace-nowrap'>
                          {convertToEth(item.value)} ETH
                        </td>
                      </tr>
                    )
                  })}
                  {
                    next < transactionsList?.length && (
                      <button className='mt-5' onClick={handleMoreData}>
                        Load..
                      </button>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AllTransactions;