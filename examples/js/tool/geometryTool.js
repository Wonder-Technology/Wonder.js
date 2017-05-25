var geometryTool = (function () {
    return {
        create: wd.createGeometry,
        getVertices:wd.getVertices,
        getIndices:wd.getIndices,
        getDrawMode:wd.getDrawMode,
        setDrawMode:wd.setDrawMode,
        getConfigData:wd.getGeometryConfigData,
        initGeometry:wd.initGeometry,
        getGameObject:wd.getGeometryGameObject,

        setIndices: function (index, data) {
          wd.GeometryData.indicesMap[index] = data;
        },
        setVertices: function (index, data) {
            wd.GeometryData.verticesMap[index] = data;
        },
        setIndexType: function (type) {
            wd.GeometryData.indexType = type;
        },
        setIndexTypeSize: function (size) {
            wd.GeometryData.indexTypeSize = size;
        },
        resetData: function(){
            wd.initGeometryData(wd.DataBufferConfig, wd.GeometryData);
        }
    }
})()
