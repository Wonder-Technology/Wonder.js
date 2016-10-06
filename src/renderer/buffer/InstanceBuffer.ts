module wd{
    export class InstanceBuffer extends Buffer{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        get float32InstanceArraySize(){
            return this._capacity / 4;
        }

        /*! start with a maximum of 32 instances */
        private _capacity:number = 32 * 16 * 4;
        private _cacheMap: wdCb.Hash<any> = wdCb.Hash.create<any>();

        public initWhenCreate() {
            this.buffer = this._createBuffer();
        }

        public setCapacity(bufferCapacity:number){
            var capacity:number = this._capacity;

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

        public resetData(data: Float32Array): void {
            var gl = DeviceManager.getInstance().gl;

            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, data);
        }


        public bindBuffer(): void {
            var gl = DeviceManager.getInstance().gl;

            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        }

        public addCache(key:string, value:any){
            this._cacheMap.addChild(key, value);
        }

        public getCache(key:string){
            return this._cacheMap.getChild(key);
        }

        private _createBuffer(): WebGLBuffer {
            var gl = DeviceManager.getInstance().gl,
                buffer = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, this._capacity, gl.DYNAMIC_DRAW);

            BufferTable.resetBindedArrayBuffer();

            return buffer;
        }
    }
}