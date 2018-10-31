/** start addIn datatableGrandTotal
 * bovbi.com.br
 * @fernandommota Fernando Maia da Mota
 **/

define([
  "cdf/AddIn",
  "cdf/Dashboard.Clean",
  "cdf/lib/CCC/pvc",
  "cdf/lib/jquery"
], function(AddIn, Dashboard, pvc, $) {
  //function for format with mask BR
  defaultFormatFunction = pvc.data.numberFormat({
    mask: "R$ #,##0.00",
    style: {
      decimal: ",",
      group: "."
    }
  });

  //global variable
  var datatableTotals = {};

  //register addIn
  Dashboard.registerGlobalAddIn(
    "Table",
    "colType",
    new AddIn({
      name: "datatableGrandTotal",
      label: "Add-In DataTable Grand Total",
      defaults: {},
      implementation: function(tgt, st, opt) {
        tableId = "#" + tgt.parentNode.parentNode.parentNode.id;

        //initialize if necessary the object
        if (isNaN(datatableTotals[st.colIdx]))
          datatableTotals[st.colIdx] = new Array();

        //clear the grandTotal variable when the table is filtered
        if (tgt.parentNode.rowIndex == 1) {
          datatableTotals[st.colIdx].total = 0;
          datatableTotals[st.colIdx].grandTotal = 0;
          for (var i = 0; i < st.rawData.queryInfo.totalRows; i++)
            datatableTotals[st.colIdx].grandTotal +=
              st.rawData.resultset[i][st.colIdx];

          if (opt.formatFunction)
            formattedGrandTotal = opt.formatFunction(
              datatableTotals[st.colIdx].grandTotal
            );
          else
            formattedGrandTotal = defaultFormatFunction(
              datatableTotals[st.colIdx].grandTotal
            );
          $(tableId + " tfoot tr:last td")
            .eq(st.colIdx)
            .html(`<span class="pull-right">${formattedGrandTotal}</span>`);
        }

        datatableTotals[st.colIdx].total += st.value;
        if (opt.formatFunction)
          formattedTotal = opt.formatFunction(datatableTotals[st.colIdx].total);
        else
          formattedTotal = defaultFormatFunction(
            datatableTotals[st.colIdx].total
          );
        $(tableId + " tfoot tr:first td")
          .eq(st.colIdx)
          .html(`<span class="pull-right">${formattedTotal}</span>`);

        //console.log("opt", opt);
        if (opt.formatFunction) valueFormatted = opt.formatFunction(st.value);
        else valueFormatted = defaultFormatFunction(st.value);
        $(tgt)
          .empty()
          .append(`<span class="pull-right">${valueFormatted}</span>`);
      }
    })
  );
});
/** end addIn datatableGrandTotal **/
