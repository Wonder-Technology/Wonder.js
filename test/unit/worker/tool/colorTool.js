var colorTool = (function () {
    return {
        judgeIsEqual: function (color1, color2, expect) {
            expect(testTool.getValues(color1.r)).toEqual(testTool.getValues(color2.r));
            expect(testTool.getValues(color1.g)).toEqual(testTool.getValues(color2.g));
            expect(testTool.getValues(color1.b)).toEqual(testTool.getValues(color2.b));
        },
        createDefaultColor: function (MaterialData) {
            var color = wd.Color.create();

            color.r = MaterialData.defaultColorArr[0];
            color.g = MaterialData.defaultColorArr[1];
            color.b = MaterialData.defaultColorArr[2];

            return color
        }
    }
})()
