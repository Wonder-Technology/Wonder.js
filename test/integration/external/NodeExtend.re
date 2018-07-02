/* external readFileSync :
     string ->
     (
       [
         `hex
       | `utf8
       | `ascii
       | `latin1
       | `base64
       | `ucs2
       | `base64
       | `binary
       | `utf16le ][@bs.string]) ->
     string = "readFileSync"
   [@@bs.val] [@@bs.module "fs"] */

[@bs.module "fs"]
external readFileBufferSync : string => 'buffer = "readFileSync";