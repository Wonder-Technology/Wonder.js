var componentTool = (function () {
    return {
        createComponent: function (index) {
            return {
                index:index
            }
        },
        judgeIsComponentIndexNotRemoved: function(component, expect){
            expect(component.index).toEqual(-1);
        },
        judgeNotAlive: function (component, methodName, tool, expect, data) {
            var errMsg = "component should alive";

            expect(function () {
                if(data !== undefined){
                    tool[methodName](component, data);
                }
                else{
                    tool[methodName](component);
                }
            }).toThrow(errMsg);
        }
    }
})()

