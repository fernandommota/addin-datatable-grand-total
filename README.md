# addin-datatable-grand-total

AddIn created to apply format numbers and make page total and full data totals for CTools datatable component.

<img src="https://raw.githubusercontent.com/fernandommota/addin-datatable-grand-total/master/img/appliedExample.png" alt="Example of addin-numeric-br" title="addIn numericBrGrandTotal" align="center" />

## Instalation

### Support to RequireJS

- Insert the file datatableGrandTotal.js path as a "Javascript External File" resource.

### Without RequireJS Support

- Insert the file datatableGrandTotal.js path as a "Javascript External File" resource.
- Remove the RequireJS import parts of script:

```JavaScript
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

 /*
 * should maintain the content of this function
 */

});
/** end addIn datatableGrandTotal **/
```

- Replace the object _Dashboard_ to _Dashboard_ as follow:

```JavaScript
 //register addIn
  Dashboards.registerGlobalAddIn(...)
```
