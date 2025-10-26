<script>

// we want to import RouterLink so we can connect different links on this nav bar component to take users back to the feed, etc.
import { RouterLink } from 'vue-router';
import Dropdown from './Dropdown.vue';

    export default {
        name: 'navbar',
        components: {
            RouterLink,
            Dropdown
        },
        data() {
            return {
                // drop down is going to consist of an array of objects:
                // for now, we are just going to have profile be the only object
                dropdown: [
                    {
                        title: 'Profile',
                        link: '/'
                    },
                    {
                        title: 'My Recipes',
                        link: '/'
                    },
                    {
                        title: 'Settings',
                        link: '/'
                    },
                ],
                findText: "",
            };
        },
        methods: {
            clear(event) { // clear method just resets the users input
                this.findText = "";
            }
        },
    };
</script>

<template>
    <nav>
        <!-- Image that also links to the homepage/main feed -->
        <!-- Using RouterLink for the logo -->
        <router-link to="/" id="router-imgs">
            <img src="../assets/SavourMiniLogo.png" alt="Small Logo" id="small-logo" width="50"/>
            <!-- Adding logo -->
            <img src="../assets/Savour.png" alt="Big Logo" id="big-logo" width="160"/>
        </router-link>
        
        <!-- Wrap the search bar and the button in a div for styling purposes: using position: absolute to sort of stack the button on top -->
        <div id="search-container" class="nav-item">
            <!-- -Search Bar: probably some input element: SHOULD be able to type, and when entering clears is, but SHOULDN'T BE FUNCTIONAL (for now) -->
            <!-- When user presses enter, it calls the clear method. v-model binds the value of the input (text user types) to a variable "findText" that can be controlled with javascript-->
            <input type="text" id="search-bar" placeholder="Search Something..." @keydown.enter="clear" v-model="findText" />
            <!-- Magnifying glass image for searching: Shouldn't be functional -->
            <!-- SVG magnifying glass from: https://www.svgrepo.com/svg/127033/magnifying-glass -->
            <!-- When user clicks the button, it triggers the clear method -->
            <button type="button" id="search-button" @click="clear">
                <svg fill="#636363" height="20px" width="20px" version="1.1" id="Capo_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490.4 490.4" xml:space="preserve">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <g>
                            <path d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796 s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z"></path>
                        </g>
                    </g>
                </svg>
            </button>
        </div>

        <!-- Explore page: Wont be functional for now -->
        <router-link to="/" class="nav-item">
            <div>Explore</div>
        </router-link>

        <!-- Upload: SHOULD be functional -->
        <!-- Using RouterLink to link the linkk to the upload recipe page-->
        <!-- FOR NOW JUST LINK IT TO FEED. CHANGE IT WHEN UPLOAD VIEW IS MADE!!!! -->
        <router-link to="/upload" class="nav-item">
            <div>Upload</div>
        </router-link>
        
        <!-- More(dropdown): SHOULD add a legit drop down with more options, but SHOULDN'T ACTUALLY WORK (the links) -->
        <!-- What's happening: passing in the dropdown array, which is then linked to/stored in the Dropdown.vue's "item" value in the prop section-->
        <dropdown title="More" :items="dropdown" /> <!-- TITLE, AND :ITEMS ARE JUST THE PROPS DEFINED IN DROPDOWN.VUE -->
        <!-- Entire bar should be encapsulated between a thin ellipse with a drop shadow-->
    </nav>
</template>

<style>
nav {
    position: fixed;
    top: 25px; /* top vs margin-top?? can adjust this as needed */
    width: 1300px; /* Fixed width */
    /* Combo of left and trnasform basically centers the nav bar in the middle top of the page */
    left: 50%;
    transform: translateX(-50%);
    
    display: flex; /* flex box */
    justify-content: space-between;
    align-items: center;
    padding-left: 35px;
    padding-right: 35px;

    background-color: white;
    border-radius: 50px; /* Makes the box container into an ellipse! adjust later if needed! */
    outline: 1.5px solid #e2e2e2; /* Add grey outline around the container */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.255); /* rgba added for some coloring and opacity changes */
    z-index: 1000; /* we want the nav bar to be above other content on the page */
}

#search-container {
    display: flex;
    align-items: center;
    position: relative;
}

#search-bar {
    flex: 1;
    width: 400px;
    height: 28px;
    padding: 6px 12px; /* For the text that goes inside the search bar. Setting these values "centers"/positions the text more so it's not against the borders */
    padding-right: 33px;
    border: none; /* By default, the input search bar will have a weird nasty black outline */ 
    border-radius: 20px; /* make the box container an ellipse shape */
    background-color: #f5f5f5;
    outline: 1.5px solid #b1b1b1; /* setting the outline to be similar to above */
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.255);
    font-size: 0.80em;
}

#search-button {
    border: none;
    background-color: transparent;
    color: #636363;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 20px;
    bottom: 9px;
}

nav .nav-item{
    color: #636363;
    /*background-color: #b1b1b1;*/ /*For testing purposes */
    /* Using margin top and bottom because if I used padding, the border would get extended downward and would look weird, but I still want to add spacing above and below */
    margin-top: 10px;
    margin-bottom: 10px;
    /* I did add padding here because I wanted to have the bottom outline for hover affects extend a little past the words */
    padding-left: 3px;
    padding-right: 3px;
    position: relative;
    text-align: center;
    border-bottom: 3px solid transparent;
    transition: 0.4s; /*For transition effects (hover, etc.) */
}

/* Adding styles for the router link elements */
/* Using not() to exclude the website logo, and the search bar so no line appears under when hovering */
.nav-item:not(#router-imgs):not(#search-container):hover, .nav-item:not(#router-imgs):not(#search-container):active {
    border-bottom-color: #D24B62;
    color: #D24B62;
}

#big-logo {
    padding: none;
    margin-left: 30px;
}

#small-logo {
    padding: none;
    transition: transform 2s ease; /* Add a transition effect to smooth the rotation */
}

#small-logo:hover, #small-logo:active {
    transform: rotate(720deg);
}

a {
    color: inherit; /* Inherits the color from the parent element */
    text-decoration: none; /* Removes underlines from links */
}

a:hover, a:active {
    color: inherit;
    text-decoration: none; /* Removes underlines from links */
}
</style>