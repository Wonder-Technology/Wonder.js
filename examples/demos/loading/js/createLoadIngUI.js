var loadingUI = (function(){
    var view = null,
        panel = null,
        bar = null,
        imageUIObject = null,
        bitmapFontUIObject = null,
        bitmapFont = null,
        director = wd.Director.getInstance();

    function createLoadingUI() {
        view = wd.DeviceManager.getInstance().view;
        var renderer = createUIRenderer();

        panel = createPanel(renderer);


        panel.transform.translate(view.width / 2, view.height / 2);


        var barUIObject = createProgressBar(renderer);

        imageUIObject = createImageUI(renderer);

        bitmapFontUIObject = createBitmapFont(renderer);



        panel.addChild(barUIObject);
        panel.addChild(imageUIObject);
        panel.addChild(bitmapFontUIObject);


        director.scene.addChild(panel);



        barUIObject.transform.anchorX = wd.Vector2.create(0.1, 0.9);
        barUIObject.transform.anchorY = wd.Vector2.create(0.6, 0.7);


        imageUIObject.transform.anchorX = wd.Vector2.create(0.3, 0.7);
        imageUIObject.transform.anchorY = wd.Vector2.create(0.15, 0.35);


        bitmapFontUIObject.transform.anchorX = wd.Vector2.create(0.1, 0.9);
        bitmapFontUIObject.transform.anchorY = wd.Vector2.create(0.4, 0.55);
    }


    function createUIRenderer() {
        var renderer = wd.UIRenderer.create();

        return renderer;
    }

    function createPanel(renderer) {
        var uiObject = wd.UIObject.create();

        var image = wd.Image.create();


        uiObject.addComponent(image);



        uiObject.transform.width = view.width * 0.9;
        uiObject.transform.height = view.height * 0.95;


        uiObject.addComponent(renderer);

        return uiObject;
    }

    function createProgressBar(renderer) {
        bar = wd.ProgressBar.create();

        bar.borderStyle = "#ff1112";
        bar.fillStyle = "rgb(1.0, 0.0, 0.0)";


        var uiObject = wd.UIObject.create();

        uiObject.addComponent(bar);


        uiObject.addComponent(renderer);

        return uiObject;
    }

    function createImageUI(renderer) {
        var image = wd.Image.create();
        image.source = wd.LoaderManager.getInstance().get("logo");


        var uiObject = wd.UIObject.create();

        uiObject.addComponent(image);


        uiObject.addComponent(renderer);

        return uiObject;
    }

    function createBitmapFont(renderer) {
        bitmapFont = wd.BitmapFont.create();

        bitmapFont.text = "loading:";
        bitmapFont.fntId = "myFont_fnt";
        bitmapFont.bitmapId = "myFont_image";
        bitmapFont.xAlignment = wd.FontXAlignment.CENTER;


        var uiObject = wd.UIObject.create();

        uiObject.addComponent(bitmapFont);


        uiObject.addComponent(renderer);


        var eventTriggerDetector = wd.UIEventTriggerDetector.create();

        uiObject.addComponent(eventTriggerDetector);

        uiObject.addComponent(wd.Script.create("./js/bitmapFontEventHandler.js"));


        return uiObject;
    }

    return {
        getPanel:function(){
            return panel;
        },
        getBar:function(){
            return bar;
        },
        getBitmapFont:function(){
            return bitmapFont;
        },

        createLoadingUI:createLoadingUI
    }
})();
