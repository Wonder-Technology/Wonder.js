module wd{
    export class InstanceBuffer extends Buffer{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public size:number = 32 * 16 * 4; // let's start with a maximum of 32 instances

        public initWhenCreate() {
            this.buffer = this._createBuffer();
        }

        public setSize(instanceCount:number){
            var bufferSize:number = instanceCount * 16 * 4,
                size:number = this.size;

            while (size < bufferSize) {
                size *= 2;
            }

            if (this.size < size) {
                this.size = size;

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

            for (var index = 0; index < 4; index++) {
                //for (var index = 0; index < 1; index++) {
                var offsetLocation = offsetLocations[index];
                gl.enableVertexAttribArray(offsetLocation);
                gl.vertexAttribPointer(offsetLocation, 4, gl.FLOAT, false, 64, index * 16);
                extension.vertexAttribDivisorANGLE(offsetLocation, 1);
            }
        }

        @require(function(){
            assert(GPUDetector.getInstance().extensionInstancedArrays !== null, Log.info.FUNC_SHOULD("hardware", "support instance"));
        })
        public unBind(offsetLocations: number[]): void {
            var gl = DeviceManager.getInstance().gl;
            var extension = GPUDetector.getInstance().extensionInstancedArrays;

            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

            for (var index = 0; index < 4; index++) {
                var offsetLocation = offsetLocations[index];
                gl.disableVertexAttribArray(offsetLocation);
                extension.vertexAttribDivisorANGLE(offsetLocation, 0);
            }
        }

        private _createBuffer(): WebGLBuffer {
            var gl = DeviceManager.getInstance().gl;
            var buffer = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.size, gl.DYNAMIC_DRAW);

            return buffer;
        }
    }
}