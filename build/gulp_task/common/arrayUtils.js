function removeRepeatItems(arr) {
    var resultArr = [],
        self = this;

    arr.forEach(function (ele) {
        if(resultArr.indexOf(ele) > -1){
            return;
        }

        resultArr.push(ele);
    });

    return resultArr;
}




module.exports = {
    removeRepeatItems: removeRepeatItems
};
