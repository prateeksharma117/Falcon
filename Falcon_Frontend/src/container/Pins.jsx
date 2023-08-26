import {useState} from 'react'
import {Routes,Route} from 'react-router-dom'
import {Navbar,Feed,PinDetails,CreatePin,Search} from '../components'


const Pins = ({user}) => {

  const [searchTerm, setSearchTerm] = useState("")


  return (
    <div className='px-2 md:px-5'>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user}/>
      <div className='h-full'>
        <Routes>
          <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}/>
          <Route path='/' element={<Feed/>}/>
          <Route path='/category/:categoryId' element={<Feed/>}/>
          <Route path='/pin-detail/:pinId' element={<PinDetails user={user}/>}/>
          <Route path='/create-pin' element={<CreatePin user={user}/>}/>
        </Routes>
      </div> 
    </div>
  )
}

export default Pins
