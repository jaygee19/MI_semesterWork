import axios from 'axios'
import { API_URL } from './ApiHelper'
import { getApiResponse } from './ApiHelper'


class AuthHelper {
  static getInstance() {
    if (AuthHelper._instance == null) {
      console.log("Vytvaram Janacek")
      AuthHelper._instance = new AuthHelper()
      AuthHelper._instance.loadCurrentUser()
    }
    return AuthHelper._instance
  }

  async loadCurrentUser() {
    const token = localStorage.getItem('token')
    this.currentUser = await this.getUserFromToken(token)
    console.log("Toto vraciam:" , this.currentUser)
    return this.currentUser
  }

  async loginUser(token) {
    localStorage.setItem('token', token)
    this.currentUser = await this.getUserFromToken(token)
  }

  async getUserFromToken(token) {
    if (token == null) 
    {
        return null
    }

    const res = await axios.get('http://localhost:8000/api/user', {
      headers: { Authorization: 'Bearer ' + token },
    })

    if ( res.data.status === 'Authorization Token not found' || res.data.user === null)
    {
        return null
    }
    
    return {
      token: token,
      user_id: res.data.user.user_id,
      isAdmin : res.data.user.level_access === 'A',
    }
  }

  getCurrentUser() {
    return this.currentUser
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.currentUser = null
  }

  isUserLoggedIn() {
    console.log("CURRENT USER:" , this.currentUser)

    if (this.currentUser != null) 
    {
        return true;
    } else {
        return false;
    }
  }

  isUserAdmin() {
    if (this.currentUser == null) 
    {
        return false
    }
    return this.currentUser.isStudent
  }

  getUserID() {
    if (this.currentUser == null) 
    {
        return null
    }
    return this.currentUser.user_id
  }

  getUserName() {
    if (this.currentUser == null) 
    {
        return null
    }
    return this.currentUser.name + " " + this.currentUser.surname
  }

  getUserToken() {
    if (this.currentUser == null) 
    {
        return null
    }
    return this.currentUser.api_token
  }

  getAuthHeaders() {
    return { Authorization: 'Bearer ' + this.currentUser.token }
  }
}

export default AuthHelper