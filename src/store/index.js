import Vue from 'vue';
import Vuex from 'vuex';

import application from '@/store/modules/app';
import account from '@/store/modules/account';
import mind_palace from '@/store/modules/mind_palace';
import learning from '@/store/modules/learning';



Vue.use(Vuex);


export default new Vuex.Store({
    modules: { application, account, mind_palace, learning }
});
