var ScheduleTool = (function () {
    return {
        scheduleLoop: function (func, state) {
            return wd.addLogicUpdateJob("scheduleLoop", "update_camera", func, state);
        }
    }
})()
