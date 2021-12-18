import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { getApiResponse } from '../../helpers/ApiHelper'
import AuthHelper from '../../helpers/AuthHelper'
import { getAllErrors } from '../../helpers/ErrorHelper'
import Navigation from '../../panels/Navigation'

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            login_name: '',
            password: '',
            redirect: false,
            password_errors: [],
            other_errors: [],
            login_errors: [],
            status_errors: [],
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.loginFilled = this.loginFilled.bind(this)
        this.passwordFilled = this.passwordFilled.bind(this)

    }

    loginFilled(event) {
        this.setState({
            login_name: event.target.value,
        })
    }

    passwordFilled(event) {
        this.setState({
            password: event.target.value,
        })
    }

    onSubmit(event) {
        event.preventDefault()
        console.log("Toro posielma: " + this.state.login_name + " a " + this.state.password)
        getApiResponse('login', 'post', {
            login_name: this.state.login_name,
            password: this.state.password,
        })
            .then((r) => {
                console.log("PRIHLASENY")
                AuthHelper.getInstance().loginUser(r.data.token)
                    .then(() => {
                        this.props.onLogin()
                        this.props.history.push('/')
                    })
            })
            .catch((e) => {
                //console.log("" + e)
                this.setState({
                    other_errors: e.response.data['errors'] || [],
                    password_errors: e.response.data['password'] || [],
                    login_errors: e.response.data['login_name'] || [],
                    status_errors: e.response.data['status'] || [],
                })
            })
    }



    render() {
        return (
            <div>
                <Navigation />
                <div className="container">
                    <div className="card login-card">
                        <div className="row no-gutters">
                            <div className="col-md-6">
                                <div className="card-body sign-card">
                                    <h3 className="login-card-description">Healthcare System</h3>
                                    <hr/>
                                    <form onSubmit={this.onSubmit}>
                                        <h5 className="mb-3 fw-normal">Prihlásenie:</h5>
                                        <input type="text" className="form-control" placeholder="Prihlasovacie meno"
                                            id="login_name"
                                            name="login_name"
                                            value={this.state.login_name}
                                            onChange={this.loginFilled}
                                            required
                                        />
                                        {getAllErrors(this.state.login_errors)}
                                        <input type="password" className="form-control" placeholder="Heslo"
                                            id="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.passwordFilled}
                                            required
                                        />
                                        {getAllErrors(this.state.password_errors)}
                                        {getAllErrors(this.state.other_errors)}
                                        {getAllErrors(this.state.status_errors)}
                                        <button className="w-100 btn btn-lg btn-info" type="submit">Prihlásiť</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)