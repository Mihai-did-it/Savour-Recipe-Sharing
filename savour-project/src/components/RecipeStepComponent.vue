<script>
import { RouterLink } from 'vue-router';

export default {
    name: 'recipe-step-component',
    components: {
        RouterLink
    },
    data() {
        return {

        };
    },
    props: {
        stepList: Array
    },
};

</script>

<template>
    <div class="steps-wrapper">
        <div class="steps-header">Recipe Steps</div>
        <ul class="steps-list">
            <div v-for="(step, index) in stepList" :key="index">
                <li class="step-item">{{ step.text }}</li>
            </div>
        </ul>
    </div>
</template>

<style>
.steps-wrapper {
    background-color: white;
    width: 800px;
    outline: 1.5px solid #e2e2e2; /* Add grey outline around the container */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.378); 
    border-radius: 20px;
    padding-bottom: 20px;

}

.steps-header {
    text-align: center;
    margin-bottom: 10px;
    background-color: #DA6C7E;
    font-size: 2em;
    color: white;
    border-radius: 20px 20px 0 0;
    margin-bottom: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-weight: bold;
}

ul {
    list-style: decimal;
}

.step-item {
    /* background-color: aqua; */
    margin-bottom: 20px;
    line-height: 2em;
    color: #666666;
    margin-left: 30px;
    margin-right: 30px;
    padding-left: 20px;
    padding-right: 20px;
}   

</style>