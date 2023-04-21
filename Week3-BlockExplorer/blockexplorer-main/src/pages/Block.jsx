import { useEffect, useState } from 'react'
import { getBlock, convertToEth } from '../utils/helper'
import { Link, useParams } from 'react-router-dom'

const Block = () => {
  const { hash } = useParams()
  const [block, setBlock] = useState({})

  useEffect(() => {
    async function getResults(){
      const result = await getBlock(hash.startsWith('0x') ? hash : parseInt(hash), true)
      result.transactions = result.transactions.length
      result.gasUsed = result.gasUsed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      result.gasLimit = result.gasLimit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      result.baseFeePerGas = convertToEth(result.baseFeePerGas)
      setBlock(result)
    }
    getResults();
    }, [hash]);


  return (
    <div className='lg:flex lg:flex-row lg:space-x-4 mt-5'>
      <div className='w-3/5 bg-gray-400 shadow-lg rounded p-8 mb-4'>
      <p className='block text-sm mb-4 pb-2 border-b-2'><strong className='text-gray-700'>Info block</strong></p>
        <p className='block text-sm mb-4 text-gray-700'><strong>Hash:</strong> {block.hash}</p>
        <p className='block text-sm mb-4 text-gray-700'><strong>Parent Hash:</strong> <Link className='underline' to={`/block/${block.parentHash}`}>{block.parentHash}</Link></p>
        <p className='block text-sm mb-4 text-gray-700'><strong>Number:</strong> {block.number}</p>
        <p className='block text-sm mb-4 text-gray-700'><strong>Timestamp:</strong> {new Date(block.timestamp * 1000).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })}</p>
        <p className='block text-sm mb-4 text-gray-700'><strong>Transactions:</strong> {block.transactions} <Link to={`/block/${block.hash}/tx`} className='underline cursor-pointer'>Show transaction list</Link></p>
        <p className='block text-sm mb-4 text-gray-700'><strong>Gas used:</strong> {block.gasUsed} </p>
        <p className='block text-sm mb-4 text-gray-700'><strong>Gas limit:</strong> {block.gasLimit} </p>
        <p className='block text-sm mb-4 text-gray-700'><strong>Base Fee per Gas:</strong> {block.baseFeePerGas} ETH</p>
      </div>
    </div>
  )
}

export default Block