import _ from 'lodash';

import client from '@/services/api'
import router from '@/router'


const state = {
    user: localStorage.getItem('user') || {},
    apiKey: localStorage.getItem('apiKey') || null,
    apiRefreshKey: localStorage.getItem('apiRefreshKey') || null,
};

const getters = {
    getUser: state => state.user,
    getUserId: state => _.get(state.user, 'id', null),
    getUserIsLoggedIn: state => !_.isEmpty(state.apiKey),
    getUserMindPalaceRootId: state => _.get(state.user, 'mind_palace_root')
};

const mutations = {
    setApiKey: (state, newApiKey) => {
        state.apiKey = newApiKey;
        localStorage.setItem('apiKey', newApiKey);
    },
    setApiRefreshKey: (state, newRefreshKey) => {
        state.apiRefreshKey = newRefreshKey;
        localStorage.setItem('apiRefreshKey', newRefreshKey);
    },
    setCurrentUser: (state, newUser) => {
        state.user = newUser;
        localStorage.setItem('user', newUser);
    },
    clearUserAccount: state => {
        state.user = {};
        state.apiKey = null;
        state.apiRefreshKey = null;
        localStorage.removeItem('user');
        localStorage.removeItem('apiKey');
        localStorage.removeItem('apiRefreshKey');
    }
};

const actions = {

    async fetchCurrentUser({ getters, commit }) {
        if (!getters.getUserId) {
            return client.get('/account/users/me/')
                .then(response => {
                    const user = response.data;
                    commit('setCurrentUser', user);
                    return user
                })
                .catch(error => {
                    commit(
                        'setSnackbarText', 
                        'Error while fetching current user: ' + error.toString()
                    );
                    commit('setShowSnackbar', true);
                })
        }
        
    },

    async signup({ commit }, signupCredentials) {
        commit('clearUserAccount');
        return client.post('/account/signup/', signupCredentials)
            .then(response => {
                if (_.get(response, 'status', null) === 201) {
                    return true;
                }
                return false;
            })
            .catch(error => {
                if (_.get(error.response, 'status', null) === 400) {
                    commit('setSnackbarText', 'Unable to sign up: ' + error.response.data);
                    commit('setShowSnackbar', true)
                    return false;
                }
                commit('setSnackbarText', 'Unable to sign up: ' + error.toString());
                commit('setShowSnackbar', true)
                return false;
            })
    },

    async login({ commit, dispatch }, credentials) {
        commit('clearUserAccount');

        return client.post('/auth/token/', credentials)
            .then(response => {
                commit('setApiKey', _.get(response.data, 'access'));
                commit('setApiRefreshKey', _.get(response.data, 'refresh'));
                dispatch('fetchCurrentUser');
                return true;
            })
            .catch(error => {
                commit(
                    'setSnackbarText', 
                    'Error occured while trying to signup: ' + error.toString()
                );
                commit('setShowSnackbar', true);
                return false;
            })
    },

    async refreshToken({ commit }) {},

    async logout({ commit }) {
        commit('cleaUserAccount');
        router.push('/');
    }
};

export default { state, getters, mutations, actions };