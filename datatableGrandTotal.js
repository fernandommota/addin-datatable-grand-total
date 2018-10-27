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
  var totals = {};

  //register addIn
  Dashboard.registerGlobalAddIn(
    "Table",
    "colType",
    new AddIn({
      name: "datatableGrandTotal",
      label: "Numeric BR",
      defaults: {},
      implementation: function(tgt, st, opt) {
        tableId = "#" + tgt.parentNode.parentNode.parentNode.id;

        //initialize if necessary the object
        if (isNaN(totals[st.colIdx])) totals[st.colIdx] = new Array();

        //clear the grandTotal variable when the table is filtered
        if (tgt.parentNode.rowIndex == 1) {
          totals[st.colIdx].total = 0;
          totals[st.colIdx].grandTotal = 0;
          for (var i = 0; i < st.rawData.queryInfo.totalRows; i++)
            totals[st.colIdx].grandTotal += st.rawData.resultset[i][st.colIdx];

          if (opt.formatFunction)
            formattedGrandTotal = opt.formatFunction(
              totals[st.colIdx].grandTotal
            );
          else
            formattedGrandTotal = defaultFormatFunction(
              totals[st.colIdx].grandTotal
            );
          $(tableId + " tfoot tr:last td")
            .eq(st.colIdx)
            .html(`<span class="pull-right">${formattedGrandTotal}</span>`);
        }

        totals[st.colIdx].total += st.value;
        if (opt.formatFunction)
          formattedTotal = opt.formatFunction(totals[st.colIdx].total);
        else formattedTotal = defaultFormatFunction(totals[st.colIdx].total);
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