<script>

// NOTE!! WEIRD BUG REGARDING AUTOSCROLLING: IT MOVES THE PAGES VIEW!! COMMENTED OUT FOR NOW BUT WILL FIX LATER


import { RouterLink } from 'vue-router';

export default {
    name: 'recipe-images-carousel',
    props: {
        images: Array, // array of images that's passed in
        autoSlide: Boolean, // Enable autoslide functionality
        slideInterval: Number // How often should the images slide?
    },
    components: {
        RouterLink,
    },
    data() {
        return {
            currentIndex: 0,
            autoSlideInterval: null,
        };
    },
    mounted() { // start auto scrolling once the component is actually rendered and in the DOM
        // if (this.autoSlide) {
        //     this.startAutoSlide();
        // }
    },
    methods: {
        // when a button is clicked, it'll update the current index of the images slide
        prevSlide() { // when prevSlide() is called, compute a new index value by subtracting one from the current index. Handles going under 0
            //this.stopAutoSlide(); // Stop auto-slide before changing index

            var activeImg = this.currentIndex - 1;

            if (activeImg < 0) {
                activeImg = this.images.length - 1;
            }
            this.currentIndex = activeImg;
            //this.startAutoSlide(); // Restart auto-slide after changing index
        },

        nextSlide() { // when nextSlide() is called, compute a new index value by adding one from the current index. Handles going over the max size
            //this.stopAutoSlide(); // Stop auto-slide before changing index

            var activeImg = this.currentIndex + 1;

            if (activeImg >= this.images.length) {
                activeImg = 0;
            }
            this.currentIndex = activeImg;
            //this.startAutoSlide(); // Restart auto-slide after changing index
        },

        // variable holds the identifier for the interval. Can be used to start and stop the interval
        // setInterval sets up an interval to repeatedly execute the given callback function after specified delay time
        startAutoSlide() {
            this.autoSlideInterval = setInterval(this.nextSlide, this.slideInterval);
        },

        // called to essentially prevent memory leaks (clears the interval when it's no longer needed)
        stopAutoSlide() {
            clearInterval(this.autoSlideInterval);
        }
    },
    computed: {
        // autoSliding() {
        //     if(this.autoSlide) {
        //         setInterval(this.nextSlide, slideInterval);
        //     } 
        // }
    }
};
</script>

<template>
    <div class="image-carousel">
        <div class="image-wrapper">
            <!-- We want to loop through the images in the array -->
            <!-- in "active" the css class "active" will be applied to an element when the 'index' value matches the value 'currentIndex'-->
            <div v-for="(image, index) in images" :key="index" :class="{ active: index === currentIndex } ">
                <!-- Now grab the image from firestore. Handle this later though! -->
                <img :src="image" alt="Carousel Image" v-show="index === currentIndex"> <!-- Using v-show to hide the rest of the images -->
            </div>
        </div>

        <!-- Navigation buttons to slide through the photos -->
        <!-- When the buttons are pressed, it -->
        <!-- Only render the images if there's more than 1 image in the array -->
        <div v-if="images.length > 1">
            <button @click="prevSlide" class="slider-buttons" id="prev"><i class="fas fa-chevron-left"></i></button> <!-- FontAwesome icon for left arrow -->
            <button @click="nextSlide" class="slider-buttons" id="next"><i class="fas fa-chevron-right"></i></button> <!-- FontAwesome icon for right arrow -->
        </div> 
    </div>
</template>

<style>
.image-carousel {
    width: 100%;
    background-color: rgb(213, 213, 213);
}

.image-wrapper {
    position: relative;
}

.image-wrapper img {
    width: 100%;
    max-height: 720px;
    object-fit: cover; /* maintain aspect ratio and cover the container */
    
}

.slider-buttons {
    width: 40px;
    height: 40px;
    border-radius: 50%; /* Make the button circular */
    background-color: rgba(0, 0, 0, 0.4); /* Make the background semi-transparent with black */
    color: white; /* Make the icon white */

    /* following 2 styles centers the buttons at the top and vertically halfway on the images */
    top: 50%;
    transform: translateY(-50%);

    border: none;
    position: absolute; /* So we can position the buttons */

    /* display: flex;
    justify-content: center;
    align-items: center; */
    
    z-index: 1; /* put them above the carousel */
    transition: 0.4s;
}

.slider-buttons:hover, .slider-buttons:active {
    background-color: rgba(0, 0, 0, 0.7);
    width: 45px;
    height: 45px;
}

#prev {
    left: 20px;
    
}

#next {
    right: 20px;
}
</style>