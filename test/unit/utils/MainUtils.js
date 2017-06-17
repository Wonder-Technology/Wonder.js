function buildFakeDomQuery(canvasDom){
    return {
        css:sandbox.stub(),
        get:sandbox.stub().returns(canvasDom)
    };
}

