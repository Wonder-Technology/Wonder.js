var wdAssemblerTool = (function () {
    var Collection = wdCb.Collection;

    return {
        setData: function(parseData, data) {
            cloneTool.extend(parseData, data);

            return cloneTool.extend(parseData);
        },
        setSingleObject: function (parseData, data){
            var objectData = Collection.create();
            objectData.addChild(data);

            this.setData(parseData, {
                objects:objectData
            });
        },
        setComponent: function (parseData, data){
            var componentData = null;

            if(data instanceof Collection){
                componentData = data;
            }
            else{
                componentData = Collection.create();

                componentData.addChild(data);
            }

            this.setSingleObject(parseData, {
                components:componentData
            });
        },
        getSingleModel:function (data){
            return data.getChild("models").getChild(0);
        },
        getComponent: function (data, _class){
            return this.getSingleModel(data).getComponent(_class)
        },
        hasComponent: function (data, className){
            return wd.ClassUtils.hasComponent(this.getSingleModel(data), className);
        }
    }
})()
