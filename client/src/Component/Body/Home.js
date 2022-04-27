import React,{useEffect,useState} from 'react'
import useToken from '../../Hooks/useToken'

const Home = () => {
  const [data,setData] = useState([])
  const [toggleLike,setToggleLike] =useState(false)
  const jwt = useToken()

  //Set Like and Unlike
  const setLike = () =>{
      setToggleLike(!toggleLike)
      console.log(toggleLike);
  }
  //Getting All Data To Show
  const getData =async()=>{
    const res = await fetch(`${process.env.REACT_APP_URL}/getData?dataInfo=all`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization":"Bearer "+ jwt
      }
  })
  const temp = await res.json()
  if(res.status===200&&temp){
    setData(temp)
    // console.log(data);
  }
  else console.log(temp.message);
  }
  useEffect(()=>{
    getData()
  },[])
  useEffect(()=>{
      if(toggleLike) console.log("Toggle Liked");
      else console.log("Toggle Unliked");
  },[toggleLike])
  // console.log(data);
  return (
    <div className='home'>
         {
          data.map((val)=>{
            return (
              <div className="card home-card" key={val._id}>
              <div className="card-body">
                <h5>{val.postedBy.name}</h5>
              </div>
              <img src={val.photo} className="card-img-top" alt="post" style={{ width: "600px" }} />
              <div className="card-body">
                <i className="fa-solid fa fa-heart" style={{color:"black"}} onClick={setLike}></i>
                <h5>{val.likes.length} Likes</h5>
                <h5 className="card-title">{val.title}</h5>
                <p className="card-text">{val.caption}</p>
                <input type="text" placeholder='add a comment' />
              </div>
            </div>
            )
          })
        }
    </div>
  )
}

export default Home