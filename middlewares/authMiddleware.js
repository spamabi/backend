const jwt = require('jsonwebtoken')

module.exports.authMiddleware = async (req, res, next) => {
    const { accessToken } = req.cookies

    if (!accessToken) {
        return res.status(409).json({ error: 'Lütfen önce giriş yapın' })
    } else {
        try {
            const deCodeToken = await jwt.verify(accessToken, process.env.SECRET)
            req.role = deCodeToken.role
            req.id = deCodeToken.id
            next()
        } catch (error) {
            return res.status(409).json({ error: 'Giriş yapın' })
        }
    }
}