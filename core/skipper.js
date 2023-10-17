function calcSkip(page,pageSize){
    return Math.max((page-1),0)*Math.max(pageSize,5);
}
module.exports = {calcSkip};