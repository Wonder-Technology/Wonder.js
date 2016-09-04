@varDeclare
struct LayerHeightData {
    float minHeight;
    float maxHeight;
    vec4 repeatRegion;
};
uniform LayerHeightData u_layerHeightDatas[LAYER_COUNT];

//sampler2D can't be contained in struct
uniform sampler2D u_layerSampler2Ds[LAYER_COUNT];


varying vec2 v_layerTexCoord;
@end

@funcDefine
vec4 getLayerMapColor(in sampler2D layerSampler2Ds[LAYER_COUNT], in LayerHeightData layerHeightDatas[LAYER_COUNT]){
    vec4 color = vec4(0.0);
    bool isInLayer = false;

    float height = v_worldPosition.y;

    for(int i = 0; i < LAYER_COUNT; i++){
        if(height >= layerHeightDatas[i].minHeight && height < layerHeightDatas[i].maxHeight){
            vec4 repeatRegion = layerHeightDatas[i].repeatRegion;

            //todo blend color
            //todo optimize:move 'v_layerTexCoord * repeatRegion.zw + repeatRegion.xy' to vertex shader?
            color += texture2D(layerSampler2Ds[i], v_layerTexCoord * repeatRegion.zw + repeatRegion.xy);

            isInLayer = true;

            break;
        }
    }

    return isInLayer ? color : vec4(1.0);
}
@end


@body

totalColor *= getLayerMapColor(u_layerSampler2Ds, u_layerHeightDatas);
@end
