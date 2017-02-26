import { Geometry } from "./Geometry";
import { Face3 } from "../../structure/Face3";
export declare class BoxGeometry extends Geometry {
    static create(): BoxGeometry;
    width: number;
    height: number;
    depth: number;
    widthSegments: number;
    heightSegments: number;
    depthSegments: number;
    computeData(): {
        vertices: any[];
        faces: Face3[];
    };
}
