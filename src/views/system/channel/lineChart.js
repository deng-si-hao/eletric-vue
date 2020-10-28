import echarts from "echarts"
export function chart(data) {
  var myChart = echarts.init(document.getElementById('main'));
  var xAxisData=[]

  if (data) {
    xAxisData = data.xAD
  }

  // const xAxisData = ["2020-05-11", "2020-05-12", "2020-05-13", "2020-05-14", "2020-05-15", "2020-05-16", "2020-05-17", "2020-05-18", "2020-05-19", "2020-05-20", "2020-05-21", "2020-05-22", "2020-05-23", "2020-05-24", "2020-05-25", "2020-05-26", "2020-05-27", "2020-05-28", "2020-05-29", "2020-05-30", "2020-05-31", "2020-06-01", "2020-06-02", "2020-06-03", "2020-06-04", "2020-06-05", "2020-06-06", "2020-06-07", "2020-06-08", "2020-06-09", "2020-06-10"]
  var option = {
    "textStyle": {
      "fontFamily": "Din-Light"
    },
    "color": ["#123dac", "#73e2e2", "#ff7e85", "#9b52ff", "#fac524", "#46caff", "#a1e867", "#10b2b2", "#ec87f7", "#f4905a", "#00baba", "#facf24", "#e89d67", "#23c6c6", "#fa8699", "#40b7fc", "#006d75", "#595959", "#f4764f", "#a640fc", "#fda23f", "#2d7ae4", "#5092ff", "#9351ed", "#8a89fe", "#df89e8", "#2797ff", "#6ad089", "#7c92e8 "],
    "title": {
      "text": "采集通道数据",
      "left": "47%",
      "textStyle": {
        "fontSize": 24
      }
    },
    "legend": {
      "data": [],
      "left": "left",
      "selected": {},
      "itemWidth": 10,
      "itemHeight": 10,
      "itemGap": 10,
      "textStyle": {
        "color": "#898989",
        "lineHeight": 15
      },
      "type": "scroll",
    },
    "tooltip": {
      "backgroundColor": "#fff",
      "trigger": "axis",
      "axisPointer": {
        "type": "none"
      },
      "textStyle": {
        "color": "#565656",
        "lineHeight": 28
      },
      "confine": true,
      "padding": 12,
      "extraCssText": "box-shadow: 0px 2px 8px 0px #cacaca;border-radius: 4px;opacity: 0.9;max-height: 100%;",
      "formatter": {
        "_custom": {
          "type": "function",
          "display": "<span>ƒ</span> (params)"
        }
      }
    },
    "grid": {
      "left": 0,
      "right": 0,
      "top": 100,
      "bottom": 100
    },
    "xAxis": {
      "type": "category",
      "boundaryGap": true,
      "data": xAxisData,
      "axisLabel": {
        "color": "#a0a9bc",
        //X轴标签 label 做了特殊处理，防止左右溢出
        formatter: (value, index) => {
          if (index === 0 || index === xAxisData.length - 1) {
            return "";
          }
          return value;
        }
      },
      "axisLine": {
        "show": false
      },
      "axisTick": {
        "show": false
      }
    },
    "yAxis": {
      "name": "",
      "nameTextStyle": {
        "color": "gray"
      },
      "type": "value",
      "axisLabel": {
        "color": "#a0a9bc",
        "inside": true,
        "margin": 0,
        "verticalAlign": "bottom"
      },
      "splitLine": {
        "lineStyle": {
          "type": "dashed"
        }
      },
      "minInterval": 1,
      "axisLine": {
        "show": false
      },
      "axisTick": {
        "show": false
      }
    },
    toolbox: {
      show: true,
      right: 20,
      feature: {
        dataZoom: {
          yAxisIndex:"none"
        },
        restore: {},
        saveAsImage: {
          type:"png"
        },
        dataView: {
          show: "true",
          title: "查看数据"
        }
      }
    },
    "series": []
  };
  if(data){
    option.series = data.data
    option.legend.data = data.legend
    option.legend.selected = data.selected
  }

  myChart.setOption(option, true);
}
