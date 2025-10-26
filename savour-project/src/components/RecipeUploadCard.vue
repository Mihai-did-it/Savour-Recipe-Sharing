<template>
  <div class="upload-card">
    <div class="header pink-bg">
      <h2 class="left-text white-text">Recipe upload</h2>
    </div>
    <div class="upload-card-body">
      <div class="section">
        <div class="line"></div>
        <div class="step">
          <input
            class="step-input"
            type="text"
            v-model="stepText"
            :placeholder="stepPlaceholder"
            @keyup.enter="addStep"
          />
          <button class="add-button pink-bg white-text" @click="addStep">Add Step</button>
        </div>
        <div class="step-list white-bg">
          <div class="step-entry" v-for="(step, index) in steps" :key="index">
            {{ index + 1 }}. {{ step.text }}
            <button class="remove-button" @click="removeStep(index)">X</button>
          </div>
          <div class="step-entry placeholder-entry" v-if="steps.length ===0">
            Add steps by typing in the input above and clicking "Add Step" (or enter).
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stepText: '',
      steps: [],
    };
  },
  computed: {
    stepPlaceholder() {
      return this.steps.length === 0 ? 'Enter a step' : '';
    },
  },
  methods: {
    addStep() {
      if (this.stepText) {
        const newSteps = [...this.steps, { text: this.stepText }];
        this.stepText = '';

        this.$emit('child-steps', newSteps);

        this.steps = newSteps;
      }
    },
    removeStep(index) {
      const newSteps = this.steps.slice();
      newSteps.splice(index, 1);

      this.$emit('child-steps', newSteps);
      this.steps = newSteps;
    },
  },
};
</script>

<style scoped>
.upload-card {
  background-color: white; 
  border-radius: 8px;
  margin-bottom: 1rem;
}
.header {
  background-color: #DA6C7E;
  border-radius: 8px 8px 0 0; /* rounded here */
  padding: 1rem;
}

.pink-bg {
  background-color: #DA6C7E;
}
.upload-card-body {
  background-color: white;
  border-radius: 0 0 8px 8px;
  padding: 20px;
  max-height: 1000px;
  overflow-y: auto;
}
.left-text {
  text-align: left;
}
.white-text {
  color: white;
}
/* style for separating line*/
.line {
  border: 0;
  border-top: 1px solid #ccc;
  margin-bottom: 1rem;
}
/* styling for the step input  */
.step-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
  background-color: white;
  color: black;
}
/* styling for the step section*/
.step {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

/* style for the add button */
.add-button {
  background-color: #DA6C7E;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}
/* style for list of added steps */
.step-list {
  height: 389px; /* Set a fixed height for the scrollable area */
  overflow-y: auto;
  background-color: white; /*changed for wireframe*/
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
/* styling for the individual step entry */
.step-entry {
  display: block;
  margin-bottom: 0.25rem;
  color: black;
}
.step-input::placeholder {
  color: gray;
}
.placeholder-entry {
  color: gray;
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
