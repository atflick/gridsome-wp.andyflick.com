<template>
  <div class="blob-animation">
    <canvas ref="canvas"></canvas>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="liquid">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 250 -70"/>
          </filter>
          
          <!-- <filter id="transmissionerror">
            <feColorMatrix type="saturate" values="0" in="SourceGraphic" result="colormatrix1" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" in="colormatrix1" result="colormatrix2" />
            <feTurbulence ref="turbAnim" type="turbulence" baseFrequency="0.002 0.008" numOctaves="2" seed="5" stitchTiles="noStitch" result="turbulence">
              <animate ref="bfAnim" attributeName="baseFrequency" from="0.002 0.008" to="0.002 0.01" dur="500ms" repeatCount="indefinite" />
              <animate ref="ocAnim" attributeName="numOctaves" from="1" to="10" dur="750ms" repeatCount="indefinite" />
              <animate ref="sdAnim" attributeName="seed" from="1" to="100" dur="10s" repeatCount="indefinite" />
            </feTurbulence>
            <feColorMatrix type="saturate" values="30" in="turbulence" result="colormatrix3" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 100 -15" in="colormatrix3" result="colormatrix4" />
            <feDisplacementMap in="colormatrix2" in2="colomatrix4" scale="15" xChannelSelector="R" yChannelSelector="A" result="displacementMap" />
          </filter> -->
        
        </defs>
    </svg>
  </div>
</template>

<script>

import gsap from 'gsap'

class CircleBlob {
  constructor(pos, vm) {
    this.radius = 200
    this.animationRadius = 400
    this.initialPos = pos
    this.count = 0
    this.pos = pos
    this.duration = 20
    this.vm = vm
    this.draw()
  }

  draw() {
    this.vm.offCtx.fillStyle = '#efefef';
    this.vm.offCtx.beginPath();
    this.vm.offCtx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    this.vm.offCtx.closePath();
    this.vm.offCtx.fill();
  }
  
  newPos() {
    const angle = Math.random() * Math.PI * 2;
    const x = Math.cos(angle) * this.animationRadius;
    const y = Math.sin(angle) * this.animationRadius;
    // console.log(x, y)
    // console.log(this.initialPos)
    return {
      x: this.initialPos.x + x,
      y: this.initialPos.y + y
    }
  }
  
  animate() {
    console.log('animate')

    this.vm.tl.to(this.pos,
      {
        ...this.newPos(),
      duration: this.duration,
        callbackScope: this,
        onComplete() {
          this.animate()
        }
      }, this.count * this.duration);
    
    this.count+= 1
  }
}

export default {
  name: 'BlobAnimation',
  data() {
    return {
      c: {},
      ctx: null,
      w: 0,
      h: 0,
      tl: {},
      blobs: []
    }
  },
  mounted() {
    if (process.isClient) {
      this.$nextTick(function () {
        this.c = this.$refs.canvas
        this.ctx = this.c.getContext("2d", { alpha: false })
        this.c.offScreenCanvas = document.createElement('canvas');
  
        this.offCtx = this.c.offScreenCanvas.getContext("2d")
  
        gsap.ticker.fps(30);
        gsap.globalTimeline.eventCallback("onUpdate", () => {
          // console.log("tick", gsap.ticker.frame);
          this.ctx.clearRect(0, 0, this.w, this.h);
          this.ctx.drawImage(this.c.offScreenCanvas, 0, 0)
          this.offCtx.clearRect(0, 0, this.w, this.h);
        });
        this.tl = gsap.timeline({ defaults: {
          ease: "none",
          repeat: 0
        }})
  
        window.addEventListener('resize', this.resizeHandler)
        this.resizeHandler()
        this.render();
      })
    }

  }, 
  methods: {
    makeBlobs(amount) {
      for (let x = 0; x < amount; x++) {
        const coords = {
          x: Math.random() * this.w,
          y: Math.random() * this.h
        }
        this.blobs.push(new CircleBlob(coords, this))
      }
    },
    animate() {
      this.blobs.forEach((blob) => {
        // console.log(blob)
        blob.animate()
        gsap.ticker.add(() => {
          blob.draw()
        })   
      })
    },
    render() {
      this.makeBlobs(3)
      this.animate()
    },
    resizeHandler() {
      this.w = this.c.offScreenCanvas.width = this.c.width = window.innerWidth
      this.h = this.c.offScreenCanvas.height = this.c.height = window.innerHeight
      
    }
  }
}
</script>

<style lang="scss">
  .blob-animation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    canvas {
      height: 100%;
      width: 100%;
      filter: url(#liquid);
    }

    svg {
      position: absolute;
      height: 1px;
    }
  }

  body {
    // filter: url(#transmissionerror);
  }

</style>