/// <reference path="../../../node_modules/wdcb/dist/wdCb.node.d.ts"/>
var wdCb = require("wdcb");
var Vector3 = require("../common/Vector3");
var BufferReader = require("../common/BufferReader");
var ModelLoaderUtils = require("../common/ModelLoaderUtils");
var config = require("../common/Config");
module.exports = (function () {
    function MD2ObjectsConverter() {
    }
    MD2ObjectsConverter.create = function () {
        var obj = new this();
        return obj;
    };
    MD2ObjectsConverter.prototype.convert = function (fileBuffer, filePath) {
        var HEADERNAMES = [
            'skinwidth', 'skinheight',
            'framesize',
            'num_skins', 'num_vertices', 'num_st', 'num_tris', 'num_glcmds', 'num_frames',
            'offset_skins', 'offset_st', 'offset_tris', 'offset_frames', 'offset_glcmds', 'offset_end'
        ];
        var result = [], uvs = [], verticeIndices = [], uvIndices = [], morphTargets = null, vertices = null, object = {}, reader = new BufferReader(fileBuffer), info = {}, header = {};
        header.ident = reader.readString(4);
        header.version = reader.readInt32();
        if (header.ident != "IDP2" || header.version != 8) {
            //info.status = "Not a valid MD2 file";
            //return result;
            wdCb.Log.error(true, "Not a valid MD2 file");
        }
        for (var i = 0; i < HEADERNAMES.length; i++) {
            header[HEADERNAMES[i]] = reader.readInt32();
        }
        //console.log(reader.getSize(), header.offset_end);
        // faulty size
        if (reader.getSize() != header.offset_end) {
            //info.status = "Corrupted MD2 file";
            //return returnObject;
            wdCb.Log.error(true, "Corrupted MD2 file");
        }
        uvs = this._convertUVs(header, reader);
        //todo get texture name?
        //// texture name
        //var textureName = null;
        //reader.seek(header.offset_skins);
        //
        //textureName = reader.readString(header.num_skins);
        _a = this._convertTriangles(header, reader), verticeIndices = _a[0], uvIndices = _a[1];
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
        var _a;
    };
    MD2ObjectsConverter.prototype._convertUVs = function (header, reader) {
        var uvs = [];
        reader.seek(header.offset_st);
        for (var i = 0; i < header.num_st; i++) {
            var s = reader.readInt16() / header.skinwidth, t = 1 - (reader.readInt16() / header.skinheight);
            uvs.push(s);
            uvs.push(t);
        }
        return uvs;
    };
    MD2ObjectsConverter.prototype._convertTriangles = function (header, reader) {
        var verticeIndices = [], uvIndices = [];
        reader.seek(header.offset_tris);
        for (var i = 0; i < header.num_tris; i++) {
            var a = reader.readInt16(), b = reader.readInt16(), c = reader.readInt16(), uva_i = reader.readUInt16(), uvb_i = reader.readUInt16(), uvc_i = reader.readUInt16();
            verticeIndices.push(a, b, c);
            uvIndices.push(uva_i, uvb_i, uvc_i);
        }
        return [verticeIndices, uvIndices];
    };
    MD2ObjectsConverter.prototype._convertMorphTargets = function (header, reader) {
        var morphTargets = [], decimalPrecision = config.md2VerticeDecimalPrecision, translation = Vector3.create(), scale = Vector3.create();
        reader.seek(header.offset_frames);
        for (var i = 0, l = header.num_frames; i < l; i++) {
            var frame = {
                name: null,
                vertices: []
            };
            scale.set(reader.readFloat(), reader.readFloat(), reader.readFloat());
            translation.set(reader.readFloat(), reader.readFloat(), reader.readFloat());
            frame.name = reader.readString(16).replace(/[^a-z0-9]/gi, '');
            for (var j = 0; j < header.num_vertices; j++) {
                var x = reader.readUInt8(), y = reader.readUInt8(), z = reader.readUInt8(), normal = reader.readUInt8();
                frame.vertices.push(Number((x * scale.x + translation.x).toFixed(decimalPrecision)), Number((z * scale.z + translation.z).toFixed(decimalPrecision)), Number((y * scale.y + translation.y).toFixed(decimalPrecision)));
            }
            morphTargets.push(frame);
        }
        return morphTargets;
    };
    MD2ObjectsConverter.prototype._convertStaticData = function (morphTargets) {
        return morphTargets[0].vertices;
    };
    return MD2ObjectsConverter;
})();
