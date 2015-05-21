  Template.reportslist.helpers({
    listofreports: function() {
      return ReportData.find({}, {
        sort: {
          inserteddate: -1
        }
      });
    }
  });

  var chart;

  Template.trendschart.rendered = function() {

    var thischart = {
      bindto: this.find('.trendschart'),
      data: {
        json: chartData(),
        // type: 'bar',
        types: {
          SPC: 'bar',
          Customers: 'bar',
          CP: 'bar',
          TC: 'bar',
          SPV: 'bar',
          VPC: 'bar',
          PPU: 'bar',
          UPV: 'bar',
          Sales: 'area'
        },
        groups: [
          ['SPC', 'Customers', 'CP', 'TC', 'SPV', 'VPC', 'PPU', 'UPV']
        ],
        // color: {
        //   pattern: ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
        // }
        colors: {
          SPC: '#A31A7E',
          Customers: '#009B74',
          CP: '#663399',
          TC: '#1f77b4',
          SPV: '#aec7e8',
          VPC: '#ff7f0e',
          PPU: '#ffbb78',
          UPV: '#2ca02c',
          Sales: '#E17000'
        },
        names: {
          SPC: 'Spend per Customer',
          Customers: 'Customers',
          CP: 'Customer Penetration',
          TC: 'Tesco Customers',
          SPV: 'Spend per Visit',
          VPC: 'Visits per Customer',
          PPU: 'Price per Unit',
          UPV: 'Units per Visit',
          Sales: 'Sales'          
        }
      },
      point: {
        show: false
      },
      transition: {
        duration: 1000
      },
      axis: {
        x: chartxaxis()
      },
      subchart: {
        show: chartsub() 
      },
      grid: {
        y: {
          lines: [{
            value: 0
          }]
        }
      }
    };

     chart = c3.generate(thischart);
  
      this.autorun(function() {
        chartRefresh();
    });

  };

function chartData() {
    var data = Template.currentData().chartdata.value;
    return data;
}

function chartxaxis() {
    var xaxis = Template.currentData().chartdata.xvalues;
    return xaxis;
}

function chartsub() {
    var sub = Template.currentData().chartdata.subchart;
    return sub;
}

function chartRefresh() {
    chart.load({
        json: chartData(),
        axis: {
        x: chartxaxis()
      },
      subchart: {
        show: chartsub()
      }
    });
}