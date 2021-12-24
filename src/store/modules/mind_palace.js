import client from '@/services/api';
import _ from 'lodash';

const state = {
    root: {},
    node: {},
    mediaTypes: {}
};

const getters = {
    getMindPalace: state => state.root,
    getMindPalaceRootId: state => _.get(state.root, 'id'),
    getMindPalaceRootParentId: state => _.get(state.root, 'parent', null),
    getMindPalaceRootChildren: state => _.get(state.root, 'children', []),

    getCurrentNode: state => state.node,
    getCurrentNodeId: state => _.get(state.node, 'id', null),
    getCurrentNodeName: state => _.get(state.node, 'name', ''),
    getCurrentNodeBody: state => _.get(state.node, 'body', {}),
    getCurrentNodeType: state => _.get(state.node, 'body_type'),
    getCurrentNodeMedia: state => _.get(state.node, 'media', []),
    getCurrentNodeChildren: state => _.get(state.node, 'chidlren', []),
    getCurrentNodeLearningStatisticsId: state => _.get(state.node, 'learning_statistics', {}),
};

const mutations = {
    setMindPalace: (state, newValue) => state.root = newValue,
    addMindPalaceNode(state, newNode) {
        debugger;
        let newNodeParentId = _.get(newNode, 'parent');
        if (newNodeParentId === state.root.id) {
            state.root.children.push(newNode);
            return
        }
        const rootChildrenIds = state.root.children.map(child => child.id);
        if (rootChildrenIds.includes(newNodeParentId)) {
            for (let i = 0; i < state.root.children.length; i++) {
                if (state.root.children[i].id === newNodeParentId) {
                    const parent = state.root.children[i];
                    if (Array.isArray(parent.children)) {
                        parent.children.push(newNode);
                    } else {
                        parent.children = [newNode];
                    }
                }
            }
        }
    },
    updateMindPalaceNode(state, payload) {
        let targetPalaceNode;
        const updatedNode = payload[0];
        const excludeFields = _.get(payload, '1', [])
        const updatedNodeId = _.get(updatedNode, 'id');
        if (updatedNodeId === _.get(state.root, 'id')) {
            targetPalaceNode = state.root;
        }
        if (!targetPalaceNode) {
            const rootChildrenIds = _.get(state.root, 'children', []).map(child => child.id);
            if (rootChildrenIds.includes(updatedNodeId)) {
                targetPalaceNode = _.get(state.root, 'children', []).find(
                    child => child.id === updatedNodeId
                )
            }
        }
        if (!targetPalaceNode) {
            for (const child of _.get(state.root, 'children', [])) {
                targetPalaceNode = child.children.find(grandchild => 
                    grandchild.id === updatedNodeId
                );
                if (targetPalaceNode) break;
            }
        }
        if (targetPalaceNode) {
            _.forOwn(updatedNode, (value, key) => {
                if (!excludeFields.includes(key)) {
                    targetPalaceNode[key] = value;
                }
            })
        }
    },
    removePalaceNode(state, nodeId) {
        if (nodeId === state.root.id) { state.root = {}; return; }
        for (const child of state.root.children) {
            if (child.id === nodeId) {
                state.root.children.splice(state.root.children.indexOf(child), 1);
                return
            }
            for (const subnode of child.children) {
                if (subnode.id === nodeId) {
                    child.children.splice(child.children.indexOf(subnode), 1);
                    return;
                }
            }
        }
    },

    setCurrentNode: (state, newNode) => state.node = newNode,
    setCurrentNodeChildren: (state, newValue) => state.node.children = newValue,
    addCurrentNodeMedia: (state, newMedia) => {
        if (Array.isArray(_.get(state.node, 'media', null))) {
            state.node.media.push(newMedia);
            return;
        }
        state.node.media = [newMedia];
    }

};

const actions = {
    async fetchMindPalace({ getters, commit }, rootId) {
        if (getters.getMindPalaceRootId === rootId) return;
        return client.get(`/palace/palaces/tree/?root=${rootId}&depth=3`)
            .then(response => {
                const mindPalaceRoot = response.data;
                commit('setMindPalace', mindPalaceRoot);
            })
            .catch(error => {
                console.log(error);
            })
    },
    async createNode({ commit }, nodeData) {
        return client.post('/palace/nodes/', nodeData)
            .then(response => {
                commit('addMindPalaceNode', response.data);
            })
            .catch(error => {
                console.log(error);
            })
    },
    async fetchMindPalaceNode({ getters, commit }, nodeId) {
        if (getters.getCurrentNodeId === nodeId) return;
        return client.get(`/palace/nodes/${nodeId}/`)
            .then(response => {
                if (response.status === 200) {
                    const nodeDetail = response.data;
                    commit('setCurrentNode', nodeDetail);
                    commit(
                        'updateMindPalaceNode', 
                        [nodeDetail, ['learning_statistics']]
                    );
                }
            })
            .catch(error => {
                console.log(error);
            })
    },
    async updateNode({ commit, getters }, [nodeId, updateData]) {
        return client.patch(`/palace/nodes/${nodeId}/`, updateData)
            .then(response => {
                commit('updateMindPalaceNode', [response.data]);
                if (nodeId == getters.getCurrentNodeId) {
                    debugger;
                    commit('setCurrentNode', response.data);
                }
            })
            .catch(error => {
                console.log(error);
            })
    },
    async addNodeMedia({ commit, getters }, [nodeId, mediaData]) {
        return client.post(`palace/nodes/${nodeId}/add_media/`, mediaData)
            .then(response => {
                console.log(response.data);
                if (nodeId === getters.getCurrentNodeId) {
                    commit('addCurrentNodeMedia', response.data);
                }
                return response.data;
            })
            .catch(error => {
                commit('setSnackbarText', 'Unable to create media: ' + error);
                commit('setShowSnackbar', true);
            })
    },
    async deleteNode({ commit }, nodeId) {
        return client.delete(`/palace/nodes/${nodeId}/`)
            .then(response => {
                commit('removePalaceNode', nodeId);
            })
            .catch(error => {
                console.log(error);
            })
    }

};

export default { state, getters, mutations, actions };