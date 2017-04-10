import * as sinon from "sinon";

describe("test", () => {
    it("adds 1 + 2 to equal 3", () => {
        var sandbox = sinon.sandbox.create();

        var func = sandbox.stub();


        func();

        expect(func).toCalledOnce();
        // expect(func).toCalledTwice();
    });
});
