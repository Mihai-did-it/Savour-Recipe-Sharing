<script>
    export default{
        
        data() {
            return{
                recipeTitle: 'MockTitle',
            }
        },
        watch: {
            recipeTitle(newTitle){
                this.$emit('child-title', newTitle);
            }
        }

    }; 
 </script>

<template>

    <div style="display: flex;">
        <!--INPUT IS STORED IN ID "recipeID"-->
        <input v-model="recipeTitle" type="text" placeholder="Dish Title..." class="titleComponent" id="recipeID" style="background-color: #DA6C7E;">
    </div>


</template>

<style>
    input.titleComponent {     
        color: white;
        padding: 8px;
        border-radius: 10px; /* rounded top edges*/
        border: none;
        flex: 1; /*allows the component to fill the whole content column*/
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3); /* shadow component for depth, Adjust if needed*/
        font-size: 2em;
        font-weight: bold;
    }
    
    ::placeholder {
        color: white;
        opacity: 1; 
    }
</style>