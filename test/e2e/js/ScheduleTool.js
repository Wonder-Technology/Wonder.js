var ScheduleTool = (function () {
    return {
        scheduleLoop: function (func, state) {
            return wd.addNoWorkerLoopJob(["scheduleLoop", "tick"], 0, func, state);
        },
        scheduleWorkerMainLoopUnSafeJob: function (func, state) {
            return wd.addWorkerMainLoopJob(["scheduleLoop", "create_basic_render_object_buffer"], 0, func, state);
        }
    }
})()
