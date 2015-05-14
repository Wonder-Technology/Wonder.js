describe("event", function(){
    var facade = null;
    var Facade = null;
    var sandbox = null;
    var dom = null;

    function insertDom(){
        $("<div id='event-test'></div>")
                .append($("body"));
    }

    function removeDom(){
        $("#event-test").remove();
    }

    beforeEach(function(){
        sandbox = sinon.sandbox.create();
        insertDom();
        dom = $("#event-test");
        Facade = Engine3D.EventFacade;
    });
    afterEach(function(){
        removeDom();
        sandbox.restore();
    });

    describe("dom event test", function(){
        describe("pc event", function(){
            beforeEach(function(){

            });

            it("bind event and trigger event(event object is Event class instance)", function(){
                var facade = Facade.create(dom);

                facade.on("click", function(e){
                    expect(e instanceof Engine3D.Event).toBeTruthy();
                    expect(e.target.id).toEqual("event-test");
                    expect(e.mouseButton).toEqual(0);
                    expect(e.type).toEqual("click");
                });

                facade.trigger("click");
            });

            describe("remove event bind", function(){
                var count = 0;

                beforeEach(function(){
                    facade = Facade.create(dom);

                    facade.on("mouseover", function(e){
                        count = count + 1;
                    });
                    facade.on("click", function(e){
                        count = count + 10;
                    });
                });

                it("remove specific event", function(){
                    facade.off("mouseover");

                    facade.trigger("mouseover");
                    facade.trigger("click");

                    expect(count).toEqual(10);
                });
                it("remove all event", function(){
                    facade.off();

                    facade.trigger("mouseover");
                    facade.trigger("click");

                    expect(count).toEqual(0);
                });
            });
        });

        //todo support mobile event
        //todo need judge if the event is pc event or mobile event in EventDispatcher
        describe("mobile event", function(){
        });
    });

    describe("custom event broadcast in main loop", function() {
        var count = null,
            facadeDirector = null,
            facadeScene = null,
            facadeMesh = null;

        function bindEventWithNoData(){
            facadeDirector.on("customEvent", function(data){
                count = count + 1;
            });
            facadeScene.on("customEvent", function(data){
                count = count + 10;
            });
            facadeMesh.on("customEvent", function(data){
                count = count + 100;
            });
        }

        function bindEventWithData1(){
            facadeDirector.on("customEvent", function(data){
                count = count + data;
            });
            facadeScene.on("customEvent", function(data){
                count = count + 10 + data;
            });
            facadeMesh.on("customEvent", function(data){
                count = count + 100 + data;
            });
        }

        function bindEventWithData2(){
                facadeDirector.on("customEvent", function (data) {
                    count = count + data.count;
                });
                facadeScene.on("customEvent", function (data) {
                    count = count + 10 + data.count;
                });
                facadeMesh.on("customEvent", function (data) {
                    count = count + 100 + data.count;
                });
            }

        beforeEach(function(){
            count = 0;
            facadeDirector = Facade.create(Engine3D.Director.getInstance());
            facadeScene = Facade.create(Engine3D.Scene.create(null, "", ""));
            facadeMesh = Facade.create(Engine3D.Mesh.create(null));
        });

        describe("broadcast (down in main loop)", function () {
            it("broadcast", function(){
                bindEventWithNoData();

                facadeScene.broadcast("customEvent");

                expect(count).toEqual(110);
            });
            describe("broadcast with data", function(){
                it("test1", function(){
                    bindEventWithData1();

                    facadeDirector.broadcast("customEvent", 5);

                    expect(count).toEqual(125);
                });
                it("test2", function(){
                    bindEventWithData2();

                    facadeDirector.broadcast("customEvent", {
                        count: 5
                    });

                    expect(count).toEqual(125);
                });
            });
        });
        it("emit (up in main loop)", function () {
            it("emit", function(){
                bindEventWithNoData();

                facadeScene.emit("customEvent");

                expect(count).toEqual(11);
            });
            describe("emit with data", function(){
                it("test1", function(){
                    bindEventWithData1();

                    facadeMesh.emit("customEvent", 5);

                    expect(count).toEqual(125);
                });
                it("test2", function(){
                    bindEventWithData2();

                    facadeMesh.emit("customEvent", {
                        count: 5
                    });

                    expect(count).toEqual(125);
                });
            });
        });
    });
});
