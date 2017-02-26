import { Component } from "../../core/Component";
import { Material } from "../../material/Material";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { BufferContainer } from "./data/BufferContainer";
import { EDrawMode } from "../../renderer/EDrawMode";
import { GeometryData } from "./data/GeometryData";
import { BasicGeometryData } from "./data/BasicGeometryData";
import { Face3 } from "../../structure/Face3";
export declare abstract class Geometry extends Component {
    private _material;
    material: Material;
    readonly geometryData: GeometryData;
    entityObject: GameObject;
    buffers: BufferContainer;
    drawMode: EDrawMode;
    abstract computeData(): GeometryDataType;
    init(): void;
    dispose(): void;
    createBuffersFromGeometryData(): void;
    protected createBufferContainer(): BufferContainer;
    protected createGeometryData(computedData: GeometryDataType): GeometryData;
    protected createBasicGeometryData(computedData: GeometryDataType): BasicGeometryData;
}
export declare type GeometryDataType = {
    vertices: Array<number>;
    faces?: Array<Face3>;
};
