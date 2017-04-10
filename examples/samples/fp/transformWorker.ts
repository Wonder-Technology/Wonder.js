this.onmessage = (msg) => {
    console.log(JSON.stringify(msg.data));
    var positions = new Float32Array(msg.data.buffer, msg.data.offset, 1);

    this.postMessage({
        data:[positions[0] * 100]
    });
};