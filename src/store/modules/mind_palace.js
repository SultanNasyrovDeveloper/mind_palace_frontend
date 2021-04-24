import client from '@/services/api'


const state = {
    root: {},
    currentNode: {},
};

const getters = {
    getMindPalace: state => state.root,
    getCurrentNode: state => state.currentNode,
    getCurrentNodeId: state => state.currentNode.id || null,
    getMindPalaceRootId: state => state.root.id || null,
    getMindPalaceRootParentId: state => state.root.parent || null,
    getMindPalaceRootChildren: state => state.root.children || [],
};


const mutations = {
    setMindPalace: (state, newValue) => state.root = newValue,
    addMindPalaceNode(state, newNode) {
        let treeRoot = state.root;
        let newNodeParentId = newNode.parent;

        if (newNodeParentId === treeRoot) {
            treeRoot.children.push(newNode);
            return
        }

        const rootChildrenIds = treeRoot.children.map(child => child.id);
        if (rootChildrenIds.includes(newNodeParentId)) {
            for (let i = 0; i < treeRoot.children.length; i++) {
                if (treeRoot.children[i].id === newNodeParentId) {
                    debugger;
                    treeRoot.children[i].subnodes.push(newNode);
                    break;
                }
            }
        }
    },
    setCurrentNode: (state, newNode) => state.currentNode = newNode,
    deleteNode(state, nodeId) {
        console.log('Removing mind palace from ')
    }
};

const actions = {
    async createNode({ commit }, nodeData) {
        return client.post('/neuron/neurons/', nodeData)
            .then(response => {
                commit('addMindPalaceNode', response.data);
            })
            .catch(error => {
                console.log(error);
            })
    },
    async fetchMindPalace({ getters, commit }, rootId) {
        if (getters.getMindPalaceRootId === rootId) return;
        return client.get(`/neuron/neurons/${rootId}/subtree`)
            .then(response => {
                const mindPalaceRoot = response.data;
                commit('setMindPalace', mindPalaceRoot);
            })
            .catch(error => {
                console.log(error);
            })
    },
    fetchMindPalaceNode({ getters, commit }, nodeId) {
        if (getters.getCurrentNodeId === nodeId) return;
        return client.get(`neuron/neurons/${nodeId}`)
            .then(response => {
                const nodeDetail = response.data;
                commit('setCurrentNode', nodeDetail);
            })
            .catch(error => {
                console.log(error);
            })
    },
    deleteNode() {

    }

};

export default { state, getters, mutations, actions };