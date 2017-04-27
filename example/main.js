import Vue from 'vue';
import axios from 'axios';
import VueSinaEmotion from '../src/vue-sina-emotion.vue';

Vue.component('vue-sina-emotion', VueSinaEmotion);

axios
    //get emotions in https://api.weibo.com/2/emotions.json?callback=?
    .get('//localhost:8881/emotions', {params:{
        source: '1362404091',
        language: 'cnname'
    }})
    .then(function(xhr){
        vm.emotions = xhr.data.data;
    })
    .catch(function(e){
        throw e;
    });

var vm = new Vue({
    el: '#app',
    data: function(){
        return {
            title: 'VueSinaEmotion',
            emotions: [],
            emotion: '[表情]',
            emotionsMap: {}
        }
    },
    methods: {
        map: function(data){
            this.emotionsMap = data;
        }
    }
})