import decode from 'jwt-decode';

export default class AuthService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain || 'http://localhost:8080'; // API server domain
    this.fetch = this.fetch.bind(this); // React binding stuff
    this.login = this.login.bind(this);
  }

  login(emailAddress, password) {
    // Get a token from api server using the fetch api
    return this.fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ emailAddress, password }),
    }).then((data) => {
      this.setToken(data.token); // Setting the token in localStorage
      return Promise.resolve(data);
    });
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // Getting token from localstorage
    if (token == null) {
      return false;
    }
    return !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return true;
    }
  }

  setToken(idToken) {
    // Saves user token to localStorage
    sessionStorage.setItem('token', idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    let token = sessionStorage.getItem('token');
    if (token != null) {
      token = token.replace(/"/g, '');
      return token;
    }
    return null;
  }

  logout() {
    // Clear user token and profile data from localStorage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('name');
    window.location.reload();
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }


  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return fetch(url, {
      headers,
      ...options,
    })
      .then(res => this._checkStatus(res))
      .then(response => response.json());
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response;
    } else {
      const error = new Error();
      error.status = response.status;
      throw error;
    }
  }
}
