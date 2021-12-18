import React, { Component } from 'react'
import AuthHelper from './AuthHelper'
import { withRouter } from 'react-router-dom'
import Navigation from '../panels/Navigation'
import { getApiResponse } from './ApiHelper'
import { getAllErrors } from './ErrorHelper'


class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            password: '',
            redirect: false,
            password_errors: [],
            name_errors: [],
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.nameFilled = this.nameFilled.bind(this)
        this.passwordFilled = this.passwordFilled.bind(this)

    }

    nameFilled(event) {
        this.setState({
            name: event.target.value,
        })
    }

    passwordFilled(event) {
        this.setState({
            password: event.target.value,
        })
    }

    onSubmit(event) {
        event.preventDefault()

        getApiResponse('register', 'post', {
            name: this.state.name,
            password: this.state.password,
        })
            .then((r) => {
                AuthHelper.getInstance().loginUser(r.data.token)
                    .then(() => {
                            this.props.history.push('/home')
                    })
            })
            .catch((e) => {
                this.setState({
                    password_errors: e.response.data['password'] || [],
                    name_errors: e.response.data['name'] || [],
                })
            })
    }

    render() {
        return (
            <div className="">
                <Navigation />
                <div className="container">
                    <div className="card login-card">
                        <div className="row no-gutters">
                            <div className="col-md-6 logo-card">
                            </div>
                            <div className="col-md-6">
                                <div className="card-body sign-card">
                                    <h3 className="login-card-description">Princípy operačných systémov</h3>
                                    <hr />
                                    <form onSubmit={this.onSubmit}>
                                        <h5 className="mb-3 fw-normal">Registrácia:</h5>
                                        <input type="text" className="form-control" placeholder="name"
                                            id="name"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.nameFilled}
                                            required
                                        />
                                        {getAllErrors(this.state.name_errors)}
                                        <input type="password" className="form-control" placeholder="pwd"
                                            id="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.passwordFilled}
                                            required
                                        />
                                        {getAllErrors(this.state.password_errors)}
                                        <button className="w-100 btn btn-lg btn-info" type="submit">Registrovať</button>
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

export default withRouter(Register)


