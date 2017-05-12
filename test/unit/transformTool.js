var transformTool = (function () {
    return {
        setPosition:wd.setThreeDTransformPosition,
        getPosition:wd.getThreeDTransformPosition,
        getLocalToWorldMatrix: wd.getThreeDTransformLocalToWorldMatrix,
        getLocalPosition: wd.getThreeDTransformLocalPosition,
        setLocalPosition: wd.setThreeDTransformLocalPosition,
        setBatchTransformDatas: wd.setThreeDTransformBatchTransformDatas,
        getParent: wd.getThreeDTransformParent,
        setParent: wd.setThreeDTransformParent,
        dispose: wd.disposeThreeDTransform,
        create: wd.createThreeDTransform
    }
})()

