const express = require('express');
const _ = require('lodash');
const router = express.Router();
const app = express();
const { Post } = require('../model/post')
const auth = require('../Middleware/authorization')

const postData = async (req, res) => {
    const { title, caption, pic } = req.body
    console.log(title, caption, pic)
    if (!title || !caption || !pic) return res.status(400).json({ message: "Fill All the fields" })

    req.rootUser.password = undefined
    req.rootUser.cpassword = undefined

    const post = new Post({
        title,
        caption,
        photo: pic,
        postedBy: req.rootUser
    })
    await post.save()
    return res.status(200).json({ message: "Status Posted Succesfully" })
}

//Getting uploaded data by user
//if query is all showw all data
//if query is indivisual show only signed in user
const getData = async (req, res) => {
    const dataInfo = req.query.dataInfo
    if (dataInfo === 'all') {
        const posts = await Post.find().populate('postedBy', 'name _id').sort("-createdAt")
        return res.status(200).send(posts)
    }

    else if (dataInfo === "individual") {
        const posts = await Post.find({ postedBy: req.userId }).populate('postedBy', 'name _id')
        return res.status(200).send(posts)
    }
    else {
        return res.status(400).json({ message: "Wrong Query" })
    }
}

const getMyPost = async (req, res) => {
    const myProfile = await Post.find({ postedBy: req.rootUser._id }).populate("postedBy", "_id name")
    if (!myProfile) return res.status(400).json({ message: "No Such User" })
    return res.status(200).send(myProfile)
}
const putLike = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.rootUser._id, }
    },
        {
            new: true
        }
    ).exec((err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        else{
            res.status(200).send(post)
        }
    })

}

const putUnLike = async (req, res) => {
    const post = await Post.findByIdAndUpdate(re.body.postId, {
        $pull: { likes: req.rootUser._id, }
    },
        {
            new: true
        }
    ).exec((err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        else{
            res.status(200).send(post)
        }
    })

}
router.route('/postdata')
    .post(auth, postData)
router.route('/getData')
    .get(auth, getData)
router.route('/mypost')
    .get(auth, getMyPost)
router.route('/like')
    .put(auth, putLike)
router.route('/unlike')
    .put(auth, putUnLike)
module.exports = router
