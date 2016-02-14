module wd{
    export class ModelGeometry extends Geometry{
        public static create(){
            var geom = new this();

            return geom;
        }

        public vertices:Array<number> = null;
        public colors:Array<number> = null;
        public texCoords:Array<number> = null;
        public faces:Array<Face3> = null;
        public morphTargets:wdCb.Hash<MorphTargetsData> = null;
        public morphFaceNormals:wdCb.Hash<wdCb.Collection<Array<number>>> = wdCb.Hash.create<wdCb.Collection<Array<number>>>();
        public morphVertexNormals:wdCb.Hash<wdCb.Collection<Array<number>>> = wdCb.Hash.create<wdCb.Collection<Array<number>>>();

        public buffers:MorphBufferContainer;

        public hasAnimation(){
            return this._hasMorphTargets() && (this.entityObject && this.entityObject.hasComponent(MorphAnimation));
        }

        @require(function(){
            assert(this.buffers && this.buffers.geometryData, Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
        })
        public hasMorphFaceNormals(){
            return this.buffers.geometryData.hasMorphFaceNormals();
        }

        @require(function(){
            assert(this.buffers && this.buffers.geometryData, Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
        })
        public hasMorphVertexNormals(){
            return this.buffers.geometryData.hasMorphVertexNormals();
        }

        @require(function(){
            assert(this.buffers && this.buffers.geometryData, Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
        })
        public computeMorphNormals() {
            this.buffers.geometryData.computeMorphNormals();
        }

        protected computeNormals(){
            super.computeNormals();

            if(this._hasMorphTargets()){
                if(this.isSmoothShading()){
                    if(!this.hasMorphVertexNormals()){
                        this.computeMorphNormals();
                    }
                }
                else{
                    if(!this.hasMorphFaceNormals()){
                        this.computeMorphNormals();
                    }
                }
            }
        }

        protected computeData(){
            return <any>{
                vertices: this.vertices,
                faces: this.faces,
                texCoords: this.texCoords,
                colors: this.colors,
                morphTargets: this.morphTargets
            };
        }

        @require(function(){
            if(this.hasAnimation()) {
                assert(this.entityObject.getComponent(MorphAnimation), Log.info.FUNC_SHOULD("entityObject with ModelGeometry", "add MorphAnimation component"));
            }
        })
        protected createBufferContainer():BufferContainer{
            if(this.hasAnimation()){
                return MorphBufferContainer.create(this.entityObject, this.entityObject.getComponent<MorphAnimation>(MorphAnimation));
            }

            return CommonBufferContainer.create(this.entityObject);
        }

        protected createGeometryData(vertices:Array<number>, faces:Array<Face3>, texCoords:Array<number>, colors:Array<number>, morphTargets:wdCb.Hash<MorphTargetsData>):GeometryData{
            if(this.hasAnimation()){
                let geometryData = MorphGeometryData.create(this);

                geometryData.vertices = vertices;
                geometryData.faces = faces;
                geometryData.texCoords = texCoords;
                geometryData.colors = colors;
                geometryData.morphTargets = morphTargets;

                return geometryData;
            }

            return this.createCommonGeometryData(vertices, faces, texCoords, colors);
        }

        private _hasMorphTargets(){
            return this.morphTargets && this.morphTargets.getCount() > 0;
        }
    }
}

