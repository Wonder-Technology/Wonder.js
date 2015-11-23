/// <reference path="../../filePath.d.ts"/>

/*! referenced from:
https://github.com/mrdoob/three.js
*/
module dy{
    const DDS_MAGIC = 0x20534444;
    const DDSD_CAPS = 0x1,
        DDSD_HEIGHT = 0x2,
        DDSD_WIDTH = 0x4,
        DDSD_PITCH = 0x8,
        DDSD_PIXELFORMAT = 0x1000,
        DDSD_MIPMAPCOUNT = 0x20000,
        DDSD_LINEARSIZE = 0x80000,
        DDSD_DEPTH = 0x800000;
    const DDSCAPS_COMPLEX = 0x8,
        DDSCAPS_MIPMAP = 0x400000,
        DDSCAPS_TEXTURE = 0x1000;
    const DDSCAPS2_CUBEMAP = 0x200,
        DDSCAPS2_CUBEMAP_POSITIVEX = 0x400,
        DDSCAPS2_CUBEMAP_NEGATIVEX = 0x800,
        DDSCAPS2_CUBEMAP_POSITIVEY = 0x1000,
        DDSCAPS2_CUBEMAP_NEGATIVEY = 0x2000,
        DDSCAPS2_CUBEMAP_POSITIVEZ = 0x4000,
        DDSCAPS2_CUBEMAP_NEGATIVEZ = 0x8000,
        DDSCAPS2_VOLUME = 0x200000;
    const DDPF_ALPHAPIXELS = 0x1,
        DDPF_ALPHA = 0x2,
        DDPF_FOURCC = 0x4,
        DDPF_RGB = 0x40,
        DDPF_YUV = 0x200,
        DDPF_LUMINANCE = 0x20000;

    export class DDSParser{
        public static parse(buffer:any, loadMipmaps:boolean=true){
            var dds = new DDSData();

            var FOURCC_DXT1 = this._fourCCToInt32("DXT1");
            var FOURCC_DXT3 = this._fourCCToInt32("DXT3");
            var FOURCC_DXT5 = this._fourCCToInt32("DXT5");

            var headerLengthInt = 31; // The header length in 32 bit ints

            // Offsets into the header array

            var off_magic = 0;

            var off_size = 1;
            var off_flags = 2;
            var off_height = 3;
            var off_width = 4;

            var off_mipmapCount = 7;

            var off_pfFlags = 20;
            var off_pfFourCC = 21;
            var off_RGBBitCount = 22;
            var off_RBitMask = 23;
            var off_GBitMask = 24;
            var off_BBitMask = 25;
            var off_ABitMask = 26;

            var off_caps = 27;
            var off_caps2 = 28;
            var off_caps3 = 29;
            var off_caps4 = 30;

            // Parse header

            var header:Int32Array = new Int32Array( buffer, 0, headerLengthInt );

            if ( header[ off_magic ] !== DDS_MAGIC ) {
                Log.error(true, "Invalid magic number in DDS header." );
                return dds;
            }

            if ( <any>(!header[ off_pfFlags ]) & DDPF_FOURCC ) {
                Log.error(true, "Unsupported format, must contain a FourCC code." );
                return dds;
            }

            var blockBytes;

            var fourCC = header[ off_pfFourCC ];

            var isRGBAUncompressed = false;

            switch ( fourCC ) {
                case FOURCC_DXT1:
                    blockBytes = 8;
                    dds.format = TextureFormat.RGB_S3TC_DXT1;
                    break;
                case FOURCC_DXT3:
                    blockBytes = 16;
                    dds.format = TextureFormat.RGBA_S3TC_DXT3;
                    break;
                case FOURCC_DXT5:
                    blockBytes = 16;
                    dds.format = TextureFormat.RGBA_S3TC_DXT5;
                    break;
                default:
                    if ( header[off_RGBBitCount] == 32
                        && header[off_RBitMask]&0xff0000
                        && header[off_GBitMask]&0xff00
                        && header[off_BBitMask]&0xff
                        && header[off_ABitMask]&0xff000000  ) {
                        isRGBAUncompressed = true;
                        blockBytes = 64;
                        dds.format = TextureFormat.RGBA;
                    }
                    else {
                        Log.error(true, "Unsupported FourCC code " + this._int32ToFourCC( fourCC ) );
                        return dds;
                    }
            }

            dds.mipmapCount = 1;

            if ( header[ off_flags ] & DDSD_MIPMAPCOUNT && loadMipmaps !== false ) {
                dds.mipmapCount = Math.max( 1, header[ off_mipmapCount ] );
            }

            //TODO: Verify that all faces of the cubemap are present with DDSCAPS2_CUBEMAP_POSITIVEX, etc.

            dds.isCubemap = header[ off_caps2 ] & DDSCAPS2_CUBEMAP ? true : false;

            dds.width = header[ off_width ];
            dds.height = header[ off_height ];

            var dataOffset = header[ off_size ] + 4;

            // Extract mipmaps buffers

            var width = dds.width;
            var height = dds.height;

            var faces = dds.isCubemap ? 6 : 1;

            for ( var face = 0; face < faces; face ++ ) {

                for ( var i = 0; i < dds.mipmapCount; i ++ ) {

                    if ( isRGBAUncompressed ) {
                        var byteArray = this._loadARGBMip( buffer, dataOffset, width, height );
                        var dataLength = byteArray.length;
                    }
                    else {
                        var dataLength = Math.max( 4, width ) / 4 * Math.max( 4, height ) / 4 * blockBytes;
                        var byteArray = new Uint8Array( buffer, dataOffset, dataLength );
                    }

                    var mipmap = <CompressedTextureMipmap>{ "data": byteArray, "width": width, "height": height };
                    dds.mipmaps.addChild( mipmap );

                    dataOffset += dataLength;

                    width = Math.max( width * 0.5, 1 );
                    height = Math.max( height * 0.5, 1 );

                }

                width = dds.width;
                height = dds.height;

            }

            return dds;
        }

        private static _fourCCToInt32( value ) {
            return value.charCodeAt(0) +
                (value.charCodeAt(1) << 8) +
                (value.charCodeAt(2) << 16) +
                (value.charCodeAt(3) << 24);

        }
        private static _int32ToFourCC( value ) {
            return String.fromCharCode(
                value & 0xff,
                (value >> 8) & 0xff,
                (value >> 16) & 0xff,
                (value >> 24) & 0xff
            );
        }
        private static _loadARGBMip( buffer, dataOffset, width, height ) {
            var dataLength = width * height * 4;
            var srcBuffer = new Uint8Array( buffer, dataOffset, dataLength );
            var byteArray = new Uint8Array( dataLength );
            var dst = 0;
            var src = 0;
            for ( var y = 0; y < height; y ++ ) {
                for ( var x = 0; x < width; x ++ ) {
                    var b = srcBuffer[src]; src ++;
                    var g = srcBuffer[src]; src ++;
                    var r = srcBuffer[src]; src ++;
                    var a = srcBuffer[src]; src ++;
                    byteArray[dst] = r; dst ++;	//r
                    byteArray[dst] = g; dst ++;	//g
                    byteArray[dst] = b; dst ++;	//b
                    byteArray[dst] = a; dst ++;	//a
                }
            }
            return byteArray;
        }
    }

    export class DDSData{
        public mipmaps:dyCb.Collection<CompressedTextureMipmap> = dyCb.Collection.create<CompressedTextureMipmap>();
        public width:number = 0;
        public height:number = 0;
        public format:TextureFormat = null;
        public mipmapCount:number = 1;
        public isCubemap:boolean = false;
    }
}
