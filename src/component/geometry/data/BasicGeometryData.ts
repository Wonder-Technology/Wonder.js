import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import { GeometryData } from "./GeometryData";
import { Geometry } from "../Geometry";

@registerClass("BasicGeometryData")
export class BasicGeometryData extends GeometryData {
    public static create(geometry: Geometry) {
        var obj = new this(geometry);

        return obj;
    }
}