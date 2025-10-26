<script>
import { RouterLink } from 'vue-router';

export default {
    name: 'recipe-page-main-tag-component',
    data() {
        return {

        };
    },
    props: {
        tags: Array
    },
};
</script>

<template>
    <aside class="main-container">
        <h1 class="tag-title">Recipe Tags</h1>
        <hr>
        <div class="tag-list">
            <div v-for="(tag, index) in tags" :key="index">
                <rounter-link to="/recipe"><li class="tag-item">{{ tag }}</li></rounter-link> <!-- will have to change this to route to specific tag pages in the future -->
            </div>
        </div>
    </aside>
</template>

<style>
.main-container {
    background-color: #DA6C7E;
    width: 300px;
    min-height: 200px;
    max-height: 300px; /* Keep the tag list growing until a certain height, and when it reaches that, just add a scrollbar */
    overflow-y: auto; /* Add vertical scrollbar when necessary */
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.355);
}

.tag-title {
    text-align: center;
    margin-top: 20px;
    font-weight: bold;
    font-size: 1.2em;
    color: white;
    padding-top: 15px;
}

hr {
    border: none;
    border-top: 1px solid #ccc; /* Add a top border to create the divider line */
    margin: 10px auto; /* Add spacing above and below the divider, and centers it horizontally */
    opacity: 0.78; /* You can adjust the opacity for a subtle effect */
    width: 80%;
}

.tag-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* I want the container to have 2 columns all the way down */
    gap: 10px; /* gap between items */
    max-height: 100%; /* Allow tag list to expand within the container */
    padding: 15px;
}

.tag-item {
    cursor: pointer;
    text-align: center;
    background-color: white;
    padding: 5px;
    border-radius: 20px;
    list-style: none;
    word-wrap: break-word; /* Breal words if they don't fit in the box */
    transition: 0.4s;
}

.tag-item:hover, .tag-item:focus {
    background-color: rgb(233, 233, 233);
}

.tag-item:active {
    background-color: rgb(198, 198, 198);
}

.main-container::-webkit-scrollbar {
    width: 8px; /* Set the width of the scrollbar */
}

.main-container::-webkit-scrollbar-thumb {
    background-color: #888; /* Color of the thumb */
    border-radius: 8px; /* Rounded corners for the thumb */
}

.main-container::-webkit-scrollbar-track {
    background-color: transparent; /* Color of the track */
    border-radius: 4px;
}

</style>