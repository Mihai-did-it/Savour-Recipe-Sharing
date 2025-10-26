<template>
    <MDBCarousel
      v-model="carousel3"
      :items="items3"
      :indicators="false"
    />
  </template>

<script setup lang="ts">
import { ref } from "vue";
import { MDBCarousel } from "mdb-vue-ui-kit";

const items3 = [
  {
    src: "https://mdbootstrap.com/img/Photos/Slides/img%20(15).webp",
    alt: "..."
  },
  {
    src: "https://mdbootstrap.com/img/Photos/Slides/img%20(22).webp",
    alt: "..."
  },
  {
    src: "https://mdbootstrap.com/img/Photos/Slides/img%20(23).webp",
    alt: "..."
  }
];

const carousel3 = ref(0);
</script>