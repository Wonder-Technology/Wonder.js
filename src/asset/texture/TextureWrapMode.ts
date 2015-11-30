module wd{
    export enum TextureWrapMode{
        REPEAT = <any>"REPEAT",
        MIRRORED_REPEAT = <any>"MIRRORED_REPEAT",
        CLAMP_TO_EDGE = <any>"CLAMP_TO_EDGE"
    }
}

//// 用来指定纹理的覆盖模式,有RepeatWrapping平铺(重复),ClampToEdgeWrapping(夹取),MirroredRepeatWrapping(镜像)
//
//THREE.RepeatWrapping = 1000;	//RepeatWrapping平铺(重复),a任何超过1.0的值都被置为0.0。纹理被重复一次。
////三维系统中最常用的寻址模式之一。在渲染具有诸如砖墙之类纹理的物体时，如果使用包含一整张砖墙的纹理贴图会占用较多的内存，
////通常只需载入一张具有一块或多块砖瓦的较小的纹理贴图，再把它按照重叠纹理寻址模式在物体表面映射多次，就可以达到和使用整张砖墙贴图同样的效果。
//THREE.ClampToEdgeWrapping = 1001;	//ClampToEdgeWrapping(夹取),超过1.0的值被固定为1.0。超过1.0的其它地方的纹理，沿用最后像素的纹理。用于当叠加过滤时，需要从0.0到1.0精确覆盖且没有模糊边界的纹理。
//THREE.MirroredRepeatWrapping = 1002;	//MirroredRepeatWrapping(镜像),每到边界处纹理翻转，意思就是每个1.0 u或者v处纹理被镜像翻转。
