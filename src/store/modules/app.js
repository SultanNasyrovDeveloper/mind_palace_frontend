import client from '@/services/api'

const state = {
    sidebar: false,
    showSnackbar: false,
    snackbarText: '',
    enums: {}
};

const getters = {
    getShowSnackbar: state => state.showSnackbar,
    getSnackbarText: state => state.snackbarText,
    getEnums: state => state.enums,
    getEnumsByName: (state, enumName) => state.enums[enumName]
};

const mutations = {
    setShowSnackbar: (state, newShowSnackbarValue) => state.showSnackbar = newShowSnackbarValue,
    setSnackbarText: (state, newSnackbarText) => state.snackbarText = newSnackbarText,
    setEnums: (state, newEnums) => state.enums = newEnums,
};

const actions = {
    fetchEnums({ commit }) {
        return client.get('/enums')
            .then(response => {
                commit('setEnums', response.data);
                commit('setSnackbarText', 'Successfully retrieved enums from server.');
                commit('setShowSnackbar', true);
            })
            .catch(error => {
                commit(
                    'setSnackbarText',
                    'Error occured while trying to get enums: ' + error
                );
                commit('setShowSnackbar', true);
            })
    }
};

export default { state, getters, mutations, actions};