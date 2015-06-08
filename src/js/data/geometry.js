export default {

  BoxGeometry: [
    {
      name: 'width',
    },
    {
      name: 'height'
    },
    {
      name: 'depth'
    },
    {
      name: 'widthSegments',
      step: 1,
      min: 1
    },
    {
      name: 'heightSegments',
      step: 1,
      min: 1
    },
    {
      name: 'depthSegments',
      step: 1,
      min: 1
    }
  ],

  SphereGeometry: [
    {
      name: 'radius',
      max: 4
    },
    {
      name: 'widthSegments',
      value: 32,
      step: 1,
      min:1,
      max: 64
    },
    {
      name: 'heightSegments',
      value: 32,
      step: 1,
      min: 1,
      max: 64
    },
    {
      name: 'phiStart',
      value: 0,
      step: 1,
      min: 0,
      max: 360
    },
    {
      name: 'phiLength',
      value: Math.PI * 2,
      max: 360
    },
    {
      name: 'thetaStart',
      value: 0,
      step: 1,
      min: 0,
      max: 360
    },
    {
      name: 'thetaLength',
      value: Math.PI * 2,
      max: 360
    }
  ],

  CylinderGeometry: [
    {
      name: 'radiusTop',
      step: 1,
      min: 1
    },
    {
      name: 'radiusBottom',
      step: 1,
      min: 1
    },
    {
      name: 'height',
      value: 3
    },
    {
      name: 'radiusSegments',
      value: 32,
      step: 1,
      min: 1,
      max: 64
    },
    {
      name: 'heightSegments',
      step: 1,
      min: 1,
      max: 64
    },
    {
      name: 'openEnded',
      value: false
    },
    {
      name: 'thetaStart',
      value: 0,
      step: 1,
      min: 0,
      max: 360
    },
    {
      name: 'thetaLength',
      value: Math.PI * 2,
      max: 360
    }
  ],

  CircleGeometry: [
    {
      name: 'radius',
      max: 4
    },
    {
      name: 'segments',
      value: 32,
      step: 1,
      min: 1,
      max: 64
    },
    {
      name: 'thetaStart',
      value: 0,
      step: 1,
      min: 0,
      max: 360
    },
    {
      name: 'thetaLength',
      value: Math.PI * 2,
      max: 360
    }
  ]

};