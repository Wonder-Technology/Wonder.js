var geometryTool = (function () {
    return {
        create: wd.createGeometry,
        getVertices:wd.getVertices,
        getNormals:wd.getNormals,
        getTexCoords:wd.getTexCoords,
        getIndices:wd.getIndices,
        getDrawMode:wd.getDrawMode,
        getConfigData:wd.getGeometryConfigData,
        initGeometry:wd.initGeometry,
        getGameObject:wd.getGeometryGameObject,

        hasIndices: function(index){
            return wd.hasGeometryIndices(index, wd.GeometryData);
        },
        setIndices: function (index, data) {
          wd.setGeometryIndices(index, data, wd.GeometryData);
        },
        setVertices: function (index, data) {
            wd.setGeometryVertices(index, data, wd.GeometryData);
        }
    }
})()
