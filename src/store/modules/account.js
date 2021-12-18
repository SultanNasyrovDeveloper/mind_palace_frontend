import _ from 'lodash';

import client from '@/services/api'
import router from '@/router'


const state = {
    user: {},
    apiKey: localStorage.getItem('apiKey') || null,
    apiRefreshKey: localStorage.getItem('apiRefreshKey') || null,
};

const getters = {
    getUser: state => state.user,
    getUserMindPalaceRootId: state => _.get(state.user, 'mind_palace_root'),
    getUserId: state => _.get(state.user, 'id', null),
    getUserIsLoggedIn: state => state.isLoggedIn,
};

const mutations = {
    setApiKey: (state, newApiKey) => state.apiKey = newApiKey,
    setApiRefreshKey: (state, newRefreshKey) => state.apiRefreshKey = newRefreshKey,
    setUserIsLoggedIn: (state, newValue) => state.isLoggedIn = newValue,
    setCurrentUser: (state, newUser) => state.user = newUser,
};

const actions = {
    async fetchCurrentUser({ commit }) {
        return client.get('/account/users/me/')
            .then(response => {
                const user = response.data;
                commit('setCurrentUser', user);
            })
            .catch(error => {
                console.log(error);
            })
    },
    async signup({ commit }, signupCredentials) {
        return client.post('/account/signup/', signupCredentials)
            .then(response => response)
            .catch(error => {
                console.log(error);
            })
    },
    async login({ commit, dispatch }, credentials) {
        return client.post('/auth/token/', credentials)
            .then(response => {
                const apiKey = response.data.access;
                const apiRefreshKey = response.data.refresh;

                localStorage.setItem('apiKey', apiKey);
                localStorage.setItem('apiRefreshKey', apiRefreshKey);

                commit('setApiKey', apiKey);
                commit('setApiRefreshKey', apiRefreshKey);
                commit('setUserIsLoggedIn', true);
            })
            .catch(error => {
                console.log(error);
            })
    },
    async refreshToken({ commit }) {},
    async logout({ commit }) {
        localStorage.removeItem('apiKey');
        localStorage.removeItem('apiRefreshKey');

        commit('setApiKey', '');
        commit('setApiRefreshKey', '');
        commit('setUserIsLoggedIn', false);

        router.push('/');
    }
};

export default { state, getters, mutations, actions };