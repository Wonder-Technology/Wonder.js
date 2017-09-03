var ThreeDTransformSystemTool = YYC.Class({
    Public: {
        getNormalMatrix: wd.getNormalMatrix,

        resetData: function(){
            wd.initThreeDTransformData(wd.GlobalTempData, wd.ThreeDTransformData);
        },
        isAlive: function(transform){
            expect(function(){
                threeDTransformSystemTool.getPosition(transform)
            }).not.toThrow();
        },
        isNotAlive: function(transform){
            expect(function(){
                threeDTransformSystemTool.getPosition(transform)
            }).toThrow("component should alive");
        }
    }
});

var threeDTransformSystemTool = new ThreeDTransformSystemTool();

YYC.Tool.extend.extend(threeDTransformSystemTool, threeDTransformTool);
