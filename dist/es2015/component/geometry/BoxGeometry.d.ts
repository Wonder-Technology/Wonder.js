import { Geometry } from "./Geometry";
export declare class BoxGeometry extends Geometry {
}
export declare var createBoxGeometry: () => BoxGeometry;
export declare var setBoxGeometryConfigData: (geometry: BoxGeometry, data: BoxGeometryConfigData) => void;
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
