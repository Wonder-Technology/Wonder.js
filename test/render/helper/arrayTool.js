var arrayTool = (function(){
    return {
        add:function(a, b){
            var result = [];

            a.forEach(function(ele, i){
                result[i] = ele + b[i];
            });

            return result;
        }
    }
})();

