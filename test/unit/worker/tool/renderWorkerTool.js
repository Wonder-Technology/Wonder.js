var renderWorkerTool = (function () {
    return {
        judgeWaitForInitComplete: function (done, postMessage, judgeFunc, expect) {
            var count = 0;

            var intervalId = setInterval(function () {
                if (postMessage.withArgs({
                        state: wd.ERenderWorkerState.INIT_COMPLETE
                    }).callCount === 1) {

                    clearInterval(intervalId);

                    judgeFunc(expect);

                    done();
                }
                else if (count <= 100) {
                    count++;
                }
                else {
                    clearInterval(intervalId);

                    expect().toFail();
                    done();
                }
            }, 30);
        }
    }
})();
