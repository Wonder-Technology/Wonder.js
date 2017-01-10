import wdCb = require("wdcb");
import Log = require("../../../ts/Log");
import Vector3 = require("../../../ts/Vector3");
import BufferReader = require("../../common/BufferReader");
import ModelLoaderUtils = require("../../common/ModelLoaderUtils");
import config = require("../../common/Config");

export = class MD2ObjectsConverter {
    public static create() {
        var obj = new this();

        return obj;
    }

    public convert(json:any,fileBuffer:Buffer, nodeName:string) {
        const HEADERNAMES = [
            'skinwidth', 'skinheight',
            'framesize',
            'num_skins', 'num_vertices', 'num_st', 'num_tris', 'num_glcmds', 'num_frames',
            'offset_skins', 'offset_st', 'offset_tris', 'offset_frames', 'offset_glcmds', 'offset_end'
        ];
        var texCoords:Array<number> = [],
            verticeIndices:Array<number> = [],
            texCoordIndices:Array<number> = [],
            morphTargets:Array<any> = null,
            vertices:Array<number> = null,
            object:any = {},
            reader:any = BufferReader.create(fileBuffer),
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

        texCoords = this._convertTexCoords(header, reader);

        //todo get texture name?
        //var textureName = null;
        //reader.seek(header.offset_skins);
        //
        //textureName = reader.readString(header.num_skins);

        [verticeIndices, texCoordIndices] = this._convertTriangles(header, reader);

        morphTargets = this._convertMorphTargets(header, reader);

        vertices = this._convertStaticData(morphTargets);


        //todo for flat shading?

        let nodes = {},
            meshId = `${nodeName}_mesh`;

        json.nodes = nodes;

        nodes[nodeName] = {
            children:[],
            matrix:[
                1,
                0,
                0,
                0,

                0,
                1,
                0,
                0,

                0,
                0,
                1,
                0,

                0,
                0,
                0,
                1
            ],
            mesh:meshId,
            name:nodeName
        };

        let meshes = {};

        json.meshes = meshes;

        meshes[meshId] = {
            name:meshId,
            primitives:[
                {
                    attributes:{
                        POSITION:vertices,
                        TEXCOORD:texCoords
                    },
                    morphTargets:morphTargets,
                    verticeIndices: verticeIndices,
                    texCoordIndices: texCoordIndices,
                    // material:null,
                    mode:4
                }
            ]
        }
    }

    private  _convertTexCoords(header:any, reader:any) {
        var texCoords = [];

        reader.seek(header.offset_st);
        for (let i = 0; i < header.num_st; i++) {
            let s = reader.readInt16() / header.skinwidth,
                t = 1 - (reader.readInt16() / header.skinheight);

            texCoords.push(s);
            texCoords.push(t);
        }

        return texCoords;
    }

    private  _convertTriangles(header:any, reader:any) {
        var verticeIndices:Array<number> = [],
            texCoordIndices:Array<number> = [];

        reader.seek(header.offset_tris);
        for (let i = 0; i < header.num_tris; i++) {
            let a = reader.readInt16(),
                b = reader.readInt16(),
                c = reader.readInt16(),
                texCoorda_i = reader.readUInt16(),
                texCoordb_i = reader.readUInt16(),
                texCoordc_i = reader.readUInt16();

            verticeIndices.push(a, b, c);
            texCoordIndices.push(texCoorda_i, texCoordb_i, texCoordc_i);
        }

        return [verticeIndices, texCoordIndices];
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

