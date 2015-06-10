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
      value: 2,
      max: 10
    },
    {
      name: 'thetaSegments',
      value: 32,
      step: 1,
      min: 3,
      max: 64
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
      step: Math.PI / 64,
      max: Math.PI * 2
    }
  ],

  TetrahedronGeometry: [
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

  TorusGeometry: [
    {
      name: 'radius',
      value: 1.5
    },
    {
      name: 'tube',
      value: 0.5
    },
    {
      name: 'radialSegments',
      value: 16,
      max: 64
    },
    {
      name: 'tubularSegments',
      value: 100,
      max: 100
    },
    {
      name: 'arc',
      value: Math.PI * 2
    }
  ],

  TorusKnotGeometry: [
    {
      name: 'radius',
      value: 1.5
    },
    {
      name: 'tube',
      value: 0.5
    },
    {
      name: 'radialSegments',
      value: 16,
      step: 1,
      min: 1,
      max: 64
    },
    {
      name: 'tubularSegments',
      value: 64,
      max: 128
    },
    {
      name: 'p',
      value: 2
    },
    {
      name: 'q',
      value: 3
    },
    {
      name: 'heightScale',
      value: 1
    }
  ]

  // ExtrudeGeometry
  // LatheGeometry
  // ParametricGeometry
  // TextGeometry
  // TubeGeometry

};