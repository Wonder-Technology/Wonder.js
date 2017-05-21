var geometryTool = (function () {
    return {
        create: wd.createGeometry,
        getVertices:wd.getVertices,
        getIndices:wd.getIndices,

        resetData: function(){
            // var GeometryData = wd.GeometryData;
            //
            // // GeometryData.freeIndiceQueue = [];
            // // GeometryData.generationArr = [];
            //
            // GeometryData.uid = 0;
            //
            // GeometryData.isAliveMap = {};
            //
            // GeometryData.componentMap = {};
            // GeometryData.parentMap = {};
            // GeometryData.childrenMap = {};

            wd.initGeometryData(wd.DataBufferConfig, wd.GeometryData);
        }
    }
})()
