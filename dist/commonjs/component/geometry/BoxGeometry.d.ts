import { Geometry } from "./Geometry";
export declare class BoxGeometry extends Geometry {
}
export declare const createBoxGeometry: () => BoxGeometry;
export declare const setBoxGeometryConfigData: (geometry: BoxGeometry, data: BoxGeometryConfigData) => void;
export declare type BoxGeometryConfigDataMap = {
    [index: number]: BoxGeometryConfigData;
};
export declare type BoxGeometryConfigData = {
    width?: number;
    height?: number;
    depth?: number;
    widthSegments?: number;
    heightSegments?: number;
    depthSegments?: number;
};
