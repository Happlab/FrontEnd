import React from 'react';
import user_services from "../services/UserServices";

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
    setToken(newToken) {
        user_services.setToken(newToken);
        this.token = user_services.getDataToken(newToken);
    }

    render() {
        return(
            <TokenContext.Provider value={{ token: this.token, setToken: this.setToken }}>
                {this.state.children}
            </TokenContext.Provider>
        )
    }
}
