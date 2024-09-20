import axios from "axios"
const handleLogin = (email, password) => {
    return axios.post('/api/login')
}
module.exports = {
    handleLogin
}