<script>
import { RouterLink } from 'vue-router';

export default {
    name: 'ingredients-list',
    components: {
        RouterLink,
    },
    data() {
        return {

        }
    },
    props: {
        ingredientList: Array
    }
}

</script>

<template>
    <aside class="sidebar">
        <div class="top-header">Recipe Ingredients</div>
        <hr>
        <div class="ingredients-list">
            <ul class="list">
                <div v-for="(ingredient, index) in ingredientList" :key="index">
                    <!-- Don't want to include any "null" values -->
                    <li class="ingredient">
                        <span v-if="ingredient.quantity !== 'na' && ingredient.quantity !== 'N/A'">{{ ingredient.quantity + ' ' }} </span>
                        <span v-if="ingredient.measurement !== 'na' && ingredient.measurement !== 'N/A'">{{ ingredient.measurement + ' '}} </span>
                        <span v-if="ingredient.name !== 'na' && ingredient.name !== 'N/A'">{{ ingredient.name }} </span>
                    </li>
                </div>
            </ul>
        </div>
    </aside>
</template>

<style>

.sidebar {
    /* position: fixed; */
    overflow-y: auto; /* Add vertical scroll when content overflows */
    overflow-x: auto;
    width: 300px;
    min-height: 200px;
    max-height: 550px; /* Keep the ingredients list growing until a max hwight. At that point just add scrolling */
    background-color: #DA6C7E;
    border: 1px solid #adadad;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.155);
    border-radius: 10px;
}

hr {
    border: none;
    border-top: 1px solid #ccc; /* Add a top border to create the divider line */
    margin: 10px auto; /* Add spacing above and below the divider, and centers it horizontally */
    opacity: 0.78; /* You can adjust the opacity for a subtle effect */
    width: 80%;
}

.sidebar::-webkit-scrollbar {
    width: 8px; /* Set the width of the scrollbar */
}

.sidebar::-webkit-scrollbar-thumb {
    background-color: #888; /* Color of the thumb */
    border-radius: 8px; /* Rounded corners for the thumb */
}

.sidebar::-webkit-scrollbar-track {
    background-color: transparent; /* Color of the track */
    border-radius: 4px;
}

.ingredients-list {
    padding: 20px; /* Add padding to the content inside the sidebar */
    
}

.list {
    list-style: disc;
    padding: 0;
    margin-left: 20px;
    margin-right: 20px;
    list-style-position: outside;
}

.ingredient {
    color: white;
    margin-bottom: 20px; /* Add spacing between list items */
}

.top-header {
    text-align: center;
    margin-top: 20px;
    font-weight: bold;
    font-size: 1.2em;
    color: white;
}
</style>