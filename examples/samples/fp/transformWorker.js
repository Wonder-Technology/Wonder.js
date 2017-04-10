var _this = this;
this.onmessage = function (msg) {
    console.log(JSON.stringify(msg.data));
    var positions = new Float32Array(msg.data.buffer, msg.data.offset, 1);
    _this.postMessage({
        data: [positions[0] * 100]
    });
};
//# sourceMappingURL=transformWorker.js.map