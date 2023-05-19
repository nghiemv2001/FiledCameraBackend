const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const nodemailer = require("nodemailer");


require('dotenv').config();
router.post('/signup', (req, res) => {
    console.log('sent by client - ', req.body);
    const { name, email, phone, password, keycode, role, image, birthday } = req.body;
    if (!email || !password || !name || !phone || !keycode || !role) {
        return res.status(422).send({ error: "please add all the dields1" });
    }
    // check email equire
    User.findOne({ email: email })
        .then(async (savedUser) => {
            if (savedUser) {
                return res.status(422).send({ error: "Invalid Credential" });
            }
            const user = new User({
                name,
                email,
                phone,
                password,
                keycode,
                role,
                image,
            })
            try {
                await user.save();
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                res.send({ token });
            }
            catch (err) {
                console.log('db err', err);
                return res.status(422).send({ error: err.message });
            }
        })
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please add email or password" });
    }
    const savedUser = await User.findOne({ email: email });
    if (!savedUser) {
        return res.status(422).json({ error: "Invalid Credentials" });
    }
    try {
        bcrypt.compare(password, savedUser.password, (err, result) => {
            if (result) {
                console.log("Password matched");
                const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
                res.send({ token });
            }
            else {
                console.log('Password does not match');
                return res.status(422).json({ error: "Invalid Credentials" });
            }
        })
    }
    catch (err) {
        console.log(err);
    }
})

// //edit user 
// router.put('/user/update/:id', async (req, res) => {
//     const id = req.params.id;
//     const updates = req.body;
//     const options = { new: true };
//     const user = await User.findByIdAndUpdate(id, updates, options);
//     res.json(user);
// })

// async function mailer(receiveemal) {
//     let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false,
//         auth: {
//             user: "nghiemV2001@gmail.com",
//             pass: "xddzhwnsqbmwvewk",
//         },
//     });
//     let info = await transporter.sendMail({
//         from: 'nghiem2001@gmail.com',
//         to: `${receiveemal}`,
//         subject: "Restaurant App✔",
//         text: `Hello`,
//         html: `https://www.google.com/</b>`,
//     });
//     console.log("Message sent: %s", info.messageId);
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// }

// router.post('/fogot', async (req, res) => {
//     const { email } = req.body;
//     mailer(email);
// })

// // //Find one user 
// // router.get('/user/:email', async (req, res) => {
// //     const email = req.params.email;
// //     User.findOne({ email: email }, function(err, user) {
// //         if (err) return res.status(500).send(err);
// //         if (!user) return res.status(404).send("User not found.");
// //         res.send(user);
// //     });
// // })


router.get('/user/:email', async (req, res, next) => {
    const email = req.params.email
    User.findOne({ email: email })
        .exec()
        .then((user) => {
            if (!user) {
                // Nếu không tìm thấy user với email đã cho
                return res.status(404).json({
                    message: 'User not found',
                });
            }
            // Trả về user tìm thấy
            res.status(200).json(user);
        })
        .catch((err) => {
            // Xử lý lỗi nếu có
            console.error(err);
            res.status(500).json({
                error: err,
            });
        });
});

// //delete category 
// router.delete('/user/delete/:id', async (req, res) => {
//     const id = req.params.id;
//     const user = await User.findByIdAndDelete(id);
//     res.json(user);
//   });


//   // get list product
// router.get('/users/', async(req, res)=>{
//     const user = await User.find().select();
//     if(!user){
//         res.status(500).json({success:false});
//     }
//     res.send(user);
// })
module.exports = router;