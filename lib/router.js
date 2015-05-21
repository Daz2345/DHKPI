Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('allReportData');
  }
});

Router.route('home', {
  path: '/'
});

Router.route('kpiTreeLatest', {
  path: '/KpiTreeLatest',
  template: 'kpiTreePage',
  data: function() {
    return ReportData.findOne({}, {sort: {inserteddate: -1 }});
  }
});

Router.route('kpiTreePage', {
  path: '/kpiTreePage/:_id',
  template: 'kpiTreePage',
  data: function() {
    return ReportData.findOne(this.params._id);
  }
});

AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/login',
    template: 'login',
    redirect: '/',
});