describe("PreLoadImg.js", function () {
    //var imgLoader = null;
    var PreLoadImg = YYC.Control.PreLoadImg;

    beforeEach(function () {
    });
    afterEach(function () {
    });
    
    describe("可以根据id值获得加载的图片", function () {
        it("传入图片时应包含id和url属性，否则抛出错误", function () {
            var imgs_wrong = ["a.png", "b.png"],
                imgs_correct = [{ id: "a1", url: "" }, { id: "a2", url: "a.png" }];

            expect(function () {
                new PreLoadImg(imgs_wrong);
            }).toThrow();
            expect(function () {
                new PreLoadImg(imgs_correct);
            }).not.toThrow();
        });
        it("get方法存在", function () {
            expect(new PreLoadImg([{ id: "a1", url: "a1.png" }, { id: "a2", url: "a2.png" }]).get).toBeDefined();
        });
        it("可以根据id值，获得加载的图片", function(){
            var imgs = [{ id: "a1", url: "a1.png" }, { id: "a2", url: "a2.png" }];
            var imgLoader = new PreLoadImg(imgs);
      
            expect(Object.prototype.toString.call(imgLoader.get("a1"), null)).toEqual("[object HTMLImageElement]");
        });
        it("延迟后，_imgs不为空", function () {
            var imgs = [{ id: "a1", url: "a1.png" }, { id: "a2", url: "a2.png" }];
            var imgLoader = new PreLoadImg(imgs);

            //setTimeout(function () {
            //    console.log(imgLoader._imgs);
            //}, 1000);
            testTool.asynRun(function () {
                expect(imgLoader.get("a1")).not.toBeNull();
            }, 1000);
        });
    });
});