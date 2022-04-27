import React, { useState,useEffect} from 'react'
import Cookies from 'js-cookie'
const Createpost = () => {
    const [post, setPost] = useState({
        title: "", body: ""
    })
    const jwt = Cookies.get("jwtooken")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    let name, value;
    //handling title and body input field
    const postState = (e) => {
        name = e.target.name
        value = e.target.value
        setPost({ ...post, [name]: value })
    }
    const uploadImage = (e) => {
        // console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    }
    useEffect(()=>{
        if(url){
            const { title, body } = post
                console.log(url);
                fetch(`${process.env.REACT_APP_URL}/postdata`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization":"Bearer "+ jwt
                    },
                    body: JSON.stringify({
                        title,
                        caption: body,
                        pic: url
                    })
                })
                    .then((res) => res.json())
                    .then(data => console.log(data))
                    .catch(err => { console.log(err); })
        }
    },[url])
    const postDetails = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "saimomcloud")
        fetch("https://api.cloudinary.com/v1_1/saimomcloud/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)
                // console.log(data)
            })
            .catch(err => {
                console.log(err);
            })
              

    }

    return (
        <div className='create-post-card'>
            <div className="input-group" >
                <span className="input-group-text" id="addon-wrapping">Title</span>
                <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" name="title" value={post.title} onChange={postState} />
            </div>
            <div className="input-group" >
                <span className="input-group-text" id="addon-wrapping">Body</span>
                <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" name="body" value={post.body} onChange={postState} />
            </div>
            <div className="input-group" >
                <input type="file" accept="image/*" name="image" id="file"
                    style={{ display: 'none' }} onChange={uploadImage} />
                <label htmlFor="file" >
                    <i className="material-icons" style={{ marginRight: "5px" }}>
                        add_photo_alternate
                    </i>
                    Upload Image</label>
            </div>
            <div>
                <button className='btn btn-primary' onClick={postDetails}>Submit</button>
            </div>
        </div>
    )
}

export default Createpost