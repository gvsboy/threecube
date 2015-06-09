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
  ],

  DodecahedronGeometry: [
    {
      name: 'radius',
      max: 4
    },
    {
      name: 'detail',
      value: 0,
      step: 1,
      min: 0,
      max: 4
    }
  ],

  IcosahedronGeometry: [
    {
      name: 'radius',
      max: 4
    },
    {
      name: 'detail',
      value: 0,
      step: 1,
      min: 0,
      max: 4
    }
  ],

  OctahedronGeometry: [
    {
      name: 'radius',
      max: 4
    },
    {
      name: 'detail',
      value: 0,
      step: 1,
      min: 0,
      max: 4
    }
  ],

  PlaneGeometry: [
    {
      name: 'width'
    },
    {
      name: 'height'
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
    }
  ],

  PlaneBufferGeometry: [
    {
      name: 'width'
    },
    {
      name: 'height'
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
    }
  ],

  RingGeometry: [
    {
      name: 'innerRadius',
      value: 1,
      min: 0
    },
    {
      name: 'outerRadius',
      value: 50,
      max: 50
    },
    {
      name: 'thetaSegments',
      value: 8,
      step: 1,
      min: 0,
      max: 32
    },
    {
      name: 'phiSegments',
      value: 8,
      step: 1,
      min: 1
    },
    {
      name: 'thetaStart',
      value: 0,
      step: 1,
      min: 0
    },
    {
      name: 'thetaLength',
      value: Math.PI * 2,
      max: Math.PI * 2
    }
  ]

  // ExtrudeGeometry
  // LatheGeometry
  // ParametricGeometry

};