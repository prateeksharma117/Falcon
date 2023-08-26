import { useState, useEffect, useId } from 'react'
import {  AiOutlineLogout } from 'react-icons/ai'
import { useParams, useNavigate } from 'react-router-dom'
import { GoogleLogout } from 'react-google-login'
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../Utils/Data'
import { client } from '../Client'
import MasonryLayout from './MasonaryLayout'
import Spinner from "./Spinner";

const Profile = () => {

  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  const [text, setText] = useState('Created')
  const [loading, setLoading] = useState(true)
  const [activeBtn, setActiveBtn] = useState('Created')
  const navigate = useNavigate()
  const { userId } = useParams()
  console.log('useParams:', userId)



  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId)
      client.fetch(createdPinsQuery)
        .then((data) => {
          setPins(data)
        })
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId)
      client.fetch(savedPinsQuery)
        .then((data) => {
          setPins(data)
        })
    }
  }, [text, userId])

  useEffect(() => {
    const query = userQuery(userId)
    client.fetch(query)
      .then((data) => {
        setUser(data[0])
        setLoading(false)
      })
  }, [userId])

  
  if (loading) {
    return <Spinner message="Loading profile..." />
  }


  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology,models,monocrome,animals,city'
  const activeBtnStyles = 'bg-red-500 mx-5 my-8 text-white font-bold p-2 rounded-full w-20 outline-none'
  const notActiveBtnStyles = 'bg-gray-200 mx-5 my-8 text-black font-bold p-2 rounded-full w-20 outline-none'



  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img src={randomImage} alt="banner-picture" className='w-full h-370 2xl:510 shadow-lg object-cover' />
            <img src={user?.image} alt="user-pic" className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover' />
            <h1 className='tfont-bold text-3xl text-center mt-3'>{user?.userName}</h1>
            <div className='absolute top-0 z-1 right-0 p-2'>
              {userId === user?._id && (
                <GoogleLogout
                  clientId={
                    "768073421137-vmiksmplbput64ojjnmhibt45jcqr44v.apps.googleusercontent.com"
                  }
                  render={(renderProps) => (
                    <button
                      type="button"
                      className="bg-red-500 text-white gap-2 flex justify-center items-center p-2 rounded-full cursor-pointer outline-none shadow-md"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <AiOutlineLogout
                        size={30}
                      />{" "}
                      Logout
                    </button>
                  )}
                  onLogoutSuccess={logout}
                  cookiePolicy="single_host_origin"
                />
              )}
            </div>
          </div>
          <div className='text-center mb-7'>
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent)
                setActiveBtn('Created')
              }}
              className={`${activeBtn === 'Created' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Created
            </button>

            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent)
                setActiveBtn('Saved')
              }}
              className={`${activeBtn === 'Saved' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Saved
            </button>

            {pins?.length?(
               <div className='px-2'><MasonryLayout pins={pins}/></div>
            ):(
              <div className='flex justify-center font-bold items-center w-full text-xl mt-10'>
                No Pins Found!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
