<template>
  <div class="transition">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        
        <filter id="transmissionerror" x="-50%" y="-50%" width="200%" height="200%">
          <feColorMatrix type="saturate" values="1" in="SourceGraphic" result="colormatrix1" >
            <animate attributeName="values" from="1" to="1" values="1; 0; 1" keyTimes="0; .5; 1" attributeType="XML" dur="3s" repeatCount="indefinite"/>
          </feColorMatrix>
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" in="colormatrix1" result="colormatrix2">
            
          </feColorMatrix>
          <feTurbulence ref="turbAnim" type="turbulence" baseFrequency="0.002 0.008" numOctaves="2" seed="5" stitchTiles="noStitch" result="turbulence">
            <animate attributeName="baseFrequency" from="0 0" to="0.002 0.01" values="0 0; 0.002 0.01; 0 0" dur="3s" keyTimes="0; .5; 1" repeatCount="indefinite" />
            <animate attributeName="numOctaves" from="0" to="3" values="0; 3; 0" dur="3s" keyTimes="0; .5; 1" repeatCount="indefinite" />
            <animate attributeName="seed" from="1" to="100" values="1; 100; 1" dur="3s" keyTimes="0; .5; 1" repeatCount="indefinite" />
          </feTurbulence>
          <feColorMatrix type="saturate" values="30" in="turbulence" result="colormatrix3" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 100 -15" in="colormatrix3" result="colormatrix4" />
          <feDisplacementMap in="colormatrix2" in2="colomatrix4" scale="15" xChannelSelector="R" yChannelSelector="A" result="displacementMap">
            <animate attributeName="scale" from="0" to="0" values="0; -15; 15; 0" keyTimes="0; .25; .75; 1" attributeType="XML" dur="3s" repeatCount="indefinite"/>
          </feDisplacementMap>
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
  .transition,
  svg {
    height: 0;
  }
</style>