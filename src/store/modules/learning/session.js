import apiClient from '@/services/api';

const state = {
    learningSession: null,
    learningNodeId: null,

};

const getters = {
    getCurrentLearningSession: state => state.learningSession,
    getCurrentLearningSessionId: state => state.learningSession.id || null,
    getCurrentLearningNodeId: state => state.learningNodeId,
};

const mutations = {
    setCurrentLearningSession: (state, newValue) => state.learningSession = newValue,
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
            })
            .catch(error => {
                commit('setSnackbarText', error.toString());
                commit('setShowSnackbar', true);
            })
    },
    async studyNode({ commit, getters }, [nodeId, studyRating]) {
        return apiClient.post(
            `learning/sessions/${getters.getCurrentLearningSessionId}/study_node/`,
            {node: nodeId, rating: studyRating}
        )
            .then(response => {
                if (response.status === 200) {
                    const next = response.data.next;
                    if (next) {
                        commit('setCurrentLearningNodeId', next);
                        commit('setSnackbarText', 'Node study completed.');
                        commit('setShowSnackbar', true);
                    }
                    return next
                }
            })
            .catch(error => {
                commit('setSnackbarText', 'Error occured while node study: ' + error.toString());
                commit('setShowSnackbar', true);
            })
    },
    async finishSession({ commit, getters }) {
        if (!getters.getCurrentLearningSessionId) return;
        return apiClient.post(`learning/sessions/${getters.getCurrentLearningSessionId}/finish/`)
            .then(response => {
                if (response.status === 200) {
                    commit('setCurrentLearningSession', null);
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