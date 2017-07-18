var disposeTool = (function () {
    return {
        judgeSingleValue: function (tool, getMethodName, setMethodName, defaultValue, component1, component2, disposeFunc) {
            tool[setMethodName](component1, 1);
            tool[setMethodName](component2, 2);

            var index1 = component1.index;
            var index2 = component2.index;

            disposeFunc(component1);

            expect(tool[getMethodName](componentTool.createComponent(index1))).toEqual(2);
            expect(tool[getMethodName](componentTool.createComponent(index2))).toEqual(defaultValue);
        }
    }
})();
