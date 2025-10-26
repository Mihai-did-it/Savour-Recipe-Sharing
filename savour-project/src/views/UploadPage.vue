<template>
    <div class="upload-page">
      <NavBar />
      <div class="flex-container-row">
        <div class="column-30">
          <div class="card-container small-card">
            <ImageUploadCard @child-image="updateImage" />
          </div>
          <div class="card-container small-card">
            <TagUploadCard @child-tags="updateTags"/>
          </div>
        </div>
        <div class="column-70">
          <div class="card-container small-card">
            <TitleUploadCard @child-title="updateTitle"/>
          </div>
          <div class="card-container large-card">
            <RecipeUploadCard @child-steps="updateSteps"/>
          </div>
        </div>
      </div>
      <div class="ingredients-card-wrapper">
        <div class="card-container full-width">
          <IngredientsUploadCard @child-ingredients="updateIngredients"/>
        </div>
      </div>

      <div class="submit-button">
          <button id="submitButton" name="submitButton" @click="submitRecipe">SUBMIT</button> 
      </div>
    </div>
  </template>
  
  <script>
  import RecipeUploadCard from '../components/RecipeUploadCard.vue';
  import IngredientsUploadCard from '../components/IngredientsUploadCard.vue';
  import TitleUploadCard from '../components/UploadPageComponents/RecpieTitleCard.vue';
  import ImageUploadCard from '../components/UploadPageComponents/ImageUploadCard.vue';
  import TagUploadCard from '../components/UploadPageComponents/TagUploadCard.vue';
  import NavBar from '../components/NavBar.vue';
  import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
  import { store } from '../firebase';
import { RouterLink } from 'vue-router';



  export default {
    data(){
      return{
        recipeTitle : null,
        recipeImage : null,
        recipeTags : [],
        recipeSteps : [],
        recipeIngredients: [],
      };
    },
  
    components: {
    ImageUploadCard,
    TagUploadCard,
    IngredientsUploadCard,
    TitleUploadCard,
    RecipeUploadCard,
    NavBar,
    RouterLink
},


    methods: {
      async submitRecipe() {
        if (
          this.recipeImage != null &&
          this.recipeIngredients.length > 0 &&
          this.recipeSteps.length > 0 &&
          this.recipeTags.length > 0 &&
          this.recipeTitle != null
        ) {


          try {
            console.log('Submitting Recipe')



            const docReference = await addDoc(
              collection(store, 'recipes'),
              {
                Images: [this.recipeImage], //DONE
                Ingredients: this.recipeIngredients, //DONE
                Instructions: this.recipeSteps,
                Tags: this.recipeTags, //DONE
                Title: this.recipeTitle, //DONE
                createDate: serverTimestamp(), //time stamp to organize on the page
              }
            );

            console.log('New Recipe has ID:', docReference.id);

            this.$router.push({path: `/recipe/${docReference.id}`})
              
          } catch (err) {
            console.error('Error in submitRecipe', err);
          }
        } else {
          alert('Finish Filling in Fields', 
          {Title: this.recipeTitle},
          {Tags: this.recipeTags},
          {Image: this.recipeImage},
          {Ingredients: this.recipeIngredients},
          {Instructions: this.recipeSteps},
          );
        }
      },

      //updates the recipe image
      //DONE
      updateImage (newImage) {
        this.recipeImage = newImage;
      },

      //updates the recipe title before submission
      //DONE
      updateTitle (newTitle) {
        this.recipeTitle = newTitle;
      },


      //updates the recipe tags
      //DONE
      updateTags (newTags) {
        this.recipeTags = newTags;
      },


      updateSteps (newSteps) {
        this.recipeSteps = newSteps;
      },

      updateIngredients (newIngredients) {
        this.recipeIngredients = newIngredients;
      },
    },
  };
  </script>
  
  <style scoped>
  .upload-page {
    padding: 20px;
  }
  .flex-container-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
    padding-top: 100px;
  }
  .column-30 {
    flex-basis: 45%;
  }
  .column-70 {
    flex-basis: 55%;
  }
  .card-container {
    background-color: transparent;
    border-radius: 8px;
    padding: 20px;
    max-height: 100%;
    overflow: hidden;
  }
  .full-width {
    width: 100%;
  }
  .small-card {
    max-width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
  }
  .large-card {
    width: 100%;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3); /* shadow component for depth, Adjust if needed*/

  }
  .ingredients-card-wrapper {
    display: flex;
    justify-content: center;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3); /* shadow component for depth, Adjust if needed*/
    padding-bottom: 20px; /* add p adding to the bottom only */
  }

  .submit-button {
    border-radius: 10px;
    background-color: #DA6C7E;
    margin-top: 20px;
    text-align: center;
  }

  #submitButton{
    background-color: #525252;
    border-radius: 10px;
    color: white;
    border: none;
    font-size: 30px;
    width: 100%;
  }

  #submitButton:hover{
    background-color: #DA6C7E;
  }
  </style>
  