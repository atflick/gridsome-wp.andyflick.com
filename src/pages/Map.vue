<template>
  <div class="map">
    <div class="map-nav">
      <button class="map-nav-button" @click="setActiveMarker('work', $event)">Work</button>
      <button class="map-nav-button" @click="setActiveMarker('education', $event)">Education</button>
    </div>
    <div class="map-wrapper">
      <MglMap :accessToken="accessToken" :mapStyle="mapStyle" @load="onMapLoad" ref="map">
        <MglMarker v-for="marker in activeMarkers" :coordinates="marker.coordinates" anchor="top" :key="marker.name">
          <div class="icon-location"></div>
          <!-- <MglPopup>
            <div>{{ marker.name }}</div>
          </MglPopup> -->
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
      },
      map: {}
    };
  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.map = null;
  },
  methods: {
    async onMapLoad(event) {
      // Here we cathing 'load' map event
      console.log(Mapbox);

      this.map = event.map;
      const asyncActions = event.component.actions
      this.activeMarkers = this.markers.work;
      const coords = this.setBoundsArray(this.activeMarkers);
      console.log(coords);

      asyncActions.fitBounds(coords, {
        padding: 50
      });
    },
    setActiveMarker(category, event) {

      this.activeMarkers = this.markers[category]
      const coords = this.setBoundsArray(this.activeMarkers);
      console.log(coords);
      this.map.fitBounds(coords, {
        padding: 50
      })

    },
    setBoundsArray(markers) {
      console.log(markers);

      const bounds = markers.reduce((bounds, marker) => {
        console.log(Mapbox);

        return bounds.extend(marker.coordinates);
      }, new Mapbox.LngLatBounds(markers[0].coordinates, markers[0].coordinates));
      return bounds;
    }
  }
};
</script>

<style lang="scss">
  .map-wrapper {
    height: 500px;
  }

  .mapboxgl {

    &-popup-content {
      padding: 25px !important;
      border-radius: 0 !important;
      box-shadow: $shadow;
      border-top: 4px solid rgba(primary-color(purple), .3);

      > div {
        font-family: $body-font !important;
        @include rem(font-size, 16px);
      }
    }

    &-popup-close-button {
      @include rem(font-size, 18px);
      outline: 0;
    }
  }
</style>