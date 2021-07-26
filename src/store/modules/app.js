import client from '@/services/api'

const state = {
    sidebar: false,
    enums: {},
    showSnackbar: false,
    snackbarText: ''
};

const getters = {
    getEnums: state => state.enums,
    getEnumsByName: (state, enumName) => state.enums[enumName],
    getShowSnackbar: state => state.showSnackbar,
    getSnackbarText: state => state.snackbarText,
};

const mutations = {
    setShowSnackbar: (state, newShowSnackbarValue) => state.showSnackbar = newShowSnackbarValue,
    setSnackbarText: (state, newSnackbarText) => state.snackbarText = newSnackbarText,
    setEnums: (state, newEnums) => state.enums = newEnums,
};

const actions = {
    fetchEnums({ commit }) {
        return client.get('application/enums')
            .then(response => {
                commit('setEnums', response.data);
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