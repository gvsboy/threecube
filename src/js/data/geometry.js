export default {

  BoxGeometry:  {
    args: [
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
        name: 'widthSegments',
        value: 1,
        step: 1,
        min: 1
      },
      {
        name: 'heightSegments',
        value: 1,
        step: 1,
        min: 1
      },
      {
        name: 'depthSegments',
        value: 1,
        step: 1,
        min: 1
      }
    ]
  },

  SphereGeometry: {
    args: [
      {
        name: 'radius'
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
        value: 16,
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
        value: Math.PI,
        max: 360
      }
    ]
  },

  CylinderGeometry: {
    args: [
      {
        name: 'radiusTop',
        value: 30,
        max: 100
      },
      {
        name: 'radiusBottom',
        value: 30,
        max: 100
      },
      {
        name: 'height',
        value: 100,
        max: 200
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
    ]
  },

  CircleGeometry: {
    args: [
      {
        name: 'radius'
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
  },

  DodecahedronGeometry: {
    args: [
      {
        name: 'radius'
      },
      {
        name: 'detail',
        value: 0,
        step: 1,
        min: 0,
        max: 4
      }
    ]
  },

  IcosahedronGeometry: {
    args: [
      {
        name: 'radius'
      },
      {
        name: 'detail',
        value: 0,
        step: 1,
        min: 0,
        max: 4
      }
    ]
  },

  OctahedronGeometry: {
    args: [
      {
        name: 'radius'
      },
      {
        name: 'detail',
        value: 0,
        step: 1,
        min: 0,
        max: 4
      }
    ]
  },

  PlaneGeometry: {
    args: [
      {
        name: 'width'
      },
      {
        name: 'height'
      },
      {
        name: 'widthSegments',
        value: 1,
        step: 1,
        min: 1,
        max: 64
      },
      {
        name: 'heightSegments',
        value: 1,
        step: 1,
        min: 1,
        max: 64
      }
    ]
  },

  PlaneBufferGeometry: {
    args: [
      {
        name: 'width'
      },
      {
        name: 'height'
      },
      {
        name: 'widthSegments',
        value: 1,
        step: 1,
        min: 1,
        max: 64
      },
      {
        name: 'heightSegments',
        value: 1,
        step: 1,
        min: 1,
        max: 64
      }
    ]
  },

  RingGeometry: {
    args: [
      {
        name: 'innerRadius',
        value: 20,
        step: 1,
        min: 0
      },
      {
        name: 'outerRadius',
        value: 30,
        step: 1,
        min: 0
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
    ]
  },

  TetrahedronGeometry: {
    args: [
      {
        name: 'radius'
      },
      {
        name: 'detail',
        value: 0,
        step: 1,
        min: 0,
        max: 4
      }
    ]
  },

  TorusGeometry: {
    args: [
      {
        name: 'radius'
      },
      {
        name: 'tube',
        value: 10
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
        value: 7,
        step: 1,
        min: 1,
        max: 100
      },
      {
        name: 'arc',
        value: Math.PI * 2
      }
    ]
  },

  TorusKnotGeometry: {
    args: [
      {
        name: 'radius'
      },
      {
        name: 'tube',
        value: 10
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
  }

  // ExtrudeGeometry
  // LatheGeometry
  // ParametricGeometry
  // TextGeometry
  // TubeGeometry

};