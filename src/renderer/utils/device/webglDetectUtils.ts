import { EWebGLVersion } from "../../enum/EWebGLVersion";

export var isWebgl1 = (WebGLDetectData:any) => WebGLDetectData.version === EWebGLVersion.WEBGL1;

export var isWebgl2 = (WebGLDetectData:any) => WebGLDetectData.version === EWebGLVersion.WEBGL2;

