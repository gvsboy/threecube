import _ from 'lodash';

var data = {

  BoxGeometry: [
    {
      name: 'width'
    },
    {
      name: 'height'
    },
    {
      name: 'depth'
    },
    {
      name: 'widthSegments'
    },
    {
      name: 'heightSegments'
    },
    {
      name: 'depthSegments'
    }
  ],

  SphereGeometry: [
    {
      name: 'radius'
    },
    {
      name: 'widthSegments',
      value: 32
    },
    {
      name: 'heightSegments',
      value: 32
    },
    {
      name: 'phiStart',
      value: 0
    },
    {
      name: 'phiLength',
      value: Math.PI * 2
    },
    {
      name: 'thetaStart',
      value: 0
    },
    {
      name: 'thetaLength',
      value: Math.PI
    }
  ],

  CylinderGeometry: [
    {
      name: 'radiusTop'
    },
    {
      name: 'radiusBottom'
    },
    {
      name: 'height',
      value: 3
    },
    {
      name: 'radiusSegments',
      value: 32
    },
    {
      name: 'heightSegments'
    },
    {
      name: 'openEnded',
      value: false
    },
    {
      name: 'thetaStart',
      value: 0
    },
    {
      name: 'thetaLength',
      value: Math.PI * 2
    }
  ],

  CircleGeometry: [
    {
      name: 'radius'
    },
    {
      name: 'segments',
      value: 32
    },
    {
      name: 'thetaStart',
      value: 0
    },
    {
      name: 'thetaLength',
      value: Math.PI * 2
    }
  ],

  PointLight : [
    {
      name: 'hex',
      value: 0xffffff
    }
  ]

};

// Default values for some data object keys.
var defaults = {
  value: 1,
  min: 1,
  max: 10
};

// Nerd alert.
//var map = _.rearg(_.curry(_.map, 2), [1, 0]);
var map = _(_.map).rearg([1, 0]).curry(2).value();

var getDataByLabel = _.curry((data, label) => {
  return data[label];
});

var getParameterByNameOrDefault = _.curry((defaults, name, param) => {
  return _.isUndefined(param[name]) ? defaults[name] : param[name];
});

var getValueParameter = getParameterByNameOrDefault(defaults, 'value');

var decorateDataWithDefaults = _.curry((defaults, data) => {
  return _.map(data, arg => {
    return _.defaults(arg, defaults);
  });
});


export default {

  /**
   * Retrieves the ordered default argument values for an object by label.
   * @param {String} label The object label to retrieve default args for.
   * @return {Array} The ordered collection of values.
   */
  getDefaultArgs: _.flowRight(map(getValueParameter), getDataByLabel(data)),

  /**
   * Retrieves an object's default data by label. This includes argument names,
   * initial values, and value boundaries.
   * @param {String} label The object label to retrieve data for.
   * @return {Object} A map of all the default values.
   */
  getAllDefaults: _.flowRight(decorateDataWithDefaults(defaults), getDataByLabel(data))
}
