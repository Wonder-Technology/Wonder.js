var eventTool = (function () {
    return {
        triggerDomEvent:function(eventName, target){
            var target = target || document.getElementById("event-test");

            YYC.Tool.event.triggerEvent(target, wd.EventNameHandler.handleEventName(eventName));
        }
    }
})();
