/// <reference path="../../definitions.d.ts"/>
module dy {
    export class GeometryUtils{
        public static convertToFaces(indices:Array<number>, normals?:Array<number>){
        var hasNormals = this.hasData(normals),
            faces = [];

        for(let i = 0, len = indices.length; i < len; i+=3){
            let a = indices[i],
                b = indices[i + 1],
                c = indices[i + 2],
                face = Face3.create(a, b, c);

            if(hasNormals){
                face.vertexNormals.addChildren([
                    this.getThreeComponent(normals, a),
                    this.getThreeComponent(normals, b),
                    this.getThreeComponent(normals, c)
                ]);
                face.faceNormal.set(face.vertexNormals.getChild(0));
            }

            faces.push(face);
        }

        return faces;
    }

        @In(function(data){
            if(data){
                assert(data instanceof dyCb.Collection || data instanceof dyCb.Hash || JudgeUtils.isArray(data), Log.info.FUNC_SHOULD("data",  "be Array or Collection or Hash"));
            }
        })
        public static hasData(data:any){
            return data && ((data.length && data.length > 0) || (data.getCount && data.getCount() > 0));
        }

        public static getThreeComponent(sourceData:Array<number>, index:number) {
            var startIndex = 3 * index;

            return Vector3.create(
                sourceData[startIndex],
                sourceData[startIndex + 1],
                sourceData[startIndex + 2]
            );
        }

        public static setThreeComponent(targetData:Array<number>, sourceData:Vector3, index:number) {
            targetData[index * 3] = sourceData.x;
            targetData[index * 3 + 1] = sourceData.y;
            targetData[index * 3 + 2] = sourceData.z;
        }
    }
}

