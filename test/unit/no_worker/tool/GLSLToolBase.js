var GLSLToolBase = YYC.AClass({
    Public: {
        contain: function(source, target){
            if(source.indexOf(target) > -1){
                return true;
            }

            console.log(source);
            return false;
        },
        notContain: function(source, target){
            if(source.indexOf(target) > -1){
                console.log(source);
                return false;
            }

            return true;
        },
        containSpecifyCount: function(source, target, count){
            var result = null;

            if(YYC.Tool.judge.isString(target)){
                result = source.match(new RegExp(target, "g"));
            }
            else{
                result = source.match(target);
            }

            if(result && result.length === count){
                return true;
            }

            console.log(source);
            return false;
        },
        containMultiLine:function(source, targetLineArr){
            for(var i = 0, len = targetLineArr.length; i < len; i++){
                var targetLine = targetLineArr[i];

                if(!this.contain(source, targetLine)){
                    console.log(source);
                    return false;
                }
            }

            return true;
        },
        buildFakeGl: function (sandbox) {
            var gl = glslUtils.buildFakeGl(sandbox);

            return gl;
        }
    }
});
