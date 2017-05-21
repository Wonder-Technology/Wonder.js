import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { initData } from "./GeometrySystem";
import { DataBufferConfig } from "../../config/DataBufferConfig";
import { GeometryData } from "./GeometryData";

registerClass("Geometry")
export abstract class Geometry{
    public index:number = null;
}

initData(DataBufferConfig, GeometryData);
