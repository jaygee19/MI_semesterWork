import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AuthHelper from './helpers/AuthHelper';
import Register from './helpers/Register';
import Login from './components/Auth/Login';
import AdminRoute from './components/routes/AdminRoute';
import test from './components/test';
import { UserContext } from './components/Auth/UserContext';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user : null
    }

    this.loadAll = this.loadAll.bind(this)
  }

  async componentDidMount() {

    const user = await AuthHelper.getInstance().loadCurrentUser()

    this.setState({
        user : user
    });
    //await this.loadAll()
  }

  async loadAll() {
    
  }

  render() {
    return (
      <div className="App bg-light" style = {{height:"100%", "minHeight": "100vh"}}>
        <UserContext.Provider value = {{user : this.state.user, setUser : (newUser)=>{ this.setState({ user: newUser })} }}>
        <Router>
          <Switch>
            <Route path="/" exact component={Home}></Route> 
            <AdminRoute path="/register" exact component={Register}/> 
            <AdminRoute path="/test" exact component={test}/> 
            <Route path="/login" exact render={() => <Login onLogin={this.loadAll} />} />
          </Switch>
        </Router>
        </UserContext.Provider>
        <div>
        </div>
      </div>
    );
  }
}


export default App;
