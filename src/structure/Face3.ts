import { registerClass } from "../definition/typescript/decorator/registerClass";
import { Vector3 } from "../math/Vector3";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { cloneAttributeAsCloneable, cloneAttributeAsBasicType, cloneAttributeAsCustomType, CloneUtils } from "../definition/typescript/decorator/clone";

@registerClass("Face3")
export class Face3 {
    public static create(aIndex: number, bIndex: number, cIndex: number, faceNormal: Vector3 = null, vertexNormals: Collection<Vector3> = Collection.create<Vector3>()) {
        var obj = new this(aIndex, bIndex, cIndex, faceNormal, vertexNormals);

        return obj;
    }

    constructor(aIndex: number, bIndex: number, cIndex: number, faceNormal: Vector3, vertexNormals: Collection<Vector3>) {
        this.aIndex = aIndex;
        this.bIndex = bIndex;
        this.cIndex = cIndex;
        this._faceNormal = faceNormal;
        this.vertexNormals = vertexNormals;
    }

    @cloneAttributeAsCloneable()
    private _faceNormal: Vector3 = null;
    get faceNormal() {
        return this._faceNormal !== null ? this._faceNormal : Vector3.create(0, 0, 0);
    }
    set faceNormal(faceNormal: Vector3) {
        this._faceNormal = faceNormal;
    }

    @cloneAttributeAsBasicType()
    public aIndex: number = null;
    @cloneAttributeAsBasicType()
    public bIndex: number = null;
    @cloneAttributeAsBasicType()
    public cIndex: number = null;
    @cloneAttributeAsCustomType(function(source: Face3, target: Face3, memberName: string) {
        target[memberName] = source[memberName].clone(true);
    })
    public vertexNormals: Collection<Vector3> = null;

    public clone() {
        return CloneUtils.clone(this);
    }

    public hasFaceNormal() {
        return this._faceNormal !== null;
    }

    public hasVertexNormal() {
        return this.vertexNormals.getCount() > 0;
    }
}