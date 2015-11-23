var searchTool = (function () {
    return {
        searchString:function(targetStr, sourceStr){
            var result = sourceStr.match(targetStr),
                count= null;

            if(result !== null){
                count = result.length;
            }
            else{
                count = 0;
            }

            return {
                count: count
            }
        }
    }
})();
