import { Face3 } from "../../structure/Face3";
import { Vector3 } from "../../math/Vector3";
export declare class GeometryUtils {
    static convertToFaces(indices: Array<number>, normals?: Array<number>): Array<Face3>;
    static hasData(data: any): boolean;
    static getThreeComponent(sourceData: Array<number>, index: number): Vector3;
    static iterateThreeComponent(dataArr: Array<number>, iterator: (v: Vector3) => void): void;
    static setThreeComponent(targetData: Array<number>, sourceData: Vector3, index: number): any;
    static setThreeComponent(targetData: Array<number>, sourceData: Array<number>, index: number): any;
}
