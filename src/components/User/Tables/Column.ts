interface columnHeads{
  
  Header:string,
accessor:string
}
export const Columns:Array<columnHeads> = [
  {
    Header:"Sl No",// name to be shown as the header of column
    accessor:"Sl No" // field from data taken
  },
  {
    Header:"Id",
    accessor:"Id"
  },
  {
    Header:"Name",
    accessor:"Name"
  }
] 