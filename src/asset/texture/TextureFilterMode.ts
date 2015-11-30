module wd{
    export enum TextureFilterMode{
        NEAREST = <any>"NEAREST",
        NEAREST_MIPMAP_MEAREST = <any>"NEAREST_MIPMAP_MEAREST",
        NEAREST_MIPMAP_LINEAR = <any>"NEAREST_MIPMAP_LINEAR",
        LINEAR = <any>"LINEAR",
        LINEAR_MIPMAP_NEAREST = <any>"LINEAR_MIPMAP_NEAREST",
        LINEAR_MIPMAP_LINEAR = <any>"LINEAR_MIPMAP_LINEAR"
    }
}
//// 纹理在放大或缩小时的过滤方式,过滤方式,有THREE.NearestFilter在纹理基层上执行最邻近过滤,THREE.NearestMipMapNearestFilter在mip层之间执行线性插补，并执行最临近的过滤,
////THREE.NearestMipMapLinearFilter选择最临近的mip层，并执行最临近的过滤,THREE.LinearFilter在纹理基层上执行线性过滤
////THREE.LinearMipMapNearestFilter选择最临近的mip层，并执行线性过滤,THREE.LinearMipMapLinearFilter在mip层之间执行线性插补，并执行线性过滤
//
//THREE.NearestFilter = 1003;		//THREE.NearestFilter在纹理基层上执行最邻近过滤
//THREE.NearestMipMapNearestFilter = 1004;	//THREE.NearestMipMapNearestFilter在mip层之间执行线性插补，并执行最临近的过滤
//THREE.NearestMipMapLinearFilter = 1005;		//THREE.NearestMipMapLinearFilter选择最临近的mip层，并执行最临近的过滤
//THREE.LinearFilter = 1006;					//THREE.LinearFilter在纹理基层上执行线性过滤
//THREE.LinearMipMapNearestFilter = 1007;		//THREE.LinearMipMapNearestFilter选择最临近的mip层，并执行线性过滤
//THREE.LinearMipMapLinearFilter = 1008;		//THREE.LinearMipMapLinearFilter在mip层之间执行线性插补，并执行线性过滤

