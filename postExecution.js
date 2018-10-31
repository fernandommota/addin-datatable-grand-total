function postExecution() {
  $("#" + this.htmlObject + "Table")
    .parent()
    .addClass("table-responsive");

  var tableId = "#" + this.htmlObject + "Table";
  var tableColumnSize = $(tableId + " th").length;
  var tableColumnGrandTotalSize = $(tableId + " th.datatableGrandTotal").length;
  var tableColumncolspan = tableColumnSize - tableColumnGrandTotalSize;

  var tfootTemplate =
    "<tfoot>" +
    '<tr class="datatable-total">' +
    "<td>Total</td>{{tdTotal}}" +
    "</tr>" +
    '<tr class="datatable-grand-total">' +
    "<td>Grand Total</td>{{tdGrandTotal}}" +
    "</tr>" +
    "</tfoot>";

  var tdTotal = "";
  var tdGrandTotal = "";
  for (var i = 0; i < tableColumnSize - 1; i++) {
    tdTotal += "<td></td>";
    tdGrandTotal += "<td></td>";
  }

  tfootTemplate = tfootTemplate
    .replace("{{tdTotal}}", tdTotal)
    .replace("{{tdGrandTotal}}", tdGrandTotal);

  $(tableId).append(tfootTemplate);

  //force the render of table
  $(tableId + "_filter input")
    .val(" ")
    .keyup()
    .val("");
}
