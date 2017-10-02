var threeDTransformTool = (function () {
    return {
        setPosition:wd.setThreeDTransformPosition,
        getPosition:wd.getThreeDTransformPosition,
        getLocalToWorldMatrix: wd.getThreeDTransformLocalToWorldMatrix,
        getLocalPosition: wd.getThreeDTransformLocalPosition,
        setLocalPosition: wd.setThreeDTransformLocalPosition,
        setBatchTransformData: wd.setThreeDTransformBatchTransformData,
        getParent: wd.getThreeDTransformParent,
        setParent: wd.setThreeDTransformParent,
        // dispose: wd.disposeThreeDTransform,
        create: wd.createThreeDTransform,
        getGameObject:wd.getThreeDTransformGameObject
    }
})()

