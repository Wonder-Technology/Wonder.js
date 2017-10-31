exception Check_fail(string);
/*
 external trace : string => 'b = "console.trace" [@@bs.val];

 let failwith (message: string) => {
   failwith message |> trace message;
   /* trace message |> ignore; */
 }; */
