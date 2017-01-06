"use strict";
var wdCb = require("wdcb");
var Vector3 = require("../../ts/Vector3");
var BufferReader = require("../common/BufferReader");
var config = require("../common/Config");
module.exports = (function () {
    function MD2ObjectsConverter() {
    }
    MD2ObjectsConverter.create = function () {
        var obj = new this();
        return obj;
    };
    MD2ObjectsConverter.prototype.convert = function (json, fileBuffer, nodeName) {
        var HEADERNAMES = [
            'skinwidth', 'skinheight',
            'framesize',
            'num_skins', 'num_vertices', 'num_st', 'num_tris', 'num_glcmds', 'num_frames',
            'offset_skins', 'offset_st', 'offset_tris', 'offset_frames', 'offset_glcmds', 'offset_end'
        ];
        var texCoords = [], verticeIndices = [], texCoordIndices = [], morphTargets = null, vertices = null, object = {}, reader = BufferReader.create(fileBuffer), info = {}, header = {};
        header.ident = reader.readString(4);
        header.version = reader.readInt32();
        if (header.ident != "IDP2" || header.version != 8) {
            wdCb.Log.error(true, "Not a valid MD2 file");
        }
        for (var i = 0; i < HEADERNAMES.length; i++) {
            header[HEADERNAMES[i]] = reader.readInt32();
        }
        if (reader.getSize() != header.offset_end) {
            wdCb.Log.error(true, "Corrupted MD2 file");
        }
        texCoords = this._convertTexCoords(header, reader);
        _a = this._convertTriangles(header, reader), verticeIndices = _a[0], texCoordIndices = _a[1];
        morphTargets = this._convertMorphTargets(header, reader);
        vertices = this._convertStaticData(morphTargets);
        var nodes = {}, meshId = nodeName + "_mesh";
        json.nodes = nodes;
        nodes[nodeName] = {
            children: [],
            matrix: [
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
            mesh: meshId,
            name: nodeName
        };
        var meshes = {};
        json.meshes = meshes;
        meshes[meshId] = {
            name: meshId,
            primitives: [
                {
                    attributes: {
                        POSITION: vertices,
                        TEXCOORD: texCoords
                    },
                    morphTargets: morphTargets,
                    verticeIndices: verticeIndices,
                    texCoordIndices: texCoordIndices,
                    mode: 4
                }
            ]
        };
        var _a;
    };
    MD2ObjectsConverter.prototype._convertTexCoords = function (header, reader) {
        var texCoords = [];
        reader.seek(header.offset_st);
        for (var i = 0; i < header.num_st; i++) {
            var s = reader.readInt16() / header.skinwidth, t = 1 - (reader.readInt16() / header.skinheight);
            texCoords.push(s);
            texCoords.push(t);
        }
        return texCoords;
    };
    MD2ObjectsConverter.prototype._convertTriangles = function (header, reader) {
        var verticeIndices = [], texCoordIndices = [];
        reader.seek(header.offset_tris);
        for (var i = 0; i < header.num_tris; i++) {
            var a = reader.readInt16(), b = reader.readInt16(), c = reader.readInt16(), texCoorda_i = reader.readUInt16(), texCoordb_i = reader.readUInt16(), texCoordc_i = reader.readUInt16();
            verticeIndices.push(a, b, c);
            texCoordIndices.push(texCoorda_i, texCoordb_i, texCoordc_i);
        }
        return [verticeIndices, texCoordIndices];
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
}());
