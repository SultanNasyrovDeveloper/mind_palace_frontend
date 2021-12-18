import _ from 'lodash';

import apiClient from '@/services/api';

const state = {
    currentNodeStatistics: {}
};


const getters = {
    getCurrentNodeStatistics: state => state.currentNodeStatistics,
    getCurrentNodeStatisticsId: state => _.get(state, 'currentNodeStatistics.id'),
    getCurrentNodeStatisticsNodeId: state => _.get(state.currentNodeStatistics, 'node'),
    getCurrentNodeViews: state => _.get(state.currentNodeStatistics, 'views'),
    getCurrentNodeRepetitions: state => _.get(state.currentNodeStatistics, 'repetitions'),
    getCurrentNodeEasiness: state => _.get(state.currentNodeStatistics, 'easiness'),
    getCurrentNodeAcerageRate: state => _.get(state.currentNodeStatistics, 'average_rate')

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