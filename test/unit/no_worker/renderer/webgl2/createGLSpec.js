describe("create gl", function () {
    var sandbox = null;
    var canvasDom = null;
    var Main = wd.Main,
        DomQuery = wd.DomQuery;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        canvasDom = mainTool.buildInitCanvasDom(sandbox);

        sandbox.stub(DomQuery, "create").returns(mainTool.buildFakeDomQuery(sandbox, canvasDom));
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    it("get webgl2 context", function () {
        Main.setConfig({
            canvasID: "a"
        });
        Main.init();

        expect(canvasDom.getContext).toCalledWith("webgl2");
    });
});

