const state = {
    user: {},
    isLoggedIn: false,
    apiKey: localStorage.getItem('access') || '',
    apiRefreshKey: localStorage.getItem('refresh') || '',
};
const getters = {
    getUserIsLoggedIn: state => state.isLoggedIn,
};
const mutations = {};
const actions = {};

export default { state, getters, mutations, actions };
