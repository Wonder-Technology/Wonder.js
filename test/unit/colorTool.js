var colorTool = (function () {
    return {
        isEqual: function (color1, color2, expect) {
            expect(testTool.getValues(color1.r)).toEqual(testTool.getValues(color2.r));
            expect(testTool.getValues(color1.g)).toEqual(testTool.getValues(color2.g));
            expect(testTool.getValues(color1.b)).toEqual(testTool.getValues(color2.b));
        }
    }
})()
