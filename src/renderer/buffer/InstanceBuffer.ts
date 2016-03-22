module wd{
    export class InstanceBuffer extends Buffer{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        //todo move out?
        get float32InstanceArraySize(){
            return this._capacity / 4;
        }

        private _capacity:number = 32 * 16 * 4; // let's start with a maximum of 32 instances

        public initWhenCreate() {
            this.buffer = this._createBuffer();
        }

        public setCapacity(instanceCount:number){
            var bufferCapacity:number = instanceCount * 16 * 4,
                capacity:number = this._capacity;

            while (capacity < bufferCapacity) {
                capacity *= 2;
            }

            if (this._capacity < capacity) {
                this._capacity = capacity;

                if (this.buffer) {
                    DeviceManager.getInstance().gl.deleteBuffer(this.buffer);
                }

                this.buffer = this._createBuffer();
            }
        }

        @require(function(){
            assert(GPUDetector.getInstance().extensionInstancedArrays !== null, Log.info.FUNC_SHOULD("hardware", "support instance"));
        })
        public resetData(data: Float32Array, offsetLocations: number[]): void {
            var gl = DeviceManager.getInstance().gl;
            var extension = GPUDetector.getInstance().extensionInstancedArrays;

            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, data);

            //for (var index = 0; index < 4; index++) {
            ////    for (var index = 0; index < 7; index++) {
            //    //for (var index = 0; index < 1; index++) {
            //    var offsetLocation = offsetLocations[index];
            //    gl.enableVertexAttribArray(offsetLocation);
            //    gl.vertexAttribPointer(offsetLocation, 4, gl.FLOAT, false, 64, index * 16);
            //    extension.vertexAttribDivisorANGLE(offsetLocation, 1);
            //}


            //for (var index = 4; index < 7; index++) {
            //    var offsetLocation = offsetLocations[index];
            //    gl.enableVertexAttribArray(offsetLocation);
            //    //stride: 3(3 data) * (4(float byte) * 3(count));
            //    //offset: 4 * 16(the end offset of a_mVec4_3) + index * 4(float byte) * 3(count)
            //    //gl.vertexAttribPointer(offsetLocation, 3, gl.FLOAT, false, 36, index * 12 + 4 * 16);
            //    gl.vertexAttribPointer(offsetLocation, 3, gl.FLOAT, false, 36, (index - 4) * 12 + 4 * 16);
            //    //gl.vertexAttribPointer(offsetLocation, 3, gl.FLOAT, false, 48, (index - 4) * 16);
            //    //gl.vertexAttribPointer(offsetLocation, 3, gl.FLOAT, false, 48, 4 * 16);
            //    extension.vertexAttribDivisorANGLE(offsetLocation, 1);
            //}


            //for (var index = 0; index < 4; index++) {
            //    var offsetLocation = offsetLocations[index];
            //    gl.enableVertexAttribArray(offsetLocation);
            //    gl.vertexAttribPointer(offsetLocation, 4, gl.FLOAT, false, 4 * 4 * 4 + 3 * 4 * 3, index * 16);
            //    extension.vertexAttribDivisorANGLE(offsetLocation, 1);
            //}
            //for (var index = 4; index < 7; index++) {
            //    var offsetLocation = offsetLocations[index];
            //    gl.enableVertexAttribArray(offsetLocation);
            //    gl.vertexAttribPointer(offsetLocation, 3, gl.FLOAT, false, 4 * 4 * 4 + 3 * 4 * 3, (index - 4) * 12 + 4 * 16);
            //    extension.vertexAttribDivisorANGLE(offsetLocation, 1);
            //}
        }

//        public resetData2(data: Float32Array, offsetLocations: number[]): void {
//            var gl = DeviceManager.getInstance().gl;
//            var extension = GPUDetector.getInstance().extensionInstancedArrays;
//
//
//            var gl = DeviceManager.getInstance().gl;
//            var buffer = gl.createBuffer();
//
//            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//            gl.bufferData(gl.ARRAY_BUFFER, this._capacity, gl.DYNAMIC_DRAW);
//
//
//            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//            gl.bufferSubData(gl.ARRAY_BUFFER, 0, data);
//
//            //for (var index = 0; index < 4; index++) {
//            ////    for (var index = 0; index < 7; index++) {
//            //    //for (var index = 0; index < 1; index++) {
//            //    var offsetLocation = offsetLocations[index];
//            //    gl.enableVertexAttribArray(offsetLocation);
//            //    gl.vertexAttribPointer(offsetLocation, 4, gl.FLOAT, false, 64, index * 16);
//            //    extension.vertexAttribDivisorANGLE(offsetLocation, 1);
//            //}
//            //for (var index = 4; index < 7; index++) {
//            //    var offsetLocation = offsetLocations[index];
//            //    gl.enableVertexAttribArray(offsetLocation);
//            //    //stride: 3(3 data) * (4(float byte) * 3(count));
//            //    //offset: 4 * 16(the end offset of a_mVec4_3) + index * 4(float byte) * 3(count)
//            //    //gl.vertexAttribPointer(offsetLocation, 3, gl.FLOAT, false, 36, index * 12 + 4 * 16);
//            //    gl.vertexAttribPointer(offsetLocation, 3, gl.FLOAT, false, 36, (index - 4) * 12 + 4 * 16);
//            //    //gl.vertexAttribPointer(offsetLocation, 3, gl.FLOAT, false, 48, (index - 4) * 16);
//            //    //gl.vertexAttribPointer(offsetLocation, 3, gl.FLOAT, false, 48, 4 * 16);
//            //    extension.vertexAttribDivisorANGLE(offsetLocation, 1);
//            //}
//
//
//
//
//            for (var index = 0; index < 3; index++) {
//                var offsetLocation = offsetLocations[index];
//                gl.enableVertexAttribArray(offsetLocation);
//                gl.vertexAttribPointer(offsetLocation, 4, gl.FLOAT, false, 3 * 4 * 3, index * 12);
//                extension.vertexAttribDivisorANGLE(offsetLocation, 1);
//            }
//            //for (var index = 4; index < 7; index++) {
//            //    var offsetLocation = offsetLocations[index];
//            //    gl.enableVertexAttribArray(offsetLocation);
//            //    gl.vertexAttribPointer(offsetLocation, 3, gl.FLOAT, false, 4 * 4 * 4 + 3 * 4 * 3, (index - 4) * 12 + 4 * 16);
//            //    extension.vertexAttribDivisorANGLE(offsetLocation, 1);
//            //}
//        //}
////E(offsetLocation, 1);
//            //}
//        }







        private _createBuffer(): WebGLBuffer {
            var gl = DeviceManager.getInstance().gl;
            var buffer = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, this._capacity, gl.DYNAMIC_DRAW);

            return buffer;
        }
    }
}