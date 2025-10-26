<script>
  import IngredientsList from '../components/IngredientsList.vue'
  import NavBar from '../components/NavBar.vue'
  import RecipeImagesCarousel from '../components/RecipeImagesCarousel.vue'
  import RecipeStepComponent from '../components/RecipeStepComponent.vue'
  import RecipeTitleComponent from '../components/RecipeTitleComponent.vue'
  import RecipePageMainTagComponent from '../components/RecipePageMainTagComponent.vue'
  import RecipeDateComponent from '../components/RecipeDateComponent.vue'
  import { getStorage, ref, getDownloadURL } from 'firebase/storage';
  import { storage, store } from "../firebase"
  import { collection, doc, query, getDoc, getDocs, orderBy, limit } from 'firebase/firestore';

  export default {
    components: {
      IngredientsList,
      NavBar,
      RecipeImagesCarousel,
      RecipeStepComponent,
      RecipeTitleComponent,
      RecipePageMainTagComponent,
      RecipeDateComponent
    },
    data() {
        return {
            //documentId to be queried
            docId: '',
            
            // to be passed into the RecipeImagesCarousel component
            images: [],

            // steps to be passed into the RecipeStepComponent
            stepList: [],

            // tags to be passed into the RecipePageMainTagComponent
            tags: [],

            // title of the recipe to be passed into RecipeTitleComponent
            recipeTitle: '',

            // ingredient list to be passed into IngredientList component
            ingredientsList: [],
        };  
    },
    mounted() {
        this.grabParams();
    },
       
    methods: {
         grabParams(){
            console.log(this.$route.params.id);
            this.docId = this.$route.params.id;
            this.grabInfo();
         },
         async grabInfo() {
            // for the following: reference the firestore database to understand comments
            // create a reference to the specific document in the 'recipes' collection
            const docRef = doc(store, 'recipes', this.docId);
            // use getDoc function to fetch the document snapshot from firebase
            const docSnap = await getDoc(docRef);

            // check if the document exists in the database
            if (docSnap.exists()) {
                // if the document exists, extract its data
                const result = docSnap.data();
                // update the recipeTitle data property with the title from the document
                this.recipeTitle = result.Title;
                this.tags = result.Tags
                this.stepList = result.Instructions;
                this.ingredientsList = result.Ingredients
                this.recipeDate = result.createDate;
                this.images = result.Images;
                } else {
                console.log("No such document!");
            }
        },
    },
  };
</script>

<template>
  <div>
    <div v-if="this.images.length > 0">
        <div class="navbar"><nav-bar></nav-bar> </div>
    </div>
    
    <div class="page-wrapper">
        <div class="carousel">
            <recipe-images-carousel :images="images" :autoSlide="true" :slideInterval="5000"></recipe-images-carousel> <!--1000ms = 1 sec -->
        </div> 

        <div class="title-component">
            <recipe-title-component :recipeName="recipeTitle"></recipe-title-component>
        </div>

        <div class="timestamp">
            <recipe-date-component :recipeDate="recipeDate"></recipe-date-component>
        </div>

        <div class="three-column-layout">
            <div class="column ingred-list-component">
                <ingredients-list :ingredientList="ingredientsList"></ingredients-list>
            </div>

            <div class="column steps-list">
                <recipe-step-component :stepList="stepList"></recipe-step-component>
            </div>

            <div class="column tags-component">
                <recipe-page-main-tag-component :tags="tags"></recipe-page-main-tag-component>
            </div>
        </div>
    </div>
    
  </div>
</template>

<style>
.navbar {
    position: fixed;
    z-index: 1;
}

.page-wrapper {
    margin: 0 40px;
}

.title-component {
    margin-top: 40px;
    text-align: center;
}

.three-column-layout {
    display: flex;
    justify-content: space-evenly;
    /* margin: 30px; */
}


.timestamp {
    text-align: center;
    margin: 20px;
}

/* .carousel {
} */

</style>