var bufferContainerTool = {
    judgeUpdateBufferData: function (container, gl, bufferDataType, createBufferCount, testBufferDataFunc) {
        var createBufferCount = createBufferCount || 1;


        var result1 = container.getChild(bufferDataType);


        expect(gl.createBuffer.callCount).toEqual(createBufferCount);




        container.removeCache(bufferDataType);

        var result2 = container.getChild(bufferDataType);


        expect(gl.createBuffer.callCount).toEqual(createBufferCount);

        if(testBufferDataFunc){
            testBufferDataFunc(gl.bufferData);
        }
        else{
            expect(gl.bufferData).toCalledTwice();
            expect(gl.bufferData.secondCall.args[2]).toEqual(gl.DYNAMIC_DRAW);
        }
    }
}
