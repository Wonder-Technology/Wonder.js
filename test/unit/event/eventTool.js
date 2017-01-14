var eventTool = (function () {
    return {
        setView: function(sandbox, canvas){
            sandbox.stub(wd.DeviceManager.getInstance(), "view", {
                x: 0,
                y: 0,
                width: canvas.width(),
                height: canvas.height(),

                offset:{
                    x:0,
                    y:0
                }
            });
        },
        triggerDomEvent:function(eventName, dom, eventData){
            //var dom = dom || document.getElementById("event-test");
            var dom = dom || document.body;

            YYC.Tool.event.triggerEvent(dom, wd.EventNameHandler.handleEventName(eventName), eventData);
        },
        buildFakeTouchEvent: function (pageX, pageY) {
            return {
                changedTouches:[{
                    pageX:pageX,
                    pageY:pageY
                }]
            };
        },
        buildFakeMouseEvent: function (pageX, pageY) {
            return {
                pageX:pageX,
                pageY:pageY
            };
        }
    }
})();
