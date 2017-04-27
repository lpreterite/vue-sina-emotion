# vue-sina-emotion

> 新浪表情面板的vue组件

## how to use

### setup
```
npm install vue-sina-emotion
```

### use
```
# js
import Vue from 'vue';
import VueSinaEmotion from 'vue-sina-emotion';
// or import no babel code
// import VueSinaEmotion from 'vue-sina-emotion/src/';
Vue.component('vue-sina-emotion', VueSinaEmotion);

var vm = new Vue({
    el: '#app',
    data: function(){
        return {
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

# html
<div id="app">
    <p>{{ emotion }} <img :src="emotionsMap[emotion]" alt=""></p>
    <vue-sina-emotion 
        :source="emotions"
        :map="map"
        @click="emotion=arguments[0].phrase">    
    </vue-sina-emotion>
</div>

#emotion modal
{
    "phrase": "[坏笑]",
    "type": "face",
    "url": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png",
    "hot": false,
    "common": true,
    "category": "",
    "icon": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_thumb.png",
    "value": "[坏笑]",
    "picid": ""
}

```
more see **example**

### style
```
.sina-emotion-panel{}
.sina-emotion-panel__header{}
.sina-emotion-panel__content{}
.sina-emotion-panel__footer{}

.sina-emotion-panel .btn{ /** <,>,prev,next button style **/ }
.sina-emotion-panel .tabs{}
.sina-emotion-panel .tabs__item{}
.sina-emotion-panel .tabs__item--action{}
.sina-emotion-panel .tabsTools{}
.sina-emotion-panel .tabsToolsButton{}
```


## Dev

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8081
npm run dev

# build for production with minification
npm run build

# run mock serve
npm run mock
```