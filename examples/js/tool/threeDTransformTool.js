var threeDTransformTool = (function () {
    return {
        setPosition:wd.setThreeDTransformPosition,
        getPosition:wd.getThreeDTransformPosition,
        getLocalToWorldMatrix: wd.getThreeDTransformLocalToWorldMatrix,
        getLocalPosition: wd.getThreeDTransformLocalPosition,
        setLocalPosition: wd.setThreeDTransformLocalPosition,
        setBatchTransformDatas: wd.setThreeDTransformBatchTransformDatas,
        getParent: wd.getThreeDTransformParent,
        setParent: wd.setThreeDTransformParent,
        // dispose: wd.disposeThreeDTransform,
        getNormalMatrix: wd.getNormalMatrix,
        create: wd.createThreeDTransform,
        getGameObject:wd.getThreeDTransformGameObject,

        resetData: function(){
            wd.initThreeDTransformData(wd.GlobalTempData, wd.ThreeDTransformData);
        },
        isAlive: function(transform){
            expect(function(){
                threeDTransformTool.getPosition(transform)
            }).not.toThrow();
        },
        isNotAlive: function(transform){
            expect(function(){
                threeDTransformTool.getPosition(transform)
            }).toThrow("component should alive");
        }
    }
})()

