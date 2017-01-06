module wd {
    export class SkinSkeletonGeometryData extends GeometryData{
        public static create(geometry:ModelGeometry) {
            var obj = new this(geometry);

            return obj;
        }

        private _jointIndices:Array<number> = null;
        @ensureGetter(function (jointIndices:Array<number>) {
            if(jointIndices === null || this._vertices === null){
                return;
            }

            it("jointIndices should map to vertices(4 -> 1)", () => {
                expect(jointIndices.length / 4).equals(this._vertices.length / 3);
            });
        })
        get jointIndices() {
            return this._jointIndices;
        }
        set jointIndices(jointIndices:Array<number>) {
            this._jointIndices = jointIndices;
            this.geometry.buffers.removeCache(EBufferDataType.JOINT_INDICE);
        }

        private _jointWeights:Array<number> = null;
        @ensureGetter(function (jointWeights:Array<number>) {
            it("jointWeights should map to vertices(4 -> 1)", () => {
                if(jointWeights === null || this._vertices === null){
                    return;
                }

                expect(jointWeights.length / 4).equals(this._vertices.length / 3);
            });
        })
        get jointWeights() {
            return this._jointWeights;
        }
        set jointWeights(jointWeights:Array<number>) {
            this._jointWeights = jointWeights;
            this.geometry.buffers.removeCache(EBufferDataType.JOINT_WEIGHT);
        }

        protected geometry:ModelGeometry;
    }
}

