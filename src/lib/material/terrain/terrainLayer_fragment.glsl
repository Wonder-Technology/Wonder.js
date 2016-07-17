@varDeclare
struct LayerHeightData {
    float minHeight;
    float maxHeight;
};
uniform LayerHeightData u_layerHeightDatas[LAYER_COUNT];

//sampler2D can't be contained in struct
uniform sampler2D u_layerSampler2Ds[LAYER_COUNT];


varying vec2 v_layerTexCoord;
@end

@funcDefine
vec4 getLayerTextureColor(in sampler2D layerSampler2Ds[LAYER_COUNT], in LayerHeightData layerHeightDatas[LAYER_COUNT]){
    vec4 color = vec4(0.0);
    bool isInLayer = false;

    float height = v_worldPosition.y;

    for(int i = 0; i < LAYER_COUNT; i++){
        if(height >= layerHeightDatas[i].minHeight && height <= layerHeightDatas[i].maxHeight){
            //todo blend color
            color += texture2D(layerSampler2Ds[i], v_layerTexCoord);

            isInLayer = true;

            break;
        }
    }

    return isInLayer ? color : vec4(1.0);
}
@end


@body

totalColor *= getLayerTextureColor(u_layerSampler2Ds, u_layerHeightDatas);
@end
