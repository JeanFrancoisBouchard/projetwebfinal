import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import AuthUserContext from './context';


const withAuthorization = condition => Component => {
    class withAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (authUser) {
                        this.props.firebase
                            .user(authUser.uid)
                            .once('value')
                            .then(snapshot => {
                            const dbUser = snapshot.val();


                            // merge auth and db user
                            authUser = {
                                uid: authUser.uid,
                                email: authUser.email,
                                roles: authUser.roles,
                                ...dbUser,
                            };
            
                            if (!condition(authUser)) {
                                this.props.history.push(ROUTES.HOME);
                            }
                        });
                    } else {
                    this.props.history.push(ROUTES.SIGN_IN);
                    }
                },
            );
        }

        componentWillUnmout() {
            this.listener();
        }

        render() {
            return(
                <AuthUserContext.Consumer>
                    {authUser =>
                        condition(authUser) ? <Component {...this.props} /> : null
                    }
                </AuthUserContext.Consumer>
            );
        }
    }

    return withRouter(withFirebase(withAuthorization));
};

export default withAuthorization;