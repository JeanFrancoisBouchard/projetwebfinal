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
                    if (!condition(authUser)) {
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