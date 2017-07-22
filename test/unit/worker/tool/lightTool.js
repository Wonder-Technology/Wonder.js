var lightTool = (function () {
    return {
        resetData: function () {
            var DataBufferConfig = wd.DataBufferConfig;

            wd.initLightData(wd.AmbientLightData, wd.DirectionLightData, wd.PointLightData);

            wd.initLightWorkerData(
                {
                    ambientLightData: {
                        buffer: {},
                        count: DataBufferConfig.ambientLightDataBufferCount
                    },
                    directionLightData: {
                        buffer: {},
                        count: DataBufferConfig.directionLightDataBufferCount,
                        directionLightGLSLDataStructureMemberNameArr: []
                    },
                    pointLightData: {
                        buffer: {},
                        count: DataBufferConfig.pointLightDataBufferCount
                    }
                }, wdrd.AmbientLightWorkerData, wdrd.DirectionLightWorkerData, wdrd.PointLightWorkerData);
        },
    }
}());

