let minBufferSize () :unit => DataBufferConfig.dataBufferConfig.transformDataBufferCount = 5;


let setBufferSize ::transformDataBufferCount=10 () :unit => DataBufferConfig.dataBufferConfig.transformDataBufferCount = transformDataBufferCount;