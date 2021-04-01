import Vue from 'vue'
import Vuex from 'vuex'

import application from '@/store/modules/app'
import user from '@/store/modules/user'


Vue.use(Vuex);


export default new Vuex.Store({
    modules: { application, user },
});
