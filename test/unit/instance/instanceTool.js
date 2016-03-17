var instanceTool = (function(){
    return {
        judgeInstanceCount: function(extensionInstancedArrays, callIndex, count){
            var args = extensionInstancedArrays.drawElementsInstancedANGLE.getCall(callIndex).args;
            expect(args[args.length - 1]).toEqual(count);
        }
    }
})();
