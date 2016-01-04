var canvasTool = (function () {
    return {
        buildFakeContext: function(sandbox){
            return {
                setTransform:sandbox.stub(),

                save:sandbox.stub(),
                restore:sandbox.stub(),

                beginPath:sandbox.stub(),
                closePath:sandbox.stub(),
                arcTo:sandbox.stub(),
                moveTo:sandbox.stub(),
                stroke:sandbox.stub(),
                fill:sandbox.stub(),

                drawImage:sandbox.stub(),
                clearRect:sandbox.stub()
            }
        }
    }
}());
