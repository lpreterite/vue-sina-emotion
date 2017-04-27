<template>
    <div class="sina-emotion-panel">
        <header class="categories">
            <template v-for="cate in categories">
                <a href="#" @click.prevent.stop="currentCate=cate">{{ cate }}</a>
            </template>
        </header>
        <div class="content">
            <template v-for="emotion in currentEmotions">
                <a href="#" @click.prevent.stop="$emit('click', emotion)">
                    <img :src="emotion.icon" :alt="emotion.phrase">
                </a>
            </template>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .sina-emotion-panel{
        .title{
            font-size: 16px;
        }
    }
</style>
<script>
import { hashEmotions, getEmotions, fetchEmotions } from './handle';
export default {
    name: 'vue-sina-emotion',
    props: ['source', 'pageRows'],
    watch: {
        source(val){
            const result = hashEmotions([].concat(val));
            this.groups = result.groups;
            this.categories = result.categories;
            this.map = result.map;
        }
    },
    computed: {
        currentEmotions(){
            var emotions = fetchEmotions(this.currentPage, this.groups[this.currentCate] || []);
            this.currentPage = emotions.currentPage;
            return emotions || {
                currentPage: 1,
                pageRow: 0,
                maxPage: 0,
                nextPage: 0,
                prevPage: 0, 
                data: []
            };
        }
    },
    data(){
        return {
            groups: {},
            categories: [],
            map: {},
            currentPage: 1,
            currentCate: '默认'
        }
    }
}
</script>