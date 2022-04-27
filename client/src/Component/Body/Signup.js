import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import signup from '../../images/signupImage.jpg'
const Signup = () => {

  const [user, setUser] = useState({
    name: "", email: "", password: "", cpassword: ""
  })
  let name, value;
  const eventHandle = (e) => {
    name = e.target.name
    value = e.target.value
    setUser({ ...user, [name]: value })
  }

  const signUp = async(e)=>{
    console.log("post");
    e.preventDefault()
    const { name, email, password, cpassword } = user
    const res = await fetch(`${process.env.REACT_APP_URL}/userSignup`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name, email, password, cpassword
      })
    })
    console.log(res);
    const data =await res.json()
    if (res.status===400) console.log(data.message)
    else{
      setUser({
        name:"",
        email:"",
        password:"",
        cpassword:""
      })
      console.log(data);
    }
  }
  return (
    <div className="mt-5 container">
      <div className="signup-form">
        <div className="signup-content">
          <div className="row">
            <div className="col-md-6 login-box">
              <h1 className="text-center">Sign Up</h1>
              <form method="POST" >
                <div className="form-group mt-5">
                  <div className="input-group px-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <span className="fa fa-user"></span>
                      </span>
                    </div>
                    <input type="text" className="form-control" name="name"
                      value={user.name} onChange={eventHandle} placeholder="Username" required="required" />
                  </div>

                  <div className="input-group mt-3 px-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <span className="fa fa-paper-plane"></span>
                      </span>
                    </div>
                    <input type="email" className="form-control" name="email"
                      value={user.email} onChange={eventHandle} placeholder="Email Address" required="required" />
                  </div>

                  <div className="input-group mt-3 px-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <span className="fa fa-lock"></span>
                      </span>
                    </div>
                    <input type="password" className="form-control" name="password"
                      value={user.password} onChange={eventHandle} placeholder="password" required="required" />
                  </div>
                  <div className="input-group mt-3 px-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <span className="fa fa-lock"></span>
                      </span>
                    </div>
                    <input type="password" className="form-control" name="cpassword"
                      value={user.cpassword} onChange={eventHandle} placeholder="confirm password" required="required" />
                  </div>
                  <div className="form-group for-btn py-3">
                    <input type="submit" name="signup" className="btn btn-primary btn-lg mt-3" value="register" onClick={signUp} />
                  </div>
                </div>
              </form>

            </div>
            <div className="col-md-6">
              <div className="another">
                <img src={signup} alt="signup" className="img-fluid mt-5" />
                <h5>Already Have An account?</h5>
                <Link to="/login" style={{ color: "#BF252B", fontSize: "1.5rem" }}>Login here</Link>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Signup