import _ from 'lodash';
import apiClient from '@/services/api';

const state = {
    learningSession: {},
    learningNodeId: null,
    sessions: []
};

const getters = {
    getCurrentLearningSession: state => state.learningSession,
    getLearningSessionIsActive: state => {
        return (
            _.isEmpty(state.learningSession)?
            false:
            _.get(state.learningSession, 'status') === 'active'
        )
    },
    getCurrentLearningSessionId: state => _.get(state.learningSession, 'id'),
    getCurrentLearningNodeId: state => state.learningNodeId,
    getLearningSessions: state => state.sessions,
};

const mutations = {
    setCurrentLearningSession: (state, newValue) => state.learningSession = newValue,
    setLearningSessions: (state, newValue) => state.sessions = newValue,
};

const actions = {
    async fetchCurrentLearningNodeId({ commit, getters }) {
        return apiClient.get(`learning/sessions/${getters.getCurrentLearningSessionId}/current/`)
            .then(response => {
                if (response.status === 200) {
                    commit('setCurrentLearningNodeId', response.data);
                }
            })
            .catch(error => {
                commit('setSnackbarText', error.toString());
                commit('setShowSnackbar', true);
            })
    },
    async fetchMyActiveSession({ commit }) {
        return apiClient.get('learning/sessions/my_active_session/')
            .then(response => {
                if (response.data) {
                    commit('setCurrentLearningSession', response.data);
                    commit('setCurrentLearningNodeId', response.data.current)
                }
            })
            .catch(error => {
                commit('setSnackbarText', error.toString());
                commit('setShowSnackbar', true);
            })
    },
    async startLearningSession({ commit }, sessionData) {
        return apiClient.post('learning/sessions/start/', sessionData)
            .then(response => {
                commit('setCurrentLearningSession', response.data);
                commit('setCurrentLearningNodeId', response.data.current)
            })
            .catch(error => {
                commit('setSnackbarText', error.toString());
                commit('setShowSnackbar', true);
            })
    },
    async fetchSessionList({ commit }, [page, count, query]) {
        const response = await apiClient.get(
            `/learning/sessions/?offset=${page * count}&limit=${count}`, 
            query
        );
        if (response.status === 200) {
            commit('setLearningSessions', response.data.results);
            return response.data;
        }

    },
    async studyNode({ commit, getters }, [nodeId, studyRating]) {
        return apiClient.post(
                `learning/sessions/${getters.getCurrentLearningSessionId}/study_node/`, { node: nodeId, rating: studyRating }
            )
            .then(response => {
                if (response.status === 200) {
                    const next = response.data.next;
                    debugger;
                    if (next) {
                        commit('setCurrentLearningNodeId', next);
                        commit('setSnackbarText', 'Node study completed.');
                        commit('setShowSnackbar', true);
                    }
                    return next;
                }
            })
            .catch(error => {
                commit('setSnackbarText', 'Error occured while node study: ' + error.toString());
                commit('setShowSnackbar', true);
            })
    },
    async finishSession({ commit, getters }) {
        if (!getters.getLearningSessionIsActive) return;
        return apiClient.post(`learning/sessions/${getters.getCurrentLearningSessionId}/finish/`)
            .then(response => {
                if (response.status === 200) {
                    commit('setCurrentLearningSession', {});
                    commit('setCurrentLearningNodeId', null);
                }
            })
            .catch(error => {
                commit('setSnackbarText', error.toString());
                commit('setShowSnackbar', true);
            })
    },
};

export default { state, getters, mutations, actions };