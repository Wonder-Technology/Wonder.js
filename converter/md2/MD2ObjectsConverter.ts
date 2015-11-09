/// <reference path="../../node_modules/dycb/dist/dyCb.node.d.ts"/>
import dyCb = require("dycb");
import Log = require("../common/Log");
import Vector2 = require("../common/Vector2");
import Vector3 = require("../common/Vector3");
import BufferReader = require("./DataView");

//var _getThreeComponentData = (sourceData:dyCb.Collection<number>, index:number) => {
    var _getThreeComponentData = (sourceData, index:number) => {
    var startIndex = 3 * index;

    return Vector3.create(
        sourceData[startIndex],
        sourceData[startIndex + 1],
        sourceData[startIndex + 2]
    );
}

export = class MD2ObjectsConverter {
    public static create() {
        var obj = new this();

        return obj;
    }
    //
    //public objects:dyCb.Collection<ObjectModel> = dyCb.Collection.create<ObjectModel>();
    //public mtlFilePath:string = null;
    //public vertices:dyCb.Collection<number> = dyCb.Collection.create<number>();
    //public normals:dyCb.Collection<number> = dyCb.Collection.create<number>();
    //public texCoords:dyCb.Collection<number> = dyCb.Collection.create<number>();
    //public indices:dyCb.Collection<number> = dyCb.Collection.create<number>();
    //public materialName:string = null;
    //public name:string = null;
    //public faces:dyCb.Collection<FaceModel> = dyCb.Collection.create<FaceModel>();
    //public indicesCount:number = 0;
    //
    //private _vertices:dyCb.Collection<number> = dyCb.Collection.create<number>();
    //private _normals:dyCb.Collection<number> = dyCb.Collection.create<number>();
    //private _texCoords:dyCb.Collection<number> = dyCb.Collection.create<number>();
    //private _currentObject:ObjectModel = null;
    //private _currentObjectName:string = null;

    public convert(fileBuffer:Buffer, filePath:string, isComputeNormals:boolean) {
        var result:any = [],
            object:any = {};

        //var reader = new BufferReader(fileBuffer);

        //var data = new DataView( buffer );

        var header:any = {};
        var headerNames = [
            'ident', 'version',
            'skinwidth', 'skinheight',
            'framesize',
            'num_skins', 'num_vertices', 'num_st', 'num_tris', 'num_glcmds', 'num_frames',
            'offset_skins', 'offset_st', 'offset_tris', 'offset_frames', 'offset_glcmds', 'offset_end'
        ];

        for ( var i = 0; i < headerNames.length; i ++ ) {

            //todo LE?BE?
            header[ headerNames[ i ] ] = fileBuffer.readInt32LE( i * 4, true );

        }

        if ( header.ident !== 844121161 || header.version !== 8 ) {

            console.error( 'Not a valid MD2 file' );
            return;

        }

        if ( header.offset_end !== fileBuffer.length ) {
            console.error( 'Corrupted MD2 file' );
            return;
        }





        // uvs
        //todo get texture name/url?

        var uvs = [];
        var offset = header.offset_st;

        for ( var i = 0, l = header.num_st; i < l; i ++ ) {

            var u = fileBuffer.readInt16LE( offset + 0, true );
            var v = fileBuffer.readInt16LE( offset + 2, true );

            //uvs.push( new THREE.Vector2( u / header.skinwidth, 1 - ( v / header.skinheight ) ) );
            //uvs.push(  u / header.skinwidth, 1 - ( v / header.skinheight  ) );
            //uvs.push(  u / header.skinwidth, 1 - ( v / header.skinheight  ) );
            uvs.push( u / header.skinwidth,1- ( v / header.skinheight  ) );

            offset += 4;

        }


        // triangles

        var verticeIndices = [];
        var uvIndices = [];
        var offset = header.offset_tris;

        for ( var i = 0, l = header.num_tris; i < l; i ++ ) {

            var a = fileBuffer.readUInt16LE( offset + 0, true );

            var b = fileBuffer.readUInt16LE( offset + 2, true );
            var c = fileBuffer.readUInt16LE( offset + 4, true );

            //geometry.faces.push( new THREE.Face3( a, b, c ) );
            verticeIndices.push(a, b, c);

            uvIndices.push( fileBuffer.readUInt16LE( offset + 6, true ) ,  fileBuffer.readUInt16LE( offset + 8, true ) ,  fileBuffer.readUInt16LE( offset + 10, true ) );
            //geometry.faceVertexUvs[ 0 ].push( [
            //    uvs[ fileBuffer.getUint16( offset + 6, true ) ],
            //    uvs[ fileBuffer.getUint16( offset + 8, true ) ],
            //    uvs[ fileBuffer.getUint16( offset + 10, true ) ]
            //] );

            offset += 12;

        }


        //var indices = verticeIndices;
        //var newUvs = [];
        //
        //for(let i = 0,len = verticeIndices.length; i < len; i++){
        //    let value = verticeIndices[i];
        //
        //    newUvs[value*2] = uvs[uvIndices[i]*2];
        //    newUvs[value*2+1] = uvs[uvIndices[i]*2+1];
        //    //newUvs[value*2] = uvs[uvIndices[i]*2];
        //    //newUvs[value*2+1] = uvs[uvIndices[i]*2+1];
        //}




        var normalTable = [
            [ -0.525731,  0.000000,  0.850651 ], [ -0.442863,  0.238856,  0.864188 ],
            [ -0.295242,  0.000000,  0.955423 ], [ -0.309017,  0.500000,  0.809017 ],
            [ -0.162460,  0.262866,  0.951056 ], [  0.000000,  0.000000,  1.000000 ],
            [  0.000000,  0.850651,  0.525731 ], [ -0.147621,  0.716567,  0.681718 ],
            [  0.147621,  0.716567,  0.681718 ], [  0.000000,  0.525731,  0.850651 ],
            [  0.309017,  0.500000,  0.809017 ], [  0.525731,  0.000000,  0.850651 ],
            [  0.295242,  0.000000,  0.955423 ], [  0.442863,  0.238856,  0.864188 ],
            [  0.162460,  0.262866,  0.951056 ], [ -0.681718,  0.147621,  0.716567 ],
            [ -0.809017,  0.309017,  0.500000 ], [ -0.587785,  0.425325,  0.688191 ],
            [ -0.850651,  0.525731,  0.000000 ], [ -0.864188,  0.442863,  0.238856 ],
            [ -0.716567,  0.681718,  0.147621 ], [ -0.688191,  0.587785,  0.425325 ],
            [ -0.500000,  0.809017,  0.309017 ], [ -0.238856,  0.864188,  0.442863 ],
            [ -0.425325,  0.688191,  0.587785 ], [ -0.716567,  0.681718, -0.147621 ],
            [ -0.500000,  0.809017, -0.309017 ], [ -0.525731,  0.850651,  0.000000 ],
            [  0.000000,  0.850651, -0.525731 ], [ -0.238856,  0.864188, -0.442863 ],
            [  0.000000,  0.955423, -0.295242 ], [ -0.262866,  0.951056, -0.162460 ],
            [  0.000000,  1.000000,  0.000000 ], [  0.000000,  0.955423,  0.295242 ],
            [ -0.262866,  0.951056,  0.162460 ], [  0.238856,  0.864188,  0.442863 ],
            [  0.262866,  0.951056,  0.162460 ], [  0.500000,  0.809017,  0.309017 ],
            [  0.238856,  0.864188, -0.442863 ], [  0.262866,  0.951056, -0.162460 ],
            [  0.500000,  0.809017, -0.309017 ], [  0.850651,  0.525731,  0.000000 ],
            [  0.716567,  0.681718,  0.147621 ], [  0.716567,  0.681718, -0.147621 ],
            [  0.525731,  0.850651,  0.000000 ], [  0.425325,  0.688191,  0.587785 ],
            [  0.864188,  0.442863,  0.238856 ], [  0.688191,  0.587785,  0.425325 ],
            [  0.809017,  0.309017,  0.500000 ], [  0.681718,  0.147621,  0.716567 ],
            [  0.587785,  0.425325,  0.688191 ], [  0.955423,  0.295242,  0.000000 ],
            [  1.000000,  0.000000,  0.000000 ], [  0.951056,  0.162460,  0.262866 ],
            [  0.850651, -0.525731,  0.000000 ], [  0.955423, -0.295242,  0.000000 ],
            [  0.864188, -0.442863,  0.238856 ], [  0.951056, -0.162460,  0.262866 ],
            [  0.809017, -0.309017,  0.500000 ], [  0.681718, -0.147621,  0.716567 ],
            [  0.850651,  0.000000,  0.525731 ], [  0.864188,  0.442863, -0.238856 ],
            [  0.809017,  0.309017, -0.500000 ], [  0.951056,  0.162460, -0.262866 ],
            [  0.525731,  0.000000, -0.850651 ], [  0.681718,  0.147621, -0.716567 ],
            [  0.681718, -0.147621, -0.716567 ], [  0.850651,  0.000000, -0.525731 ],
            [  0.809017, -0.309017, -0.500000 ], [  0.864188, -0.442863, -0.238856 ],
            [  0.951056, -0.162460, -0.262866 ], [  0.147621,  0.716567, -0.681718 ],
            [  0.309017,  0.500000, -0.809017 ], [  0.425325,  0.688191, -0.587785 ],
            [  0.442863,  0.238856, -0.864188 ], [  0.587785,  0.425325, -0.688191 ],
            [  0.688191,  0.587785, -0.425325 ], [ -0.147621,  0.716567, -0.681718 ],
            [ -0.309017,  0.500000, -0.809017 ], [  0.000000,  0.525731, -0.850651 ],
            [ -0.525731,  0.000000, -0.850651 ], [ -0.442863,  0.238856, -0.864188 ],
            [ -0.295242,  0.000000, -0.955423 ], [ -0.162460,  0.262866, -0.951056 ],
            [  0.000000,  0.000000, -1.000000 ], [  0.295242,  0.000000, -0.955423 ],
            [  0.162460,  0.262866, -0.951056 ], [ -0.442863, -0.238856, -0.864188 ],
            [ -0.309017, -0.500000, -0.809017 ], [ -0.162460, -0.262866, -0.951056 ],
            [  0.000000, -0.850651, -0.525731 ], [ -0.147621, -0.716567, -0.681718 ],
            [  0.147621, -0.716567, -0.681718 ], [  0.000000, -0.525731, -0.850651 ],
            [  0.309017, -0.500000, -0.809017 ], [  0.442863, -0.238856, -0.864188 ],
            [  0.162460, -0.262866, -0.951056 ], [  0.238856, -0.864188, -0.442863 ],
            [  0.500000, -0.809017, -0.309017 ], [  0.425325, -0.688191, -0.587785 ],
            [  0.716567, -0.681718, -0.147621 ], [  0.688191, -0.587785, -0.425325 ],
            [  0.587785, -0.425325, -0.688191 ], [  0.000000, -0.955423, -0.295242 ],
            [  0.000000, -1.000000,  0.000000 ], [  0.262866, -0.951056, -0.162460 ],
            [  0.000000, -0.850651,  0.525731 ], [  0.000000, -0.955423,  0.295242 ],
            [  0.238856, -0.864188,  0.442863 ], [  0.262866, -0.951056,  0.162460 ],
            [  0.500000, -0.809017,  0.309017 ], [  0.716567, -0.681718,  0.147621 ],
            [  0.525731, -0.850651,  0.000000 ], [ -0.238856, -0.864188, -0.442863 ],
            [ -0.500000, -0.809017, -0.309017 ], [ -0.262866, -0.951056, -0.162460 ],
            [ -0.850651, -0.525731,  0.000000 ], [ -0.716567, -0.681718, -0.147621 ],
            [ -0.716567, -0.681718,  0.147621 ], [ -0.525731, -0.850651,  0.000000 ],
            [ -0.500000, -0.809017,  0.309017 ], [ -0.238856, -0.864188,  0.442863 ],
            [ -0.262866, -0.951056,  0.162460 ], [ -0.864188, -0.442863,  0.238856 ],
            [ -0.809017, -0.309017,  0.500000 ], [ -0.688191, -0.587785,  0.425325 ],
            [ -0.681718, -0.147621,  0.716567 ], [ -0.442863, -0.238856,  0.864188 ],
            [ -0.587785, -0.425325,  0.688191 ], [ -0.309017, -0.500000,  0.809017 ],
            [ -0.147621, -0.716567,  0.681718 ], [ -0.425325, -0.688191,  0.587785 ],
            [ -0.162460, -0.262866,  0.951056 ], [  0.442863, -0.238856,  0.864188 ],
            [  0.162460, -0.262866,  0.951056 ], [  0.309017, -0.500000,  0.809017 ],
            [  0.147621, -0.716567,  0.681718 ], [  0.000000, -0.525731,  0.850651 ],
            [  0.425325, -0.688191,  0.587785 ], [  0.587785, -0.425325,  0.688191 ],
            [  0.688191, -0.587785,  0.425325 ], [ -0.955423,  0.295242,  0.000000 ],
            [ -0.951056,  0.162460,  0.262866 ], [ -1.000000,  0.000000,  0.000000 ],
            [ -0.850651,  0.000000,  0.525731 ], [ -0.955423, -0.295242,  0.000000 ],
            [ -0.951056, -0.162460,  0.262866 ], [ -0.864188,  0.442863, -0.238856 ],
            [ -0.951056,  0.162460, -0.262866 ], [ -0.809017,  0.309017, -0.500000 ],
            [ -0.864188, -0.442863, -0.238856 ], [ -0.951056, -0.162460, -0.262866 ],
            [ -0.809017, -0.309017, -0.500000 ], [ -0.681718,  0.147621, -0.716567 ],
            [ -0.681718, -0.147621, -0.716567 ], [ -0.850651,  0.000000, -0.525731 ],
            [ -0.688191,  0.587785, -0.425325 ], [ -0.587785,  0.425325, -0.688191 ],
            [ -0.425325,  0.688191, -0.587785 ], [ -0.425325, -0.688191, -0.587785 ],
            [ -0.587785, -0.425325, -0.688191 ], [ -0.688191, -0.587785, -0.425325 ]
        ]


        // frames

        var morphTargets = [];

        var translation = Vector3.create();
        var scale = Vector3.create();
        var string = [];

        var offset = header.offset_frames;

        for ( var i = 0, l = header.num_frames; i < l; i ++ ) {

            scale.set(
                fileBuffer.readFloatLE( offset + 0, true ),
                fileBuffer.readFloatLE( offset + 4, true ),
                fileBuffer.readFloatLE( offset + 8, true )
            );

            translation.set(
                fileBuffer.readFloatLE( offset + 12, true ),
                fileBuffer.readFloatLE( offset + 16, true ),
                fileBuffer.readFloatLE( offset + 20, true )
            );

            offset += 24;

            for ( var j = 0; j < 16; j ++ ) {

                string[ j ] = fileBuffer.readUInt8( offset + j, true );

            }

            var frame = {
                name: String.fromCharCode.apply( null, string ),
                vertices: [],
                normals: []
            };

            offset += 16;

            for ( var j = 0; j < header.num_vertices; j ++ ) {

                var x = fileBuffer.readUInt8( offset ++, true );
                var y = fileBuffer.readUInt8( offset ++, true );
                var z = fileBuffer.readUInt8( offset ++, true );

                //var vertex = Vector3.create(
                //    x * scale.x + translation.x,
                //    z * scale.z + translation.z,
                //    y * scale.y + translation.y
                //);
                var vertex = [
                    x * scale.x + translation.x,
                    z * scale.z + translation.z,
                    y * scale.y + translation.y
                ];

                //var normal =  n[ 0 ], n[ 2 ], n[ 1 ] ;


                //frame.vertices.push( vertex );
                //frame.normals.push( normal );
                frame.vertices = frame.vertices.concat( vertex );
                if(isComputeNormals){
                    var n = normalTable[ fileBuffer.readUInt8( offset ++, true ) ];
                    frame.normals = frame.normals.concat( n );
                }
                else{
                    offset ++;
                }
            }


            //var normals = this.computeNormal(frame.vertices, verticeIndices);


            //frame.normals = normals;



            morphTargets.push( frame );
        }



        // Static
        var vertices = [];
        var normals = [];

        vertices = morphTargets[ 0 ].vertices;


        //var morphTarget = morphTargets[ 0 ];

        //for ( var j = 0, jl = geometry.faces.length; j < jl; j ++ ) {
        //
        //    var face = geometry.faces[ j ];
        //
        //    face.vertexNormals = [
        //        morphTarget.normals[ face.a ],
        //        morphTarget.normals[ face.b ],
        //        morphTarget.normals[ face.c ]
        //    ];
        //
        //}

        normals = morphTargets[0].normals;








        //todo for flat shading?

        // Convert to geometry.morphNormals

        //for ( var i = 0, l = geometry.morphTargets.length; i < l; i ++ ) {
        //
        //    var morphTarget = geometry.morphTargets[ i ];
        //    var vertexNormals = [];
        //
        //    for ( var j = 0, jl = geometry.faces.length; j < jl; j ++ ) {
        //
        //        var face = geometry.faces[ j ];
        //
        //        vertexNormals.push( {
        //            a: morphTarget.normals[ face.a ],
        //            b: morphTarget.normals[ face.b ],
        //            c: morphTarget.normals[ face.c ]
        //        } );
        //
        //    }
        //
        //    geometry.morphNormals.push( { vertexNormals: vertexNormals } );
        //
        //}




        //todo duplicate
        object.name = dyCb.PathUtils.basename(filePath, dyCb.PathUtils.extname(filePath));

        object.material = null;

        object.vertices = vertices;
        object.normals = normals;
        //object.uvs = uvs;
        object.colors = [];
        //todo compute indices


        object.morphTargets = morphTargets;


        //object.indices = indices;
        //object.uvs = newUvs;
        object.uvIndices = uvIndices;
        object.indices = verticeIndices;
        object.uvs = uvs;

        result.push(object);

        return result;
    }

    //public computeNormal(vertices, verticeIndices) {
    //    //var count = verticeIndices.getCount();
    //    var count = verticeIndices.length;
    //    var self = this;
    //    var normals = [];
    //
    //    var compute = (startIndex:number) => {
    //        //var p0 = _getThreeComponentData(vertices, verticeIndices.getChild(startIndex)),
    //        //    p1 = _getThreeComponentData(vertices, verticeIndices.getChild(startIndex + 1)),
    //        //    p2 = _getThreeComponentData(vertices, verticeIndices.getChild(startIndex + 2)),
    //            var p0 = _getThreeComponentData(vertices, verticeIndices[startIndex]),
    //            p1 = _getThreeComponentData(vertices, verticeIndices[startIndex + 1]),
    //            p2 = _getThreeComponentData(vertices, verticeIndices[startIndex + 2]),
    //            v0 = Vector3.create().sub2(p2, p1),
    //            v1 = Vector3.create().sub2(p0, p1),
    //            result = null;
    //
    //        result = Vector3.create().cross(v0, v1).normalize();
    //
    //        normals.push(result.x);
    //        normals.push(result.y);
    //        normals.push(result.z);
    //
    //        if (count > startIndex + 3) {
    //            compute(startIndex + 3);
    //        }
    //    };
    //
    //    compute(0);
    //
    //    return normals;
    //}
}

