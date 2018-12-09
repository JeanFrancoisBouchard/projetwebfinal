import React from 'react';
import { withRouter } from 'react-router-dom';
import * as ROLES from '../../constants/roles';
import { withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import AuthUserContext from './context';


const withAuthorization = condition => Component => {
    class withAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if(authUser) {
                        this.props.firebase
                            .user(authUser.uid)
                            .once('value')
                            .then(snapshot => {
                                const dbUser = snapshot.val();
                                
                                authUser = {
                                    uid: authUser.uid,
                                    email: authUser.email,
                                    ...dbUser,
                                };

                                if(!condition(authUser)) {
                                    this.props.history.push(ROUTES.SIGN_IN);
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