import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        //选择维修的设备
       repairDevice:{} 
    },
    mutations:{
        selectDevice(state,device) {
          state.repairDevice = device;
        }
    },
    getters:{
        repairDevice: state => state.repairDevice
    }
    
})

export default store;