
import { useEffect, useState } from 'react'
import { getBalance, convertToEth } from '../utils/helper'
import { useParams } from 'react-router-dom'

const Address = () => {
  const { hash } = useParams()
  const [account, setAccount] = useState({})

  useEffect( () => {
    const getResults = async () => {
      const result = await getBalance(hash)
      console.log(result)
      setAccount({ hash: hash, balance: convertToEth(result) })
    }
    getResults();
  }, [hash])


  return (
    <div className='lg:flex lg:flex-row lg:space-x-4 mt-5'>
      <div className='w-2/5 bg-gray-400 shadow-lg rounded p-8 mb-4'>
        <p className='block text-sm mb-4 pb-2 border-b-2'><strong className='text-gray-700'>Info account</strong></p>
        <p className='block text-sm mb-4 text-gray-700'><strong>Hash:</strong> {account.hash}</p>
        <p className='block text-sm mb-4 text-gray-700'><strong>Balance:</strong> {account.balance} ETH</p>
      </div>
    </div>
  )
}


export default Address