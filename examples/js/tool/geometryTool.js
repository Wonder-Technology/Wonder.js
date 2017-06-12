var geometryTool = (function () {
    return {
        create: wd.createGeometry,
        getVertices:wd.getVertices,
        getIndices:wd.getIndices,
        getDrawMode:wd.getDrawMode,
        getConfigData:wd.getGeometryConfigData,
        initGeometry:wd.initGeometry,
        getGameObject:wd.getGeometryGameObject,

        setIndices: function (index, data) {
          wd.setGeometryIndices(index, data, wd.GeometryData);
        },
        setVertices: function (index, data) {
            wd.setGeometryVertices(index, data, wd.GeometryData);
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
