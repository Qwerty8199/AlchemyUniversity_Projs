
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import Address from './pages/Address';
import Home from './pages/Home';
import Transaction from './pages/Transaction';
import TransactionList from './pages/TransactionList';
import Block from './pages/Block';

function App() {

  const [ searchItem, setSearchItem] = useState("")
  const [ searchType, setSearchType] = useState("0")

  const search = async () => {
    console.log(searchItem)
    if(searchType === "0"){
      console.log("Going to Address")
      window.location.replace(`/address/${searchItem}`)
    }else if(searchType === "1"){
      window.location.replace(`/block/${searchItem}`)
    }else{
      window.location.replace(`/transaction/${searchItem}`)
    }
  }

  const handleRadioChange = (e) => {
    setSearchType(e.target.value)
  }

  return(
    <BrowserRouter>
    <div className='w-5/6 mx-auto mt-8'>
      <h1 className='font-bold text-2xl mb-4'><Link to='/' title=''>Ethereum Block Explorer</Link></h1>
      <div className="flex flex-col bg-orange-500 p-5 rounded-md">

        <div className="flex flex-row min-w-full justify-evenly align-top">
        <div class="flex flex-wrap gap-3">
          <label class="cursor-pointer">
            <input type="radio" class="peer sr-only" name="search" value={0} onChange={handleRadioChange}/>
            < div class="w-72 max-w-xl rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold uppercase text-gray-500">Address</p>
              </div>
            </div>
          </label>
          <label class="cursor-pointer">
            <input type="radio" class="peer sr-only" name="search" value={1} onChange={handleRadioChange}/>
            <div class="w-72 max-w-xl rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold uppercase text-gray-500">Block</p>
              </div>
            </div>
          </label>
          <label class="cursor-pointer">
            <input type="radio" class="peer sr-only" name="search" value={2} onChange={handleRadioChange}/>
              <div class="w-72 max-w-xl rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2"> 
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold uppercase text-gray-500">Transaction</p>
              </div>
            </div>
          </label>
        </div>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mt-4 mb-2' htmlFor='searchTerm'>
            Insert a block number, transaction hash or an address...
          </label>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={(e) => setSearchItem(e.target.value)} value={searchItem} id='searchTerm' type='text' placeholder='Insert here...' />
        </div>
        <div className='flex items-center justify-center'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={search}>
            Search
          </button>
        </div>
                
      </div>
      <Routes>
        <Route exact path='/' element={ <Home />} > </Route>
        <Route path='/tx/:hash' element={ <Transaction />} > </Route>
        <Route path='/address/:hash' element={ <Address /> } />
        <Route path='/block/:hash' element={<Block />} />
        <Route path="*" component={NotFound} />
        <Route path='/block/:hash/tx' element={ <TransactionList />} />
      </Routes>
    </div>
  </BrowserRouter>
  )
}


function NotFound() {
  return <>You have landed on a page that doesn't exist</>;
}


export default App;
