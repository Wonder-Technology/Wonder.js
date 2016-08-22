import wdCb = require("wdcb");
import Log = require("../common/Log");
import Vector2 = require("../common/Vector2");
import Vector3 = require("../common/Vector3");
import BufferReader = require("../common/BufferReader");
import ModelLoaderUtils = require("../common/ModelLoaderUtils");
import config = require("../common/Config");

export = class MD2ObjectsConverter {
    public static create() {
        var obj = new this();

        return obj;
    }

    public convert(fileBuffer:Buffer, filePath:string) {
        const HEADERNAMES = [
            'skinwidth', 'skinheight',
            'framesize',
            'num_skins', 'num_vertices', 'num_st', 'num_tris', 'num_glcmds', 'num_frames',
            'offset_skins', 'offset_st', 'offset_tris', 'offset_frames', 'offset_glcmds', 'offset_end'
        ];
        var result:Array<any> = [],
            uvs:Array<number> = [],
            verticeIndices:Array<number> = [],
            uvIndices:Array<number> = [],
            morphTargets:Array<any> = null,
            vertices:Array<number> = null,
            object:any = {},
            reader:any = new BufferReader(fileBuffer),
            info:any = {},
            header:any = {};

        header.ident = reader.readString(4);
        header.version = reader.readInt32();

        if (header.ident != "IDP2" || header.version != 8) {
            wdCb.Log.error(true, "Not a valid MD2 file");
        }

        for (let i = 0; i < HEADERNAMES.length; i++) {
            header[HEADERNAMES[i]] = reader.readInt32();
        }

        // faulty size
        if (reader.getSize() != header.offset_end) {
            wdCb.Log.error(true, "Corrupted MD2 file");
        }

        uvs = this._convertUVs(header, reader);

        //todo get texture name?
                //var textureName = null;
        //reader.seek(header.offset_skins);
        //
        //textureName = reader.readString(header.num_skins);

        [verticeIndices, uvIndices] = this._convertTriangles(header, reader);

        morphTargets = this._convertMorphTargets(header, reader);

        vertices = this._convertStaticData(morphTargets);


        //todo for flat shading?


        object.name = ModelLoaderUtils.getNameByPath(filePath);

        object.material = null;

        object.vertices = vertices;
        object.normals = [];
        object.colors = [];
        object.morphTargets = morphTargets;
        object.uvIndices = uvIndices;
        object.verticeIndices = verticeIndices;
        object.uvs = uvs;

        result.push(object);

        return result;
    }

    private  _convertUVs(header:any, reader:any) {
        var uvs = [];

        reader.seek(header.offset_st);
        for (let i = 0; i < header.num_st; i++) {
            let s = reader.readInt16() / header.skinwidth,
                t = 1 - (reader.readInt16() / header.skinheight);

            uvs.push(s);
            uvs.push(t);
        }

        return uvs;
    }

    private  _convertTriangles(header:any, reader:any) {
        var verticeIndices:Array<number> = [],
            uvIndices:Array<number> = [];

        reader.seek(header.offset_tris);
        for (let i = 0; i < header.num_tris; i++) {
            let a = reader.readInt16(),
                b = reader.readInt16(),
                c = reader.readInt16(),
                uva_i = reader.readUInt16(),
                uvb_i = reader.readUInt16(),
                uvc_i = reader.readUInt16();

            verticeIndices.push(a, b, c);
            uvIndices.push(uva_i, uvb_i, uvc_i);
        }

        return [verticeIndices, uvIndices];
    }

    private  _convertMorphTargets(header:any, reader:any) {
        var morphTargets = [],
            decimalPrecision = config.md2VerticeDecimalPrecision,
            translation = Vector3.create(),
            scale = Vector3.create();

        reader.seek(header.offset_frames);

        for (let i = 0, l = header.num_frames; i < l; i++) {
            let frame:any = {
                name: null,
                vertices: []
            };

            scale.set(
                reader.readFloat(),
                reader.readFloat(),
                reader.readFloat()
            );

            translation.set(
                reader.readFloat(),
                reader.readFloat(),
                reader.readFloat()
            );

            frame.name = reader.readString(16).replace(/[^a-z0-9]/gi,'');

            for (let j = 0; j < header.num_vertices; j++) {
                let x = reader.readUInt8(),
                    y = reader.readUInt8(),
                    z = reader.readUInt8(),
                    normal = reader.readUInt8();

                frame.vertices.push(
                    Number((x * scale.x + translation.x).toFixed(decimalPrecision)),
                    Number((z * scale.z + translation.z).toFixed(decimalPrecision)),
                    Number((y * scale.y + translation.y).toFixed(decimalPrecision))
                );
            }

            morphTargets.push(frame);
        }

        return morphTargets;
    }

    private _convertStaticData(morphTargets:Array<any>) {
        return morphTargets[0].vertices;
    }
}

