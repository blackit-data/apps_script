function update_analytics() {
  
  var pSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Report Configuration')
  
  var reportRange = pSheet.getRange('b2:c15')
  
  general(reportRange)
}



function analytics_export(reportRange) {

// Input is a range (not values) identical to the structure of the add-on inputs

// Example:
//  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Report Configuration')
//  var reportRange = sheet.getRange('b2:c15')
//  analytics_export(reportRange)
// No Spreadsheet URL input taken into account
  
  var input = reportRange.getValues()
  var rows = reportRange.getNumRows()
  var columns = reportRange.getNumColumns()
  
  for (var i = 0; i<columns; ++i){
  
    var output_sheet = input[0][i]
    var tableId = input[2][i]
    
    var startDate = Utilities.formatDate(input[3][i], 'GMT', "YYYY-MM-dd") 
    var endDate = Utilities.formatDate(input[4][i], 'GMT', "YYYY-MM-dd") 
    
    var metric = input[6][i];
   
    // OPTIONS
    var dimensions = input[7][i]=='' ? null : input[7][i];
    var sort = input[8][i]=='' ? null : input[8][i];
    var filters = input[9][i]=='' ? null : input[9][i];   
    var segment =input[10][i]=='' ? null : input[10][i];
    var sampling_level =input[11][i]=='' ? 'HIGHER_PRECISION' : input[11][i];
    var start_index = input[12][i]=='' ? null : input[12][i];
    var max_results = input[13][i]=='' ? 1000 : input[13][i];
    
     var options = {
    'dimensions': dimensions,
    'sort': sort,
    'filters': filters,
       'segment':segment,   
    'sampling-level':sampling_level,
       'start-index':start_index,
    'max-results': max_results
  };
    
      var report = Analytics.Data.Ga.get(tableId, startDate, endDate, metric,
      options);

      
  var report = Analytics.Data.Ga.get(tableId, startDate, endDate, metric,
      options);

  if (report.rows) {

    try {
    var check_range = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(output_sheet).getRange('a1')
    } 
  catch(err) {
    SpreadsheetApp.getActiveSpreadsheet().insertSheet(output_sheet)
  }
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(output_sheet)
    sheet.clearContents()
    // Append the headers.
    var headers = report.columnHeaders.map(function(columnHeader) {
      return columnHeader.name;
    });
    sheet.appendRow(headers);

    // Append the results.
    sheet.getRange(2, 1, report.rows.length, headers.length)
        .setValues(report.rows);

   /* Logger.log('Report spreadsheet created: %s',
        spreadsheet.getUrl());*/
  } else {
    Logger.log('No rows returned.');
  }
    
  }
  

  
}