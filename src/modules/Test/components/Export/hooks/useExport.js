
import {utils,writeFile} from 'xlsx'

export function useExport() {
  function exportXlsx(doms){
    if(!Array.isArray(doms)) throw Error("You need to pass in an array of people containing the dom.")
    //创建工作表
    const wb = utils.book_new();
    //创建工作簿及sheet
    doms.forEach((item,index)=>{
      const sheet = utils.table_to_sheet(item);
      console.log(sheet,'sheet')
      utils.book_append_sheet(wb, sheet, `sheet名称${index}`);
    })

    writeFile(wb, `${new Date().getTime()}.xlsx`)
  }

  return {
    exportXlsx
  }
}