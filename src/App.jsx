import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import data from './components/celebrities.json'
import Accordion from './components/Accordion'


const App = () => {
  const data2 = data.slice(0)
  const [searchQuery, setSearchQuery] = useState('');
  const [newData, setNewData] = useState(data2)

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  }


  // console.log(data)
  return (
    <div className="">
      <div className="lg:w-[700px] md:w-[700px] mx-auto">
        <h2 className='text-3xl font-semibold'>List View</h2>
        <div className="flex items-center border px-2 g-5 rounded-xl">
          <span className="text-2xl font-bold "><IoIosSearch /></span>
          <input type="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by name" className='p-2 w-full focus:outline-none border-none outline-none' />
        </div>
      </div>
      <div className="">
        <Accordion data={newData} searchQuery={searchQuery} setNewData={setNewData} />
      </div>
    </div>
  )
}

export default App