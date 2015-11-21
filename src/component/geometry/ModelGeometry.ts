/// <reference path="../../definitions.d.ts"/>
module dy{
    export class ModelGeometry extends Geometry{
        public static create(){
            var geom = new this();

            return geom;
        }

        public vertices:Array<Vector3> = null;
        public colors:Array<Vector3> = null;
        public texCoords:Array<Vector2> = null;
        public faces:Array<Face3> = null;
        public morphTargets:dyCb.Hash<DYFileParseMorphTargetsData> = null;
        public morphFaceNormals:dyCb.Hash<dyCb.Collection<Array<number>>> = dyCb.Hash.create<dyCb.Collection<Array<number>>>();
        //public morphVertexNormals:dyCb.Hash<dyCb.Collection<dyCb.Collection<Vector3>>> = dyCb.Hash.create<dyCb.Collection<dyCb.Collection<Vector3>>>();
        public morphVertexNormals:dyCb.Hash<dyCb.Collection<Array<number>>> = dyCb.Hash.create<dyCb.Collection<Array<number>>>();

        public buffers:MorphBufferContainer;

        public hasAnimation(){
            return this._hasMorphTargets() && (this.gameObject && this.gameObject.hasComponent(MorphAnimation));
        }

        @In(function(){
            assert(this.buffers && this.buffers.geometryData, Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
        })
        public hasMorphFaceNormals(){
            return this.buffers.geometryData.hasMorphFaceNormals();
        }

        @In(function(){
            assert(this.buffers && this.buffers.geometryData, Log.info.FUNC_MUST_DEFINE("buffers->geometryData"));
        })
        public hasMorphVertexNormals(){
            return this.buffers.geometryData.hasMorphVertexNormals();
        }

        @In(function(){
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
                        //this.computeMorphVertexNormals();
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

        @In(function(){
            if(this.hasAnimation()) {
                assert(this.gameObject.getComponent(MorphAnimation), Log.info.FUNC_SHOULD("gameObject with ModelGeometry", "add MorphAnimation component"));
            }
        })
        protected createBufferContainer():BufferContainer{
            if(this.hasAnimation()){
                return MorphBufferContainer.create(this.gameObject.getComponent<MorphAnimation>(MorphAnimation));
            }

            return CommonBufferContainer.create();
        }

        protected createGeometryData():GeometryData{
            if(this.hasAnimation()){
                return MorphGeometryData.create(this);
            }

            return CommonGeometryData.create(this);
        }

        private _hasMorphTargets(){
            return this.morphTargets && this.morphTargets.getCount() > 0;
        }
    }
}

