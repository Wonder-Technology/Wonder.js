module wd{
    export class SoundUtils{
        public static getMimeStr(mimeType:string){
            var mimeStr = null;

            //todo support more mimeType
            switch (mimeType) {
                case "mp3":
                    return "audio/mpeg";
                   case "ogg":
                       return "audio/ogg";
//                    case "vorbis":
//                        mimeStr = "audio/ogg; codecs="vorbis"";
//                        break;
//                    case "opus":
//                        mimeStr = "audio/ogg; codecs="opus"";
////                        break;
//                    case "webm":
//                        mimeStr = "audio/webm; codecs="vorbis"";
//                        break;
//                    case "mp4":
//                        mimeStr = "audio/mp4; codecs="mp4a.40.5"";
//                        break;
                case "wav":
                    return "audio/wav";
                default :
                    Log.warn(`unknown mimeType:${mimeType}`);
                    return null;
            }
        }
    }
}
