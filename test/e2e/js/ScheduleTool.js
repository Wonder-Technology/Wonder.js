var ScheduleTool = (function () {
    return {
        scheduleLoop: function (func, state) {
            var state = wd.registerNoWorkerLoopJob("scheduleLoop", func, state);

            return state;
        }
        // scheduleWorkerMainLoopUnSafeJob: function (func, state) {
        //     return wd.addWorkerMainLoopJob(["scheduleLoop", "create_basic_render_object_buffer"], 0, func, state);
        // }
    }
})()
