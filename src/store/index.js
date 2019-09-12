import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        count:0,
        price:88,
        name:'老王',
        arr:[0,1,2,3,4,5,6,]
    },
    mutations:{
        increment(state,num) {
          state.count+= num
        }
    },
    getters:{
        count:state => state.count
    }
    
})

export default store;