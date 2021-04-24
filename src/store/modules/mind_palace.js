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
        let newNodeClean = {
            id: newNode.id,
            name: newNode.name,
            parent: newNode.parent,
            children: []
        };
        let newNodeParentId = newNode.parent;

        if (newNodeParentId === treeRoot.id) {
            treeRoot.children.push(newNodeClean);
            return
        }
        debugger;
        const rootChildrenIds = treeRoot.children.map(child => child.id);
        if (rootChildrenIds.includes(newNodeParentId)) {
            for (let i = 0; i < treeRoot.children.length; i++) {
                if (treeRoot.children[i].id === newNodeParentId) {
                    const parent = state.root.children[i];
                    parent.children.push(newNodeClean);
                    return;
                }
            }
        }
    },
    setCurrentNode: (state, newNode) => state.currentNode = newNode,
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
    deleteNode({ commit }, nodeId) {
        return client.delete(`neuron/neurons/${nodeId}`)
            .then(response => {
                commit('removePalaceNode', nodeId);
            })
            .catch(error => {
                console.log(error);
            })

    }

};

export default { state, getters, mutations, actions };