var lightTool = (function () {
    return {
        resetData: function () {
            var DataBufferConfig = wd.DataBufferConfig;

            wd.initLightData(wd.AmbientLightData, wd.DirectionLightData, wd.PointLightData);

            wd.initLightWorkerData(
                {
                    ambientLightData: {
                        buffer: null,
                        count: DataBufferConfig.ambientLightDataBufferCount
                    },
                    directionLightData: {
                        buffer: null,
                        count: DataBufferConfig.directionLightDataBufferCount,
                        directionLightGLSLDataStructureMemberNameArr: []
                    },
                    pointLightData: {
                        buffer: null,
                        count: DataBufferConfig.pointLightDataBufferCount
                    }
                }, wdrd.AmbientLightWorkerData, wdrd.DirectionLightWorkerData, wdrd.PointLightWorkerData);
        },
    }
}());

