<script>
import { ref } from 'vue';
import { store } from '../../firebase';
import { collection, getDocs, doc} from 'firebase/firestore';

//array of the colors in the pallate so that tags can hold random color values when selected
const colorPal = '#DA6C7E';


    export default{
        data() {
            return {
                //empty tag list, this is filled by the fetchDataTags function from DB
                tagList: [],
            };
        },

        // component functions
        methods:{

            // function that toggles the class of the tag button upon being pressed
            // this also adjust the color of the button
            // unselected buttons are given grey by default, but when a button is selected it gets a random color value from the color pal
            toggleTag(index) {
                // this line selects the specific tag in question by following the provided list index
                const tag = this.tagList[index];

                // code to decide coloring
                if (tag.class === 'unselected'){
                    tag.class = 'selected';
                    tag.color = colorPal;
                }else {
                    tag.class = 'unselected';
                    tag.color = 'grey';
                }

                this.tagList = [...this.tagList];
            },

            getSelectedTags() {
                return this.tagList.filter((tag) => tag.class === 'selected').map((tag => tag.label));
                
            },

            

            // this function fetches the available tags from the database storage THESE TAGS CAN BE UPDATED THROUGH FIREBASSE
            async fetchDataTags(){
                const tagsCollectionRef = collection(store, 'tags'); //steps into the tags collection
                const tagsSnapshot = await getDocs(tagsCollectionRef); //grabs a snapshot of the tags document

                const tags = [];

                //steps through every component of said document, however there is only one item
                tagsSnapshot.forEach(element => {

                    //grabse the data from said element, in this case it is grabbing the array of tags in the db
                    const tagData = element.data();

                    // steps through the array of tags and pushes these values into the empty array
                    tagData.tags.forEach((value) => {
                        tags.push({ label: value, class: 'unselected'});
                    });
                });

                //copies the array that the values were just pushed into, onto the tagList element that we will access in the template
                this.tagList = tags;
            }
        },

        watch: {
            tagList: {
                handler() {
                    const selectedTags = this.getSelectedTags();
                    this.$emit('child-tags', selectedTags);
                },
                deep: true
            }
        },


        // this lifecycle hook ensures that the tag components are initialized with the data base information after the component
        // is created but before it is inserted onto the UploadPage vue
        created() {
            this.fetchDataTags();
        },
    }; 


</script>
    
    

<template>
        <!--Upload Image Card-->
        <div class="tagUploadCard">

            <!--title card Box id tagComponent is to specify this component--> 
            <h1 class="tagComponent" style="background-color: #DA6C7E;">Tags</h1>
    


            <!--Box to hold tags-->
            <div id="tagHoldingBox">

                <!-- Runs a reactive for loop that updates whenever items classes are changed in the tags section -->
                <!-- for loop includes each items class as well as its background color -->
                <button
                    v-for="(tag, index) in tagList"
                    :key="index"
                    :class="tag.class"
                    :style="{ backgroundColor: tag.color }"
                    @click="toggleTag(index)"
                >
                <!-- fills each tag with the 'label' data -->
                    {{ tag.label }}
                </button>

            </div>
            
        </div>
</template>

<style>
/*flexBox that is the Tag Upload Card*/
.tagUploadCard {
    display: flex; /* flexBox */
    flex-direction: column; /* column formed flexbox */
    box-shadow: 0px 10px 10px rgba(0, 0, 0, .3); /* Shadow component for depth, adjust if needed */
    border-radius: 10px; /* Needed to avoid shadow from making the white part of box stand out */


    /* add more flexible bounds ADJUST*/
    max-width: 100%;
    height: 347px;
}

/*title text for each cards title*/
h1.tagComponent {
    color: white;
    padding: 10px;
    margin-bottom:0; /* leaves no space in flex box*/
    border-top-left-radius: 10px; border-top-right-radius: 10px; /* rounded top edges*/
}


/* Box that holds the tags */
#tagHoldingBox {
    /* FLEX BOX */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    padding: 30px;
    align-content: flex-start;


    background-color: white; /*ADJUST THIS BACKGROUND */
    flex: 1;    /* allows container box to fill rest of flexBox*/
    border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; /*Curves bottom corners*/
}

/* class for the tags themselves */
.unselected {
    color: white;
    width: 120px;
    height: 40px;
    border-radius: 15px;
    border: none;
    text-align: start;
    background-color: grey;
}

/* MIGHT NOT NEED TWO CLASSES STYLIZATION, COLOR IS CHANGED INLINE WITH THE ELEMENT */
.selected{
    color: white;
    width: 120px;
    height: 40px;
    border-radius: 15px;
    border: none;
    text-align: start;
}


</style>