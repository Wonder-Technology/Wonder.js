module wd {
    export class GeometryUtils{
        public static convertToFaces(indices:Array<number>, normals?:Array<number>):Array<Face3>{
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
                face.faceNormal = face.vertexNormals.getChild(0).clone();
            }

            faces.push(face);
        }

        return faces;
    }

        @require(function(data){
            if(data){
                assert(data instanceof wdCb.Collection || data instanceof wdCb.Hash || JudgeUtils.isArrayExactly(data), Log.info.FUNC_SHOULD("data",  "be Array or Collection or Hash"));
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

        @require(function(dataArr:Array<number>, iterator:(v:Vector3) => void){
            assert(dataArr.length % 3 === 0, Log.info.FUNC_SHOULD("dataArr.length", "times of three"));
        })
        public static iterateThreeComponent(dataArr:Array<number>, iterator:(v:Vector3) => void){
            for(let i = 0, len = dataArr.length; i < len; i += 3){
                iterator(Vector3.create(dataArr[i], dataArr[i + 1], dataArr[i + 2]));
            }
        }

        public static setThreeComponent(targetData:Array<number>, sourceData:Vector3, index:number);
        public static setThreeComponent(targetData:Array<number>, sourceData:Array<number>, index:number);

        public static setThreeComponent(targetData:Array<number>, sourceData:any, index:number) {
            if(sourceData instanceof Vector3){
                targetData[index * 3] = sourceData.x;
                targetData[index * 3 + 1] = sourceData.y;
                targetData[index * 3 + 2] = sourceData.z;
            }
            else{
                targetData[index * 3] = sourceData[0];
                targetData[index * 3 + 1] = sourceData[1];
                targetData[index * 3 + 2] = sourceData[2];
            }
        }

        // public static mergeFace(source:Array<Face3>, target:Array<Face3>){
        //     if(!target){
        //         return source;
        //     }
        //
        //     for(let face of target){
        //         source.push(face.clone());
        //     }
        //
        //     return source;
        // }
    }
}

