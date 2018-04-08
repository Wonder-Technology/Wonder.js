var ScheduleTool = (function () {
    return {
        scheduleLoop: function (func, state) {
            return wd.addNoWorkerLoopJob("scheduleLoop", "", func, state);
        }
    }
})()
