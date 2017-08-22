var lightTool = (function () {
    return {
        resetData: function () {
            var DataBufferConfig = wd.DataBufferConfig;

            wd.initWebGL2LightData(wd.AmbientLightData, wd.WebGL1DirectionLightData, wd.WebGL2PointLightData);

            wd.initWebGL2LightWorkerData(
                {
                    // ambientLightData: {
                    //     buffer: {},
                    //     count: DataBufferConfig.ambientLightDataBufferCount
                    // },
                    directionLightData: {
                        buffer: {},
                        count: DataBufferConfig.directionLightDataBufferCount
                    },
                    pointLightData: {
                        buffer: {},
                        count: DataBufferConfig.pointLightDataBufferCount
                    }
                }, wdrd.WebGL2DirectionLightWorkerData, wdrd.WebGL2PointLightWorkerData);
        }
    }
}());

