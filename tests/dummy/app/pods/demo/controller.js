import Ember from 'ember'
const {A, Controller} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {clamp, extent} from 'ember-frost-chart'

const POINTS = 100
const POINT_LOW = 0
const POINT_HIGH = 100

export default Controller.extend({

  // == Computed Properties ===================================================

  @readOnly
  @computed()
  data () {
    const data = A(Array.from({length: POINTS}, () => {
      return {
        x: (Math.floor(Math.random() * (POINT_HIGH - POINT_LOW + 1)) + POINT_LOW),
        y: (Math.floor(Math.random() * (POINT_HIGH - POINT_LOW + 1)) + POINT_LOW)
      }
    }))
    data.addObjects([
      {x: 0, y: 0},
      {x: 0, y: 100},
      {x: 100, y: 0},
      {x: 100, y: 100}
    ])
    return data
  },

  @readOnly
  @computed()
  option2 () {
    let data = []

    for (let i = 0; i <= 360; i++) {
      let t = i / 180 * Math.PI
      let r = Math.sin(2 * t) * Math.cos(2 * t)
      data.push([r, i])
    }

    return {
      title: {
        text: 'Polar'
      },
      legend: {
        data: ['line']
      },
      polar: {
        center: ['50%', '54%']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      angleAxis: {
        type: 'value',
        startAngle: 0
      },
      radiusAxis: {
        min: 0
      },
      series: [{
        coordinateSystem: 'polar',
        name: 'line',
        type: 'line',
        showSymbol: false,
        data: data
      }],
      animationDuration: 2000
    }
  },

  @readOnly
  @computed()
  option3 () {
    return {
      title: {
        text: 'Temp-humidity Bar chart'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      legend: {
        data: ['average', 'volume', 'temperature']
      },
      xAxis: [
        {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'volume',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} ml'
          }
        },
        {
          type: 'value',
          name: 'temperature',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value} °C'
          }
        }
      ],
      series: [
        {
          name: 'average',
          type: 'bar',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
          name: 'volume',
          type: 'bar',
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
          name: 'temperature',
          type: 'line',
          yAxisIndex: 1,
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
      ]
    }
  },

  @readOnly
  @computed()
  option4 () {
    let data = genData(50)

    return {
      title: {
        text: 'Pie Chart ',
        subtext: 'subtext'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        data: data.legendData,

        selected: data.selected
      },
      series: [
        {
          name: 'Seires name',
          type: 'pie',
          radius: '55%',
          data: data.seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  },

  @readOnly
  @computed('data.[]')
  boundingData (data) {
    return data.map((entry) => {
      return {
        x: entry.x,
        y: clamp(entry.y - 10, {min: 0})
      }
    })
  },

  @readOnly
  @computed('data')
  xDomain (data) {
    return extent(data.mapBy('x'))
  },

  @readOnly
  @computed('data')
  yDomain (data) {
    return extent(data.mapBy('y'))
  },

  arcData: [
    {
      value: 10,
      color: '#00aaff',
      label: 'not implemented yet',
      class: 'first'
    },
    {
      value: 30,
      color: '#00ddff',
      class: 'second'
    },
    {
      value: 10,
      color: '#00bbdd',
      class: 'third'
    },
    {
      value: 25,
      color: '#0088aa',
      class: 'fourth'
    },
    {
      value: 15,
      color: '#003366',
      class: 'fifth'
    },
    {
      value: 10,
      color: '#ffffff',
      class: 'sixth'
    }
  ]
})

function genData (count) {
  let nameList = [
    'Ethiopia ', 'Canada ', 'USA '
  ]
  let legendData = []
  let seriesData = []
  let selected = {}
  for (let i = 0; i <= 2; i++) {
    let name = nameList[i]
    legendData.push(name)
    seriesData.push({
      name: name,
      value: Math.round(Math.random() * 100000)
    })
  }

  return {
    legendData: legendData,
    seriesData: seriesData,
    selected: selected
  }
}
