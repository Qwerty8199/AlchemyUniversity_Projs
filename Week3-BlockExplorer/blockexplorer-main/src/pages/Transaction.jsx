import { useEffect, useState } from 'react'
import { getTransaction, convertToEth } from '../utils/helper'
import { Link, useParams } from 'react-router-dom'

const Transaction = () => {
  const { hash } = useParams()
  const [transaction, setTransaction] = useState({})

  useEffect(() => {
    const getResults = async() => {
      const result = await getTransaction(hash)
      result.value = convertToEth(result.value)
      setTransaction(result)
    }
    getResults()
  }, [hash]);

  return (
<div className='lg:flex lg:flex-row lg:space-x-4 mt-2'>
      <div className='w-4/5 bg-gray-400 shadow-md rounded p-8 mb-1'>
        <p className='block text-sm mb-4 pb-2 border-b-2'><strong className='text-gray-700'>Info transaction</strong></p>
        <p className='block text-sm mb-4 text-gray-700'><strong>Hash:</strong> {transaction.hash} </p>
        <p className='block text-sm mb-4 text-gray-700'><strong>Block number:</strong> {transaction.blockNumber} </p>
        <p className='block text-sm mb-4 text-gray-700'><strong>From:</strong> {transaction.from} </p>
        <p className='block text-sm mb-4 text-gray-700'><strong>To:</strong> {transaction.to} </p>
        <p className='block text-sm mb-4 text-gray-700'><strong>Nonce:</strong> {transaction.nonce} </p>
        <p className='block text-sm mb-4 text-gray-700'><strong>Value:</strong> {transaction.value} ETH</p>
      </div>
    </div>
  )
}

export default Transaction