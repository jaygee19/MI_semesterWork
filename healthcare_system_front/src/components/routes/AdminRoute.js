import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthHelper from '../../helpers/AuthHelper'
import { UserContext } from '../Auth/UserContext'


const AdminRoute = ({ component: Component, ...rest }) => (
    <UserContext.Consumer>{(userContext) => <>
        <Route
            {...rest}
            render={(props) => {
                if (userContext.user?.isAdmin === false) {
                    return (
                        <Redirect
                            to={{ pathname: '/login', state: { from: props.location } }}
                        />
                    )
                }
                return <Component {...props} {...rest} />
            }}
        />
        </>
    }
    </UserContext.Consumer>
)

export default AdminRoute