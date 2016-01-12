var eventTool = (function () {
    return {
        triggerDomEvent:function(eventName, dom){
            //var dom = dom || document.getElementById("event-test");
            var dom = dom || document.body;

            YYC.Tool.event.triggerEvent(dom, wd.EventNameHandler.handleEventName(eventName));
        }
    }
})();
