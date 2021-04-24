import client from '@/services/api'
import router from '@/router'


const state = {
    user: {},
    isLoggedIn: !!localStorage.getItem('apiKey'),
    apiKey: localStorage.getItem('apiKey') || '',
    apiRefreshKey: localStorage.getItem('apiRefreshKey') || '',
};

const getters = {
    getUser: state => state.user,
    getUserId: state => state.user.hasOwnProperty('id') ? state.user.id : null,
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
        return client.get('/auth/user/me')
            .then(response => {
                const user = response.data;
                commit('setCurrentUser', user);
            })
            .catch(error => {
                console.log(error);
            })
    },
    signup({ commit }, userData) {

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

                dispatch('fetchCurrentUser');

                router.push({name: 'dashboard'});
            })
            .catch(error => {
                console.log(error);
                throw error
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
