<script>
export default {
    name: 'dropdown',
    props: [
        'title',
        'items', // is an array of objects, and stores the array "dropdown" of objects (title, link) we have defined in the data() section of NavBar.vue
    ],
    data() {
        return {
            isOpen: false
        }
    }
}
</script>

<template>
    <div class="nav-item" @click="isOpen = !isOpen"> <!-- Everytime you click on the dropdown, it changes the isOpen value-->
        <!-- Make a link to profile page -->
        <div class="changePointer">
            {{ title }}
            <div class="down-arrow">
                &#x25BC;
            </div>
        </div>


        <transition name="fade" appear>
            <div class="drop-items" v-if="isOpen"> <!-- Only open if isOpen=true -->
                <!-- using a vue.js directive that creates a loop to iterate though an array, "items" (the value in the prop above) -->
                <!-- for each element, loop assigns the element to variable "item", and also provides current index -->
                <!-- The "items" below is linked to the 'dropdown' array provided in the data section of NavBar.vue which contains items representing dropdown items -->
                <div v-for="(item, i) in items" :key="i" class="nav-item" id="tester"> <!-- key is a unique identifier that keeps track of each rendered item in the loop-->
                    <router-link :to="item.link">{{ item.title }}</router-link>
                </div>
            </div>
        </transition>
        
    </div>
</template>

<style>

nav .nav-item .drop-items {
    position: absolute;
    text-align: center;
    padding-left: 8px;
    padding-right: 8px;
    background-color: white;
    border: 1.5px solid #e2e2e2;
    border-top-width: 0; /* Remove top border */
    top: calc(100% + 8px); /* Positions the top edge of the element at a distance equal to the height of its containing block (100%) plus 8 pixels */
    left: 50%; /* Positions the left edge of the element at the horizontal center of its containing block */
    transform: translateX(-50%); /* Translates the element horizontally by -50% of its own width, essentially centering it horizontally */
    width: max-content;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.255);
    border-radius: 0px 0px 16px 16px;
}

#tester {
    padding-top: 10px;
}

.fade-enter-active, .fade-leave-active {
    transition: all .5s ease-out;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

.changePointer {
    /* Added these because "More" and "down arrow" were originally stacked on top of each other, I wanna put them next to each other */
    display: flex;
    align-items: center;
    cursor: pointer;
}

.down-arrow {
    font-size: 12px;
    padding-left: 5px;
}
</style>