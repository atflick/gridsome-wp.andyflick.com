<template>
  <div class="map">
    <div class="map-nav">
      <button class="map-nav-button" @click="setActiveMarker('work', $event)">Work</button>
      <button class="map-nav-button" @click="setActiveMarker('education', $event)">Education</button>
    </div>
    <div class="map-wrapper">
      <MglMap :accessToken="accessToken" :mapStyle="mapStyle" @load="onMapLoad" ref="map">
        <MglMarker v-for="marker in activeMarkers" :coordinates="marker.coordinates" :color="marker.color" anchor="top" :key="marker.name">
          <MglPopup>
            <div>{{ marker.name }}</div>
          </MglPopup>
        </MglMarker>
      </MglMap>
    </div>
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl';
import { MglMap, MglMarker, MglPopup } from 'vue-mapbox';

export default {
  components: {
    MglMap,
    MglMarker,
    MglPopup
  },
  data() {
    return {
      accessToken: 'pk.eyJ1IjoiYXRmbGljayIsImEiOiJjazZ0cjdxOWcwMjNxM2VvZzVjbGcwcmNkIn0.f8xbI0e6ZEKvp-FHitk43A',
      mapStyle: 'mapbox://styles/mapbox/dark-v10',
      activeMarkers: Array,
      markers: {
        work: [
         {
           name: 'FINRA',
           coordinates: [-77.199063, 39.107537],
           color: 'blue'
         },
         {
           name: 'Keller Benefit Services',
           coordinates: [-77.093979, 38.982940],
           color: 'blue'
         },
         {
           name: 'nclud',
           coordinates: [-77.032911, 38.902225],
           color: 'blue'
         },
         {
           name: 'Interactive Strategies',
           coordinates: [-77.040279, 38.904950],
           color: 'blue'
         },
       ],
       education: [
          {
           name: 'Walter Johnson HS',
           coordinates: [-77.130523, 39.025429],
           color: 'blue'
         },
         {
           name: 'West Virginia University',
           coordinates: [-79.969672, 39.648069],
           color: 'blue'
         }
       ]
      }
    };
  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  },
  methods: {
    async onMapLoad(event) {
      // Here we cathing 'load' map event
      const asyncActions = event.component.actions
      this.activeMarkers = this.markers.work;
      const center = this.findMapCenter(this.activeMarkers);
      console.log(this.$refs.map);
      this.$refs.map
      const newParams = await asyncActions.flyTo({
        center,
        zoom: 9,
        speed: 3,
        bearing: 9,
        pitch: 7
      })
    },
    setActiveMarker(category, event) {


      this.activeMarkers = this.markers[category]
      const center = this.findMapCenter(this.activeMarkers);
      console.log(this.$refs.map);
      // this.mapbox.flyTo({
      //   center,
      //   zoom: 9,
      //   speed: 3,
      //   bearing: 9,
      //   pitch: 7
      // })

    },
    findMapCenter(markers) {

      const initialVal = [0, 0];
      const totalCoords = markers.reduce((acc, cur, index) => {

        return [acc[0] + cur.coordinates[0], acc[1] + cur.coordinates[1]]

      }, initialVal);

      return [totalCoords[0] / markers.length, totalCoords[1] / markers.length]

    }
  }
};
</script>

<style lang="scss">
  .map-wrapper {
    height: 500px;
  }
</style>