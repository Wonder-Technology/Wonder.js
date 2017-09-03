var DeviceManagerTool = YYC.Class(DeviceManagerToolBase, {
    Public:{
        setGL: wd.setDeviceManagerGL,

        resetData: function(){
            wd.initDeviceManagerData(wd.DeviceManagerData);
        }
    }
})

var deviceManagerTool = new DeviceManagerTool();
