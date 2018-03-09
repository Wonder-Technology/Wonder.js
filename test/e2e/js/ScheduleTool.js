var ScheduleTool = (function () {
    return {
        scheduleLoop: function (func, state) {
            return wd.addNoWorkerLoopJob("scheduleLoop", "update_camera", func, state);
        }
    }
})()
