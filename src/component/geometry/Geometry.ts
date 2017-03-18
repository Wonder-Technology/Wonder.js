import { Component } from "../../core/Component";
import { Material } from "../../material/Material";
import { cloneAttributeAsCloneable, cloneAttributeAsBasicType } from "../../definition/typescript/decorator/clone";
import { JudgeUtils } from "../../utils/JudgeUtils";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { BufferContainer } from "./data/BufferContainer";
import { EDrawMode } from "../../renderer/EDrawMode";
import { ensure, it, requireCheck } from "../../definition/typescript/decorator/contract";
import {expect} from "wonder-expect.js";
import { execOnlyOnce } from "../../definition/typescript/decorator/control";
import { virtual } from "../../definition/typescript/decorator/virtual";
import { BasicBufferContainer } from "./data/BasicBufferContainer";
import { GeometryData } from "./data/GeometryData";
import { BasicGeometryData } from "./data/BasicGeometryData";
import { Face3 } from "../../structure/Face3";

export abstract class Geometry extends Component {
    private _material: Material = null;
    @cloneAttributeAsCloneable()
    get material() {
        return this._material;
    }
    set material(material: Material) {
        if (!JudgeUtils.isEqual(material, this._material)) {
            this._material = material;
            this._material.geometry = this;

            // if(this.entityObject){
            // EventManager.trigger(this.entityObject, CustomEvent.create(<any>EEngineEvent.MATERIAL_CHANGE));
            // }
        }
    }

    get geometryData() {
        if (this.buffers === null) {
            return null;
        }

        return this.buffers.geometryData;
    }

    public entityObject: GameObject;
    public buffers: BufferContainer = null;
    // public vaoManager:VAOManager = !!GPUDetector.getInstance().extensionVAO ? VAOManager.create() : null;
    @cloneAttributeAsBasicType()
    public drawMode: EDrawMode = EDrawMode.TRIANGLES;

    public abstract computeData(): GeometryDataType;

    @ensure(function() {
        var geometryData = this.buffers.geometryData;

        it(`faces.count should be be ${geometryData.indices.length / 3}, but actual is ${geometryData.faces.length}`, () => {
            expect(geometryData.faces.length * 3).equal(geometryData.indices.length);
        });
    })
    @execOnlyOnce("_isInit")
    public init() {
        var geometryData = null,
            // {
            //     vertices,
            //     faces = [],
            //     texCoords,
            //     colors,
            //     morphVertices
            //     } = this.computeData();
            computedData = this.computeData();

        this.buffers = this.createBufferContainer();

        geometryData = this.createGeometryData(computedData);

        this.buffers.geometryData = geometryData;

        this.buffers.init();

        this._material.init();

        // this.computeNormals();

        // this.vaoManager && this.vaoManager.init();
    }

    // @requireCheck(function(){
    //     it("must define buffers->geometryData", () => {
    //         expect(this.buffers).exist;
    //         expect(this.buffers.geometryData).exist;
    //     });
    // })
    // public hasFaceNormals(){
    //     return this.buffers.geometryData.hasFaceNormals();
    // }

    // @requireCheck(function(){
    //     it("must define buffers->geometryData", () => {
    //         expect(this.buffers).exist;
    //         expect(this.buffers.geometryData).exist;
    //     });
    // })
    // public hasVertexNormals(){
    //     return this.buffers.geometryData.hasVertexNormals();
    // }
    //
    // public hasColors(){
    //     return this.buffers.geometryData.hasColors();
    // }
    //
    // public isSmoothShading(){
    //     return (<StandardLightMaterial>this._material).shading === EShading.SMOOTH;
    // }

    public dispose() {
        this.buffers.dispose();

        this._material.dispose();

        // this.vaoManager && this.vaoManager.dispose();
    }

    // @requireCheck(function(){
    //     it("must define buffers->geometryData", () => {
    //         expect(this.buffers).exist;
    //         expect(this.buffers.geometryData).exist;
    //     });
    // })
    // public computeFaceNormals() {
    //     this.buffers.geometryData.computeFaceNormals();
    // }
    //
    // public computeVertexNormals(){
    //     this.buffers.geometryData.computeVertexNormals();
    // }

    @requireCheck(function() {
        it("not exist buffers", () => {
            expect(this.buffers).exist;
        });
    })
    public createBuffersFromGeometryData() {
        this.buffers.createBuffersFromGeometryData();
    }

    // @virtual
    // protected computeNormals(){
    //     if(this.isSmoothShading()){
    //         if(!this.hasVertexNormals()){
    //             this.computeVertexNormals();
    //         }
    //     }
    //     else{
    //         if(!this.hasFaceNormals()){
    //             this.computeFaceNormals();
    //         }
    //     }
    // }

    @virtual
    protected createBufferContainer(): BufferContainer {
        return BasicBufferContainer.create(this.entityObject);
    }

    @virtual
    protected createGeometryData(computedData: GeometryDataType): GeometryData {
        return this.createBasicGeometryData(computedData);
    }

    protected createBasicGeometryData(computedData: GeometryDataType) {
        var {
                    vertices,
            faces = []
            // texCoords,
            // colors
        } = computedData,
            geometryData = BasicGeometryData.create(this);

        geometryData.vertices = vertices;
        geometryData.faces = faces;
        // geometryData.texCoords = texCoords;
        // geometryData.colors = colors;

        return geometryData;
    }
}

export type GeometryDataType = {
    vertices: Array<number>;
    faces?: Array<Face3>;
    // texCoords?:Array<number>;
    // colors?:Array<number>;
};