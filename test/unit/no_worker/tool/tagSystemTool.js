var TagSystemTool = YYC.Class({
    Public: {
        resetData: function(){
            wd.initTagData(wd.TagData);
        }
    }
});

var tagSystemTool = new TagSystemTool();

YYC.Tool.extend.extend(tagSystemTool, tagTool);
