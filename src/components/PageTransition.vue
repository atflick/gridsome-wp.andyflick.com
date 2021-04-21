<template>
  <div class="transition">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        
        <filter id="transmissionerror">
    <feTurbulence 
      id="turb1"
      in="SourceGraphic" 
      type="fractalNoise" 
      baseFrequency="0 0" 
      numOctaves="1" 
      result="warp" />
    <animate 
      xlink:href="#turb1"
      attributeName="baseFrequency"
      values="0 0;0 0.006;0 0.016" 
      repeatCount="indefinite"
      dur="300ms" />
    <feDisplacementMap 
      in="SourceGraphic" 
      in2="warp"
      xChannelSelector="G" 
      yChannelSelector="B" 
      scale="30" 
      result="disp"/>
    <feGaussianBlur 
      id="blur1"
      in="disp"
      stdDeviation="3"
      result="blur" />
    <animate 
      xlink:href="#blur1"
      attributeName="stdDeviation"
      values="3.5;5.5;12.0" 
      repeatCount="indefinite"
      dur="300ms" />
    <feColorMatrix
      id="mat"
      in="blur"
      mode="matrix"
      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 12 -3"
      result="mat" />
    <animate 
      xlink:href="#mat"
      attributeName="values"
      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 10.0 -3;
              1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 8.0  -3;
              1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5.0  -3" 
      repeatCount="indefinite"
      dur="300ms"/>
    <feOffset 
      id="offset1"
      in="mat"
      dx="0" dy="0"
      result="move"/>
    <!-- <animate 
      xlink:href="#offset1"
      attributeName="dy"
      values="0;-10.5;-20.0" 
      repeatCount="indefinite"
      dur="300ms"/>
    <animate 
      xlink:href="#offset1"
      attributeName="dx"
      values="0;-20.5;10.0" 
      repeatCount="indefinite"
      dur="300ms"/> -->
          <!-- <feColorMatrix type="saturate" values="0" in="SourceGraphic" result="colormatrix1" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" in="colormatrix1" result="colormatrix2" />
          <feTurbulence ref="turbAnim" type="turbulence" baseFrequency="0.002 0.008" numOctaves="2" seed="5" stitchTiles="noStitch" result="turbulence">
            <animate ref="bfAnim" attributeName="baseFrequency" from="0.002 0.008" to="0.002 0.01" dur="500ms" repeatCount="indefinite" />
            <animate ref="ocAnim" attributeName="numOctaves" from="1" to="10" dur="750ms" repeatCount="indefinite" />
            <animate ref="sdAnim" attributeName="seed" from="1" to="100" dur="10s" repeatCount="indefinite" />
          </feTurbulence>
          <feColorMatrix type="saturate" values="30" in="turbulence" result="colormatrix3" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 100 -15" in="colormatrix3" result="colormatrix4" />
          <feDisplacementMap in="colormatrix2" in2="colomatrix4" scale="15" xChannelSelector="R" yChannelSelector="A" result="displacementMap" /> -->
        </filter>
      </defs>
    </svg>

  </div>
</template>

<script>
export default {
  name: 'PageTransition'
}
</script>

<style lang="scss" scoped>

</style>