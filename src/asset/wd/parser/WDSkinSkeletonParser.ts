module wd{
    declare var ArrayBuffer:any;

    export class WDSkinSkeletonParser{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _json:IWDJsonDataParser = null;
        private _arrayBufferMap:wdCb.Hash<ArrayBuffer> = null;

        @require(function(json:IWDJsonDataParser, skinId:string, skeletonsIdArr:Array<string>, objectName:string){
            it("if has multi root skeletons, warn that only use the first skeleton", () => {
                if(skeletonsIdArr.length > 1){
                    Log.warn(`${objectName} has multi root skeletons:${skeletonsIdArr}, only use the first skeleton:${skeletonsIdArr[0]}`);
                }
            });
            it("skin and skeleton should both exist", () => {
                expect(skinId).exist;
                expect(json.skins).exist;
                expect(json.skins[skinId]).exist;

                expect(skeletonsIdArr).exist;
                expect(skeletonsIdArr.length).gt(0);
            });
        })
        public parse(json:IWDJsonDataParser, skinId:string, skeletonsIdArr:Array<string>, objectName:string, arrayBufferMap:wdCb.Hash<any>){
            var skinSkeleton:IWDSkinSkeletonAnimationAssembler = <any>{},
                skinData = json.skins[skinId];

            this._json = json;
            this._arrayBufferMap = arrayBufferMap;

            if(!skinData.bindShapeMatrix || this._isIdentiyMatrixValues(skinData.bindShapeMatrix)){
                skinSkeleton.bindShapeMatrix = null;
            }
            else{
                skinSkeleton.bindShapeMatrix = Matrix4.create(new Float32Array(skinData.bindShapeMatrix));
            }

            skinSkeleton.jointNames = skinData.jointNames;

            skinSkeleton.inverseBindMatrices = this._getInverseBindMatrices(skinData.inverseBindMatrices);

            skinSkeleton.boneMatrixMap = this._getBoneMatrixMap(skeletonsIdArr[0]);

            skinSkeleton.jointTransformData = null;

            return skinSkeleton;
        }

        private _isIdentiyMatrixValues(bindShapeMatrix:Array<number>){
            var identityValues = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ];

            for(let i = 0, len = identityValues.length; i < len; i++){
                if(bindShapeMatrix[i] !== identityValues[i]){
                    return false;
                }
            }

            return true;
        }

        private _getInverseBindMatrices(inverseBindMatricesAccessorId:string){
            var json = this._json,
                inverseBindMatrices:Array<Matrix4> = [],
                values:Float32Array = null,
                mat:Matrix4 = null,
                {bufferReader, count} = WDUtils.getBufferReaderFromAccessor(json, json.accessors[inverseBindMatricesAccessorId], this._arrayBufferMap);

            for (let i = 0, len = count; i < len; i += 16) {
                values = new Float32Array(16);

                for(let j = 0; j < 16; j++){
                    values[j] = bufferReader.readFloat();
                }

                inverseBindMatrices.push(Matrix4.create(values));
            }

            return inverseBindMatrices;
        }

        private _getBoneMatrixMap(rootSkeletonId:string){
            var self = this,
                nodes = this._json.nodes,
                boneMatrixMap = wdCb.Hash.create<BoneMatrix>();

            var find = (nodeId:string, parentBoneMatrix:BoneMatrix|null) => {
                var node:IWDNodeParser = nodes[nodeId],
                    matrix = self._composeBoneMatrix(node),
                    boneMatrix = BoneMatrix.create(matrix);

                if(parentBoneMatrix !== null){
                    boneMatrix.parent = parentBoneMatrix;
                }

                if(!node.jointName){
                    boneMatrixMap.addChild(nodeId, boneMatrix);
                }
                else{
                    boneMatrixMap.addChild(node.jointName, boneMatrix);
                }

                if(!!node.children){
                    for(let childNodeId of node.children){
                        find(childNodeId, boneMatrix);
                    }
                }
            };

            find(this._findRootNodeIdContainRootSkeleton(rootSkeletonId), null);

            return boneMatrixMap;
        }

        private _findRootNodeIdContainRootSkeleton(rootSkeletonId:string){
            var self = this,
                nodes = this._json.nodes,
                rootNodeId:string = null;
            var find = (targetNodeId:string) => {
                rootNodeId = targetNodeId;

                for(let nodeId in nodes){
                    if(nodes.hasOwnProperty(nodeId)){
                        let node = nodes[nodeId];

                        if(!!node.children && node.children.indexOf(targetNodeId) > -1){
                            find(nodeId);
                            break;
                        }
                    }
                }
            };

            find(rootSkeletonId);

            return rootNodeId;
        }

        @require(function(node:IWDNodeParser){
            it("should define matrix data", () => {
                expect((!!node.translation && !!node.rotation && !!node.scale)
            || !!node.matrix).true;
            });
        })
        private _composeBoneMatrix(node:IWDNodeParser){
            var mat:Matrix4 = null;

            if (node.translation && node.rotation && node.scale) {
                let translation = node.translation,
                    rotation = node.rotation,
                    scale = node.scale;

                // // Y is Up
                // if (GLTFFileLoader.MakeYUP) {
                //     rotation = rotation.multiply(new Quaternion(-0.707107, 0, 0, 0.707107));
                // }

                mat = Matrix4.create().setTRS(
                    Vector3.create(translation[0], translation[1], translation[2]),
                    Quaternion.create(rotation[0], rotation[1], rotation[2], rotation[3]),
                    Vector3.create(scale[0], scale[1], scale[2])
                );
            }
            else if(node.matrix){
                mat = Matrix4.create(new Float32Array(node.matrix));
            }

            return mat;
        }
    }
}
