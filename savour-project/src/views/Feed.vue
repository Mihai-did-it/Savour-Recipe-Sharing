<script>
  import NavBar from "../components/NavBar.vue";
  import FeedCard from "../components/MDBComponents/FeedCard.vue"
  import { MDBCol, MDBRow, MDBContainer } from 'mdb-vue-ui-kit';

  export default {
    components: {
      NavBar,
      FeedCard,
      MDBCol, MDBRow, MDBContainer
    },
  }
</script>

<template>
  <div>
    <MDBRow>
      <MDBCol md="12"><nav-bar></nav-bar></MDBCol>
    </MDBRow>
    <MDBRow class="d-flex align-items-center" style="height: 100vh; min-height: 100%; width: 100%; margin:0%; padding-top: 100px;">
        <MDBCol md="12" style="display: flex; flex-direction: row; justify-content: space-evenly; flex-wrap: wrap; gap: 50px; column-gap: 30px;">
          <FeedCard/>
        </MDBCol>
    </MDBRow>
  </div>
</template>

<style>
  .card-layout {
    display: flex;
    justify-content: space-around;
  }
</style>