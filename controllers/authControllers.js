const adminModel = require('../models/adminModel')
const { responseReturn } = require('../utiles/response')
const { createToken } = require('../utiles/tokenCreate')
const bcrypt = require('bcrypt')
class authControllers {
    admin_login = async (req, res) => {
        const { email, password } = req.body
        try {
            const admin = await adminModel.findOne({ email }).select('+password')
            // console.log(admin)
            if (admin) {
                const match = await bcrypt.compare(password, admin.password)
                // console.log(match)
                if (match) {
                    const token = await createToken({
                        id: admin.id,
                        role: admin.role
                    })
                    res.cookie('accessToken', token, {
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    })
                    responseReturn(res, 200, { token, message: 'Giriş işlemi başarılı!' })
                } else {
                    responseReturn(res, 404, { error: 'Girdiğiniz parola doğru değil' })
                }
            } else {
                responseReturn(res, 404, { error: 'E-posta adresi bulunamadı' })
            }
        } catch (error) {
            responseReturn(res, 500, { error: error.message })
        }
    }

    getUser = async (req, res) => {
        const { id, role } = req;

        try {
            if (role === 'admin') {
                const user = await adminModel.findById(id)
                responseReturn(res, 200, { userInfo: user })
            } else {
                console.log('Satıcı Bilgileri')
            }

        } catch (error) {
            console.log(error.message)
        }
    }
}
module.exports = new authControllers()