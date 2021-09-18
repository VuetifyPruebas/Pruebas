<template>
   <!--  <v-alert
  border="top"
  color="green"
  dense
  dismissible
  elevation="15"
  prominent
  type="success"

></v-alert> -->

  <div>
       <a href="https://vuetifyjs.com/en/components/alerts/#usage"> Documentacion</a>
    <v-alert border="top" 
    color="red lighten-2" 
    dense 
    dismissible elevation="15" 
    prominent 
    type="warning"
     dark
      md="1">
        I'm an alert with a top border and red color
      </v-alert>
    <v-alert
      border="right"
      color="blue-grey"
      dark
    >
      I'm an alert with a right border and blue-grey color
    </v-alert>
    <v-alert
      border="left"
      color="pink darken-1"
      dark
    >
      I'm an alert with a bottom border and pink color
    </v-alert>
    <v-alert
      border="left"
      color="indigo"
      dark
    >
      I'm an alert with a border left type info
    </v-alert>





    <div id="app">
  <v-app id="inspire">
    <v-row>
      <v-col
        v-for="value in ['t', 'r', 'b', 'l']"
        :key="value"
        cols="5"
        md="3"
      >
       <a href="https://vuetifyjs.com/en/styles/border-radius/#rounding-by-side">Documentacion</a>
        <div
          :class="`rounded-${value}-xl`"
          class="pa-4 text-center secondary text-no-wrap"
          v-text="`.rounded-${value}-xl`"
        >
       
        </div>
      </v-col>
    </v-row>
  </v-app>
</div>
  </div>
  
</template>

