import Vue from 'vue'
import Vuex from 'vuex'

import application from '@/store/modules/app'
import user from '@/store/modules/user'
import mind_palace from '@/store/modules/mind_palace'


Vue.use(Vuex);


export default new Vuex.Store({
    modules: { application, user, mind_palace }
});
