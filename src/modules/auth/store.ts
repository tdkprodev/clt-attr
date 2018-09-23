import { IAsyncValue } from '@store/async-value';
import { action, autorun, computed, observable } from 'mobx';
import { Logger } from '@shared/logger';

class AuthStore {
    @observable login: IAsyncValue = { value: '', loading: false };
    @observable signup: IAsyncValue = { value: '', loading: false };

    @computed 
    public get loading() {
        return (this.login.loading || this.signup.loading);
    }

    @action
    public setLogin = (login: AuthStore['login']) =>  {
        this.login = login;
    }

    @action
    public setSignup = (signup: AuthStore['signup']) => {
        this.signup = signup;
    }

    @action 
    public sendLogin = async (email: string, password: string) => {
        this.setLogin({ error: '', loading: true, value: '' });
        
    }

    @action
    public sendSignup = async (email: string, password: string) => {
        this.setSignup({ error: '', loading: true, value: '' });
        
    }
}

export const authStore = new AuthStore();