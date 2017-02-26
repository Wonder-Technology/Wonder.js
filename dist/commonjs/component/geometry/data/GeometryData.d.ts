import { Geometry } from "../Geometry";
import { Face3 } from "../../../structure/Face3";
export declare abstract class GeometryData {
    constructor(geometry: Geometry);
    private _vertices;
    vertices: Array<number>;
    readonly indices: Array<number>;
    private _faces;
    faces: Array<Face3>;
    protected geometry: Geometry;
    private _indiceCache;
    private _indiceDirty;
    dispose(): void;
    protected onChangeFace(): void;
}
