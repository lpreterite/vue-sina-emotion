import axios from 'axios';

export function getEmotions(source, language){
    return axios.get('https://api.weibo.com/2/emotions.json?callback=?', {params:{
        source,
        language
    }});
};

export function hashEmotions(emotions){
    var groups = {},
        categories = [],
        map = {};

    emotions.forEach(emotion=>{
        var cate = emotion.category.length > 0 ? emotion.category : '默认';
        if(!groups[cate]){
            groups[cate] = [];
            categories.push(cate);
        }

        groups[cate].push(emotion);
        map[emotion.phrase] = emotion.icon;
    });

    return { groups, categories, map }
}

export function fetchEmotions(pageIndex, emotions, opts){
    opts = Object.assign({ pageRow: 80 }, opts);

    var length = emotions.length,
        maxPage = Math.ceil( length / opts.pageRow ),
        nextPage = pageIndex + 1 > maxPage ? maxPage : pageIndex + 1,
        data = emotions.splice((pageIndex - 1) * opts.pageRow, Math.min((nextPage - 1) * opts.pageRow, length));

    return {
        currentPage: pageIndex,
        pageRow: opts.pageRow,
        maxPage: maxPage,
        nextPage: nextPage,
        prevPage: pageIndex - 1 < 0 ? 0 : pageIndex, 
        data: data
    }
}