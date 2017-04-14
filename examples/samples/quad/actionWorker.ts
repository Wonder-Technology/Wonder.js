onmessage = (e) => {
    var time:number = e.data.time;

    self.postMessage({
        position:_getNewPosition(time)
    });
};

var _getNewPosition = (time:number) => {
    var delta = (time % 1000 - 500) / 1000;

    return delta;
}
