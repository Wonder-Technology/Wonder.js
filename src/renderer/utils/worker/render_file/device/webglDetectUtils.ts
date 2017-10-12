import { EWebGLVersion } from "../../../../enum/EWebGLVersion";

export const isWebgl1 = (WebGLDetectData: any) => WebGLDetectData.version === EWebGLVersion.WEBGL1;

export const isWebgl2 = (WebGLDetectData: any) => WebGLDetectData.version === EWebGLVersion.WEBGL2;

