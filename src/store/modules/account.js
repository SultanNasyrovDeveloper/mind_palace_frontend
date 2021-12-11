import client from '@/services/api'
import router from '@/router'
// TODO: Refactor methods

const state = {
    user: {},
    isLoggedIn: !!localStorage.getItem('apiKey'),
    apiKey: localStorage.getItem('apiKey') || '',
    apiRefreshKey: localStorage.getItem('apiRefreshKey') || '',
};

const getters = {
    getUser: state => state.user,
    getUserMindPalaceRootId: state => {
        if (state.user && state.user.hasOwnProperty('mind_palace_root')) {
            return state.user.mind_palace_root
        }
    },
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
    async login({ commit }, credentials) {
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