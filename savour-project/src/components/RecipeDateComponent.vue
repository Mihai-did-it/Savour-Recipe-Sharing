<script>
import { Timestamp } from 'firebase/firestore';
import { RouterLink } from 'vue-router';

    export default {
        name: 'recipe-title-component',
        data() {
            return {

            };
        },
        props: {
            recipeDate: Object
        },
        components: {
            RouterLink
        },
        computed: {
            formattedDate() {
                if (this.recipeDate) {
                    const timestamp = this.recipeDate.seconds * 1000; // Convert seconds to milliseconds
                    const dateObject = new Date(timestamp); // creating a JS date instance that corresponds to that timestamp

                    // method used to format a date in human-readable string according to a specific locale (en-US) in our case
                    // second argument is an object where we can specify how we want the date to be formatted 
                    return dateObject.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long', // displays the full name of the month
                        day: 'numeric'
                    });
                }
                return ''; // Return an empty string if recipeDate is not available
            }
        }
    };
</script>

<template>
    <div>
        <h1 class="recipe-date">{{ formattedDate }}</h1>
    </div>
</template>

<style>
.recipe-date {
    display: inline-block; /* By default, h1 elements are block level, so they cover the space provided to the parent container. Class with recipe-title will only take up the width of its content */
    font-size: 1.2em;
    color: #a2a2a2;
    padding: 0px;
    margin: 0px;
}
</style>