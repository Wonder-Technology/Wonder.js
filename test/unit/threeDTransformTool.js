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
        create: wd.createThreeDTransform,
        getGameObject:wd.getThreeDTransformGameObject,

        resetData: function(){
            wd.initThreeDTransformData(wd.GlobalTempData, wd.ThreeDTransformData);
        },
        isAlive: function(transform){
            expect(function(){
                this.getPosition(transform)
            }).not.toThrow();
        },
        isNotAlive: function(transform){
            expect(function(){
                this.getPosition(transform)
            }).toThrow();
        }
    }
})()

