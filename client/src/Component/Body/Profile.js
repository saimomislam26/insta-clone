import React, { useContext, useEffect, useState } from 'react'
import { ProjectContext } from '../../Context/GlobalContext'
import useToken from '../../Hooks/useToken'
const Profile = () => {
  const [data, setData] = useState([])
  const {authenticateUser} = useContext(ProjectContext)
  console.log(authenticateUser.name);
  const jwt = useToken()
  const getProfileData = async () => {
    const res = await fetch(`${process.env.REACT_APP_URL}/mypost`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + jwt
      }
    })
    const temp = await res.json()
    if (res.status === 200 && temp) {
      setData(temp)
      // console.log(data && data);
    }
    else console.log(temp.message);
  }

  useEffect(() => {
    getProfileData()
  }, [])

  return (
    <div className='profile-full'>
      <div className='profile-intro'>
        <div className='profile-img-div'>
          <img className='profile-img' src="https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png" alt="avatar" />
        </div>
        <div>
          <h3 className='profile-name'> {authenticateUser.name}</h3>
          <div className='profile-info'>
            <h5>40 posts</h5>
            <h5>40 Followers</h5>
            <h5>40 Following</h5>
          </div>
        </div>
      </div>
      <div className='gallery'>
        {
          data.map((val) => {
            
            return(
            <img className='item' src={val.photo} alt='images' key={val._id} />
            )
          })
        }
      </div>
    </div>

  )
}

export default Profile