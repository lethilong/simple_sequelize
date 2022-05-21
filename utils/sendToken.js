const sendToken = (user, statusCode, res) => {
    const token = user.getToken();

    //options cookies
    const options = {
        expires: new Date (
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 *60 *1000
        ),
        httpOnly: true
    }

    //remove password from output
    user.password = undefined;

    //send res and store access token in cookies
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        data: user,
        token,
    })
}

module.exports = sendToken;