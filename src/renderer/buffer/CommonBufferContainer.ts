/// <reference path="../../definitions.d.ts"/>
module dy {
    export class CommonBufferContainer extends BufferContainer{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public geometryData:CommonGeometryData;

        protected getVertice(type:BufferDataType) {
            var geometryData= this.geometryData[BufferDataTable.getGeometryDataName(type)];

            return ArrayBuffer.create(new Float32Array(geometryData), 3, BufferType.FLOAT);
        }

        protected getNormal(type:BufferDataType) {
            var geometryData= this.geometryData[BufferDataTable.getGeometryDataName(type)];

            return ArrayBuffer.create(new Float32Array(geometryData), 3, BufferType.FLOAT);
        }
    }
}
