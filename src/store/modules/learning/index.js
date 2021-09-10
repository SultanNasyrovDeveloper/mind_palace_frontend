import apiClient from '@/services/api';

const state = {
    currentNodeStatistics: null,

};

const getters = {
    getCurrentNodeStatistics: state => state.currentNodeStatistics,
    getCurrentNodeStatisticsId: state => state.currentNodeStatistics.id || null,
    getCurrentNodeStatisticsNodeId: state => {
        if (state.currentNodeStatistics && state.currentNodeStatistics.hasOwnProperty('node')) {
            return state.currentNodeStatistics.node
        }
    },

};

const mutations = {
    setCurrentNodeStatistics: (state, newValue) => state.currentNodeStatistics = newValue,
    setCurrentLearningNodeId: (state, newValue) => state.currentLearningNodeId = newValue,
};

const actions = {
    async fetchNodeLearningStatistics({ commit, getters }, nodeId) {
        if (nodeId === getters.getCurrentNodeStatisticsNodeId) return;
        return apiClient.get(`/learning/statistics/node_statistics/?node_id=${nodeId}`)
            .then(response => {
                commit('setCurrentNodeStatistics', response.data)
            })
            .catch(error => {
                commit('setSnackbarText', error.toString());
                commit('setShowSnackbar', true);
            })
    },
};

export default { state, getters, actions, mutations };