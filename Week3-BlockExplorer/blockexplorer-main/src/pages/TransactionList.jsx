import { getBlock } from "../utils/helper";
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AllTransactions from "../Components/AllTransactions";


const TransactionList = () => {
  const { hash } = useParams()
  const [transactionList, setTransactionList] = useState({})

  useEffect(() => {
    const getResults = async () => {
      const result = await getBlock(hash, true);
      setTransactionList(result.transactions)
      console.log(result)
    }
    getResults()
  }, [hash]);

  return (
    <div className='lg:flex lg:flex-row lg:space-x-4 mt-3'>
      <div className='w-4/5 bg-gray-400 shadow-md rounded p-8 mb-4'>
        <p className='block text-sm mb-4 pb-2 border-b-2'><strong className='text-gray-700'>List transactions</strong></p>
        {transactionList.length > 0 ? <AllTransactions _transactionsList={transactionList} /> : 'Getting data...'}
      </div>
    </div>
  )
}

export default TransactionList