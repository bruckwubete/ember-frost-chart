import echarts from 'echarts'
import Ember from 'ember'
const {run} = Ember
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-echart'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  attributeBindings: ['style'],
  layout,

  // == PropTypes =============================================================

  propTypes: {
    // Required
    option: PropTypes.object,
    id: PropTypes.string,

    // Optional
    class: PropTypes.string

  },

  init () {
    this._super(...arguments)
    run.schedule('afterRender', this, function () {
      echarts.init(document.getElementById(this.get('id'))).setOption(this.get('option'))
    })
  }
})
