var orderTool = (function () {
    return {
        judgeInvokeOrder: function (invokeArr, methodName) {
            for (var i = 0, len = invokeArr.length; i < len - 1; i++) {
                if(methodName){
                    expect(invokeArr[i][methodName]).toCalledBefore(invokeArr[i + 1][methodName]);
                }
                else{
                    expect(invokeArr[i]).toCalledBefore(invokeArr[i + 1]);
                }
            }
        }
    }
})();
