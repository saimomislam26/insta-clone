import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ProjectContext } from '../../Context/GlobalContext'
import useToken from '../../Hooks/useToken'
import instagram from '../../images/instagram.jpg'
const Login = () => {
    const jwt = useToken()
    const navigate = useNavigate()
    const {getUserData} = useContext(ProjectContext)
    const [user, setUser] = useState({
        email: "", password: ""
    })
    let name, value;
    const eventHandle = (e) => {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
    }
    const loginUser = async (e) => {
        e.preventDefault()
        const {email, password } = user
        const res = await fetch(`${process.env.REACT_APP_URL}/userSignin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+ jwt
            },
            body: JSON.stringify({
                email, password
            }),
            credentials:'include'
        })
        const data = await res.json()
        if (res.status === 400) console.log(data.message)
        else {
            setUser({
                email: "",
                password: ""
            })
            localStorage.setItem("userData",JSON.stringify(data))
            navigate('/')
            getUserData(data)
        }
    }
    return (
        <div className="mt-5 container">

            <div className="login-form">
                <div className="login-content">
                    <div className="row">
                        <div className="col-md-6 login-box">
                            <h1 className="text-center mt-3">Log In</h1>
                            <form method="POST">
                                <div className="form-group mt-5">
                                    <div className="input-group mt-3 px-5">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <span className="fa fa-paper-plane"></span>
                                            </span>  
                                        </div>
                                        <input type="email" className="form-control" name="email" value={user.email} onChange={eventHandle} placeholder="Email Address" required="required" />
                                    </div>


                                    <div className="input-group mt-3 px-5">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <span className="fa fa-lock"></span>
                                            </span>
                                        </div>
                                        <input type="password" className="form-control" name="password" value={user.password} onChange={eventHandle} placeholder="password" required="required" />
                                    </div>

                                    <div className="form-group for-btn py-5">
                                        <button type="submit" onClick={loginUser} className="btn btn-primary btn-lg mt-3">Sign In</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div className="col-md-6">
                            <div className="another">
                                <img src={instagram} alt="instagram" className="img-fluid mt-5" style={{ height: "300px", width: "300px" }} />
                                <h5>Not Registered?</h5>
                                <Link to="/signup" style={{ color: "#BF252B", fontSize: "1.5rem" }}>Signup here</Link>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Login