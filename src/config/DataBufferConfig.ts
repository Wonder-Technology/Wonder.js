export const DataBufferConfig = {
    //20k
    transformDataBufferCount: 20 * 1000,
    //1000k vertices
    geometryDataBufferCount: 1000 * 1000,

    //20k
    basicMaterialDataBufferCount: 20 * 1000,
    lightMaterialDataBufferCount: 20 * 1000,


    textureDataBufferCount: 20 * 1000,


    ambientLightDataBufferCount: 1,
    directionLightDataBufferCount: 10,
    pointLightDataBufferCount: 1000,

    frontAmbientLightCount: 1,
    frontDirectionLightCount: 4,
    frontPointLightCount: 4,

    deferPointLightCount: 1000,



    renderCommandBufferCount: 10 * 1024,


    //16 or 32
    geometryIndicesBufferBits: 16
};

