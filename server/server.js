  Meteor.publish('allReportData', function() {
    return ReportData.find();
  });
