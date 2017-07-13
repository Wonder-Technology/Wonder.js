export const DataBufferConfig = {
    //20k
    transformDataBufferCount: 20 * 1000,
    //1000k vertices
    geometryDataBufferCount: 1000 * 1000,

    //20k
    basicMaterialDataBufferCount: 20 * 1000,
    lightMaterialDataBufferCount: 20 * 1000,


    ambientLightDataBufferCount: 1,
    directionLightDataBufferCount: 4,


    renderCommandBufferCount: 10 * 1024,


    //16 or 32
    geometryIndicesBufferBits: 16
};

