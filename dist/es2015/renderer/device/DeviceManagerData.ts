import { EWebGLVersion } from "../enum/EWebGLVersion";
import { DeviceManagerDataCommon } from "../utils/worker/render_file/device/DeviceManagerDataCommon";

export class DeviceManagerData extends DeviceManagerDataCommon{
    public static webglVersion:EWebGLVersion = null;
}
