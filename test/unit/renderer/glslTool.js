var glslTool = (function () {
    return {
        contain: function(source, target){
            return source.indexOf(target) > -1;
        },
        containSpecifyCount: function(source, target, count){
            var result = source.match(new RegExp(target, "g"));

            return result && result.length === count;
        },
        containMultiLine:function(source, targetLineArr){
            for(var i = 0, len = targetLineArr.length; i < len; i++){
                var targetLine = targetLineArr[i];

                if(!this.contain(source, targetLine)){
                    return false;
                }
            }

            return true;
        }
    }
})();
