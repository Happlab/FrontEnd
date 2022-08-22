import React from 'react';
import user_services from '../components/services/UserServices';

export const TokenContext = React.createContext();

export const TokenContextConsumer = TokenContext.Consumer;

export class TokenContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            children: props.children
        }
    }

    token = user_services.getDataToken(user_services.getToken());
    render() {
        return(
            <TokenContext.Provider value={{ token: this.token, setToken: user_services.setToken }}>
                {this.state.children}
            </TokenContext.Provider>
        )
    }
}
