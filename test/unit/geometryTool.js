var geometryTool = (function () {
    return {
        create: wd.createGeometry,
        getVertices:wd.getVertices,
        getIndices:wd.getIndices,
        getDrawMode:wd.getDrawMode,
        setDrawMode:wd.setDrawMode,
        getConfigData:wd.getGeometryConfigData,
        initGeometry:wd.initGeometry,

        resetData: function(){
            wd.initGeometryData(wd.DataBufferConfig, wd.GeometryData);
        }
    }
})()
