type pdfFormat =
  | Letter
  | Legal
  | Tabload
  | Ledger
  | A0
  | A1
  | A2
  | A3
  | A4
  | A5;

module PDFOptions = {
  [@bs.val] external path : option(string) = "";
  [@bs.val] external scale : option(float) = "";
  [@bs.val] external displayHeaderFooter : option(bool) = "";
  [@bs.val] external printBackground : option(bool) = "";
  [@bs.val] external landscape : option(bool) = "";
  /* TODO: rest of PDFOptions */
};

/*
   export interface PDFOptions {
     /* If no path is provided, the PDF won't be saved to the disk. */
     path?: string;
     scale?: number;
     displayHeaderFooter?: boolean;
     printBackground?: boolean;
     landscape?: boolean;
     /*
      * Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty
      * string, which means print all pages.
      */
     pageRanges?: string;
     format?: PDFFormat;
     width?: string;
     height?: string;
     margin?: {
       top?: string;
       right?: string;
       bottom?: string;
       left?: string;
     };
   }
*/
