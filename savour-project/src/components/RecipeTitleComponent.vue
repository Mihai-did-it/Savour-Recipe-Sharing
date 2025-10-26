<script>
import { RouterLink } from 'vue-router';

    export default {
        name: 'recipe-title-component',
        data() {
            return {

            };
        },
        props: {
            recipeName: String
        },
        components: {
            RouterLink
        },
    };
</script>

<template>
    <div>
        <h1 class="recipe-title">{{ recipeName }}</h1>
    </div>
</template>

<style>
.recipe-title {
    display: inline-block; /* By default, h1 elements are block level, so they cover the space provided to the parent container. Class with recipe-title will only take up the width of its content */
    color: #505050;
    font-style: italic;
    padding: 0px;
    margin: 0px;
}
</style>