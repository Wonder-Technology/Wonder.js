var WorkerTool = (function () {
    return {
        serializeFunction: function (func) {
            return func.toString();
        },
        deserializeFunction: function (funcStr) {
            return eval('(' + funcStr + ')');
        }
    }
})()