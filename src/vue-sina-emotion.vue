<template>
    <div class="sina-emotion-panel">
        <header>
            <div class="categories">
                <template v-for="cate in categories.data">
                    <a href="#" @click.prevent.stop="currentCate=cate;emotions.currentPage=1">{{ cate }}</a>
                </template>
            </div>
            <div class="categories-page">
                <a href="#" @click="prevCate" :disabled="emotions.prevPage <= 1">&lt</a>
                <a href="#" @click="nextCate" :disabled="emotions.prevPage >= emotions.maxPage">&gt</a>
            </div>
        </header>
        <div class="content">
            <template v-for="emotion in emotions.data">
                <a href="#" @click.prevent.stop="$emit('click', emotion)">
                    <img :src="emotion.icon" :alt="emotion.phrase">
                </a>
            </template>
        </div>
        <footer>
            <a href="#" @click="prev" :disabled="emotions.prevPage <= 1">上一页</a>
            <a href="#" @click="next" :disabled="emotions.prevPage >= emotions.maxPage">下一页</a>
        </footer>
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
import { hashEmotions, getEmotions, paginator } from './handle';
export default {
    name: 'vue-sina-emotion',
    props: {
        source: Array,
        pageRows: {
            type: Number,
            default: 0
        },
        map: {
            type: Function,
            default: function(){}
        }
    },
    watch: {
        source(val){
            this.storage = hashEmotions(val);
            this.categories = paginator(this.categories.currentPage, this.storage.categories, {pageRow: 5});
            this.emotions = paginator(this.emotions.currentPage, this.storage.groups[this.currentCate] || []);
            this.map(this.storage.map);
        },
        currentCate(val){
            this.emotions = paginator(this.emotions.currentPage, this.storage.groups[val] || []);
        }
    },
    data(){
        return {
            storage: {},
            emotions: {
                pageRow: 0,
                maxPage: 0,
                nextPage: 0,
                prevPage: 0, 
                currentPage: 1,
                data: []
            },
            categories: {
                pageRow: 0,
                maxPage: 0,
                nextPage: 0,
                prevPage: 0, 
                currentPage: 1,
                data: []
            },
            currentCate: '默认'
        }
    },
    methods:{
        next(){
            this.emotions.currentPage = Math.min(this.emotions.currentPage+1, this.emotions.maxPage);
            this.emotions = paginator(this.emotions.currentPage, this.storage.groups[this.currentCate] || []);
        },
        prev(){
            this.emotions.currentPage = Math.max(this.emotions.currentPage-1, 1);
            this.emotions = paginator(this.emotions.currentPage, this.storage.groups[this.currentCate] || []);
        },
        nextCate(){
            this.categories.currentPage = Math.min(this.categories.currentPage+1, this.categories.maxPage);
            this.categories = paginator(this.categories.currentPage, this.storage.categories, {pageRow: 5});
        },
        prevCate(){
            this.categories.currentPage = Math.max(this.categories.currentPage-1, 1);
            this.categories = paginator(this.categories.currentPage, this.storage.categories, {pageRow: 5});
        }
    }
}
</script>