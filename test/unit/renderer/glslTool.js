var glslTool = (function () {
    return {
        contain: function(source, target){
            return source.indexOf(target) > -1;
        },
        containSpecifyCount: function(source, target, count){
            var result = source.match(new RegExp(target, "g"));

            return result && result.length === count;
        }
    }
})();
