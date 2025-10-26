<template>
  <div class="upload-card">
    <div class="header orange-bg">
      <h2 class="left-text white-text">Ingredients Upload</h2>
    </div>
    <div class="upload-card-body">
      <div class="section">
        <div class="line"></div>
        <!-- displaying ingredients section -->
        <div class="ingredient">
          <!-- input for ingredient detailss here -->
          <input class="input-field" type="text" v-model="ingredientName" :placeholder="ingredientNamePlaceholder" />
          <input class="input-field" type="text" v-model="ingredientAmount" :placeholder="ingredientAmountPlaceholder" />
          <select class="input-field ingredient-unit" v-model="ingredientUnit">
            <!-- display 4 list of added ingredients -->
            <option v-for="option in unitOptions" :value="option.value" :key="option.value">{{ option.label }}</option>
          </select>
          <button class="add-button" @click="addIngredient">Add</button>
        </div>
        <div class="ingredient-list">
          <div v-for="(ingredient, index) in ingredients" :key="index" class="ingredient-entry">
            {{ ingredient.name }} - {{ ingredient.quantity }} {{ ingredient.measurement === 'na' ? '' : ingredient.measurement }}
            <button class="remove-button" @click="removeIngredient(index)">X</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'


// reactive variables here
const ingredientName = ref('');
const ingredientAmount = ref('');
const ingredientUnit = ref('');
const ingredients = ref([]);
// list of options for ingredients (ML, teaspoon etc.....)
const unitOptions = [
  { value: '', label: 'Select Unit' },
  { value: 'tablespoon', label: 'Tablespoon' },
  { value: 'teaspoon', label: 'Teaspoon' },
  { value: 'cup', label: 'Cup' },
  { value: 'ml', label: 'ML' },
  { value: 'na', label: 'N/A' }
];
// Placeholder text for input fields
const ingredientNamePlaceholder = 'Ingredient Name';
const ingredientAmountPlaceholder = 'Amount';

const emits = defineEmits();

// this function add ingredients
function addIngredient() {
  if (ingredientName.value && ingredientAmount.value) {
    ingredients.value.push({
      name: ingredientName.value,
      quantity: ingredientAmount.value,
      measurement: ingredientUnit.value || 'N/A',
    });
    ingredientName.value = '';
    ingredientAmount.value = '';
    ingredientUnit.value = '';
  }

  emits('child-ingredients', ingredients.value);
}

function removeIngredient(index) {
  const newIngredients = ingredients.value.slice();
  newIngredients.splice(index, 1);
  ingredients.value = newIngredients;

  emits('child-ingredients', ingredients.value);

}
</script>

<style scoped>
/* style for the card */
.upload-card {
  background-color: white;
  border-radius: 8px;
  margin-bottom: 1rem;
  flex-basis: 100%;
}
/* head style*/
.header {
  background-color: #DA6C7E;
  border-radius: 8px 8px 0 0;
  padding: 1rem;
}
.orange-bg {
  background-color: #DA6C7E;
}
.upload-card-body {
  background-color: white;
  border-radius: 0 0 8px 8px;/* rounfding the corners */
  padding: 20px;
}
.left-text {
  text-align: left;
}
.white-text {
  color: white;
}
/* style for the separating line */
.line {
  border: 0;
  border-top: 1px solid #ccc;
  margin-bottom: 1rem;
}
/* styling 4 section title */
.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
/* style fornthe input fields */
.input-field,
.ingredient-name,
.ingredient-amount,
.ingredient-unit {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-shadow: none;
  color: grey;
}


.input-field::placeholder,
.ingredient-name::placeholder,
.ingredient-amount::placeholder,
.ingredient-unit::placeholder {
  color: gray;
}
/* styling for ingredients section */
.ingredient {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

/* styling for the add button */
.add-button {
  background-color: #DA6C7E;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}
/* style for the list of added ingredients */
.ingredient-list {
  height: 150px;
  overflow-y: auto;
  background-color: white;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

/* styling for individual ingredient entry */
.ingredient-entry {
  display: block;
  margin-bottom: 0.25rem;
}
.remove-button {
  background-color: transparent;
  color: red;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  font-size: 14px;
}
</style>
