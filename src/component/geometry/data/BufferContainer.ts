import { GameObject } from "../../../core/entityObject/gameObject/GameObject";
import { GeometryData } from "./GeometryData";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { Buffer } from "../../../renderer/buffer/Buffer";
import { ElementBuffer } from "../../../renderer/buffer/ElementBuffer";
import { virtual } from "../../../definition/typescript/decorator/virtual";
import { EBufferDataType } from "../../../renderer/buffer/EBufferDataType";
import { require, it } from "../../../definition/typescript/decorator/contract";
import { expect } from "chai";
import { EBufferType } from "../../../renderer/buffer/EBufferType";
import { EBufferUsage } from "../../../renderer/buffer/EBufferUsage";
import { ArrayBuffer } from "../../../renderer/buffer/ArrayBuffer";
import { cache } from "../../../definition/typescript/decorator/cache";
import { BufferDataTable } from "../../../renderer/buffer/BufferDataTable";

export abstract class BufferContainer {
    constructor(entityObject: GameObject) {
        this.entityObject = entityObject;
    }

    public geometryData: GeometryData = null;

    protected entityObject: GameObject = null;
    protected container: Hash<Buffer> = Hash.create<Buffer>();

    // private _colorBuffer:ArrayBuffer = null;
    // private _texCoordBuffer:ArrayBuffer = null;
    // private _tangentBuffer:ArrayBuffer = null;
    private _indiceBuffer: ElementBuffer = null;

    // public abstract getBufferForRenderSort():Buffer;

    @virtual
    public createBuffersFromGeometryData() {
        this.getChild(EBufferDataType.VERTICE);
        // this.getChild(EBufferDataType.NORMAL);
        // this.getChild(EBufferDataType.TANGENT);
        // this.getChild(EBufferDataType.COLOR);
        this.getChild(EBufferDataType.INDICE);
        // this.getChild(EBufferDataType.TEXCOORD);
    }

    public removeCache(type: EBufferDataType);
    public removeCache(name: string);

    public removeCache(...args) {
        this.container.removeChild(args[0]);
    }


    public getChild(type: EBufferDataType);
    public getChild(type: EBufferDataType, dataName: string);

    @require(function(...args) {
        it("test arguments", function() {
            if (args.length === 2) {
                let dataName = args[1];

                expect(dataName).exist;
                expect(dataName).be.a("string");
            }
        });
    })
    public getChild(...args) {
        var type = args[0],
            result: any = null;

        switch (type) {
            case EBufferDataType.VERTICE:
                result = this.getVertice(type);
                break;
            // case EBufferDataType.NORMAL:
            //     result = this.getNormal(type);
            //     break;
            // case EBufferDataType.TANGENT:
            //     result = this._getTangent(type);
            //     break;
            // case EBufferDataType.COLOR:
            //     result = this._getColor(type);
            //     break;
            case EBufferDataType.INDICE:
                result = this._getIndice(type);
                break;
            // case EBufferDataType.TEXCOORD:
            //     result = this._getTexCoord(type);
            //     break;
            // case EBufferDataType.CUSTOM:
            //     result = this.getCustomData(args[1]);
            //     break;
            default:
                // result = this.getBuffer(type);
                break;
        }

        return result;

    }

    public init() {
    }

    public dispose() {
        this.container.forEach((buffer: Buffer) => {
            buffer.dispose();
        });

        this.geometryData.dispose();
    }

    protected abstract getVertice(type: EBufferDataType);
    // protected abstract getNormal(type:EBufferDataType);

    // @virtual
    // protected getCustomData(dataName:string){
    //     return null;
    // }

    // @virtual
    // protected getBuffer(type:EBufferDataType){
    //     Log.error(true, wdCb.Log.info.FUNC_UNKNOW(`EBufferDataType: ${type}`));
    //
    //     return null;
    // }

    protected createOnlyOnceAndUpdateArrayBuffer(bufferAttriName: string, data: Array<number>, size: number, type: EBufferType = EBufferType.FLOAT, offset: number = 0, usage: EBufferUsage = EBufferUsage.STATIC_DRAW) {
        var buffer: ArrayBuffer = this[bufferAttriName];

        if (buffer) {
            buffer.resetData(data, size, type, offset);

            return;
        }

        this[bufferAttriName] = ArrayBuffer.create(data, size, type, usage);
    }

    protected createOnlyOnceAndUpdateElememntBuffer(bufferAttriName: string, data: Array<number>, type: EBufferType = null, offset: number = 0, usage: EBufferUsage = EBufferUsage.STATIC_DRAW) {
        var buffer: ElementBuffer = this[bufferAttriName];

        if (buffer) {
            buffer.resetData(data, type, offset);

            return;
        }

        this[bufferAttriName] = ElementBuffer.create(data, type, usage);
    }

    //protected createBufferOnlyOnce(bufferAttriName:string, bufferClass:any, data:Float32Array, size:number, type:EBufferType, usage:EBufferUsage = EBufferUsage.STATIC_DRAW):boolean{
    //    if(this[bufferAttriName]){
    //        return false;
    //    }
    //
    //    this[bufferAttriName] = bufferClass.create(data, size, type,usage);
    //
    //    return true;
    //}

    protected hasData(data: Array<number> | null) {
        return !!data && data.length > 0;
    }

    // @cache(function(type:EBufferDataType){
    //     return this.container.hasChild(<any>type) && !this._needReCalcuteTangent(type);
    // }, function(type){
    //     return this.container.getChild(<any>type)
    // }, function(result, type){
    //     this.container.addChild(<any>type, result);
    // })
    // private _getTangent(type){
    //     var geometryData = null;
    //
    //     geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];
    //
    //     if(!this.hasData(geometryData)){
    //         return null;
    //     }
    //
    //     this.createOnlyOnceAndUpdateArrayBuffer("_tangentBuffer", geometryData, 3);
    //
    //     return this._tangentBuffer;
    // }
    //
    // @cache(function(type:EBufferDataType){
    //     return this.container.hasChild(<any>type);
    // }, function(type){
    //     return this.container.getChild(<any>type)
    // }, function(result, type){
    //     this.container.addChild(<any>type, result);
    // })
    // private _getColor(type) {
    //     var geometryData = null;
    //
    //     geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];
    //
    //     if(!this.hasData(geometryData)){
    //         return null;
    //     }
    //
    //     this.createOnlyOnceAndUpdateArrayBuffer("_colorBuffer", geometryData, 3);
    //
    //     return this._colorBuffer;
    // }

    @cache(function(type: EBufferDataType) {
        return this.container.hasChild(<any>type);
    }, function(type) {
        return this.container.getChild(<any>type)
    }, function(result, type) {
        this.container.addChild(<any>type, result);
    })
    private _getIndice(type) {
        var geometryData = null;

        geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];

        if (!this.hasData(geometryData)) {
            return null;
        }

        this.createOnlyOnceAndUpdateElememntBuffer("_indiceBuffer", geometryData);

        return this._indiceBuffer;
    }

    // @cache(function(type:EBufferDataType){
    //     return this.container.hasChild(<any>type);
    // }, function(type){
    //     return this.container.getChild(<any>type)
    // }, function(result, type){
    //     this.container.addChild(<any>type, result);
    // })
    // private _getTexCoord(type){
    //     var geometryData = null,
    //         isCreatBuffer:boolean = null;
    //
    //     geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];
    //
    //     if(!this.hasData(geometryData)){
    //         return null;
    //     }
    //
    //     this.createOnlyOnceAndUpdateArrayBuffer("_texCoordBuffer", geometryData, 2);
    //
    //     return this._texCoordBuffer;
    // }
    //
    // private _needReCalcuteTangent(type:EBufferDataType){
    //     return this.geometryData.tangentDirty && type === EBufferDataType.TANGENT;
    // }
}