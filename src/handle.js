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

export function paginator(pageIndex, data, opts){
    opts = Object.assign({ pageRow: 80 }, opts);

    var length = data.length,
        maxPage = Math.ceil( length / opts.pageRow ),
        nextPage = pageIndex + 1 > maxPage ? maxPage : pageIndex + 1,
        offset = (pageIndex - 1) * opts.pageRow,
        result = [].concat(data).splice(offset, Math.min(opts.pageRow, length - offset));

        //nextPage === 1 ? length : Math.min((nextPage - 1) * opts.pageRow, length)

    return {
        currentPage: pageIndex,
        pageRow: opts.pageRow,
        maxPage: maxPage,
        nextPage: nextPage,
        prevPage: pageIndex - 1 < 0 ? 0 : pageIndex, 
        data: result
    }
}