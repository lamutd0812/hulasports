const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.signup = async (req, res) => {
    const email = req.body.email;
    const fullname = req.body.fullname;
    const password = req.body.password;
    try {
        const userCheck = await User.findOne({ email: email });
        if (userCheck) {
            res.status(401).json({
                error: 'Tài khoản đã tồn tại!'
            });
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({
                email: email,
                password: hashedPassword,
                fullname: fullname,
                role: "customer"
            });

            const newUser = await user.save();
            res.status(201).json({
                message: 'Đăng ký tài khoản thành công!',
                userId: newUser._id
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err
        });
        console.log(err);
    }
};

exports.signin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(401).json({
                error: 'Tài khoản không tồn tại!'
            });
        }
        loadedUser = user;
        const isEqualPw = await bcrypt.compare(password, loadedUser.password);
        if (!isEqualPw) {
            res.status(401).json({
                error: 'Email hoặc mật khẩu không đúng!'
            });
        }
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            },
            config.jwt_secret,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message: 'Đăng nhập thành công!',
            token: token,
            userId: loadedUser._id.toString()
        })
    } catch (err) {
        res.status(500).json({
            error: err
        });
        console.log(err);
    }
};