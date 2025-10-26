<script>
  import { MDBCol, MDBRow, MDBContainer } from 'mdb-vue-ui-kit';
  import { MDBCardGroup, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImg, MDBBtn, mdbRipple } from "mdb-vue-ui-kit";
  import { getStorage, ref, getDownloadURL } from 'firebase/storage';
  import { storage, store } from "../../firebase"
  import { collection, doc, query, getDoc, getDocs, orderBy, limit } from 'firebase/firestore';
  import { RouterLink } from 'vue-router';

  export default {
    components: {
      MDBCol, MDBRow, MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImg, MDBBtn, mdbRipple, MDBCardGroup
    },
    directives: {
      mdbRipple
    },
    mounted() {
      this.grabInfo();
    },
    data() {
      return {
        cardArray: [],
        tagLimit: 3,
        tags: [],
      };
    },
    methods: {
      async grabInfo() {
        const recipeCol = collection(store, 'recipes');
        const q = query(recipeCol, orderBy("createDate", "desc"), limit(20));
        const snapshot = await getDocs(q);

        let cardObj = {
          name: '',
          tags: [],
          imageUrl: '',
          id: ''
        }

        const documents = snapshot.docs;
        

        documents.forEach((doc, index) => {
          console.log(doc.id);
          this.count += 1;
          const tempObj = Object.create(cardObj);
          const result = doc.data();
          tempObj.id = doc.id
          tempObj.name = result.Title;
          tempObj.imageUrl = result.Images[0];
          tempObj.tags = result.Tags;

          this.cardArray.push(tempObj);
        });
      },
    },
  }
</script>

<template>
    <template v-for="(card, index) in cardArray">
      <RouterLink :to="`/recipe/` + card.id">
        <MDBCard  class="card-style"> 
          <a v-mdb-ripple="{ color: 'light' }">
            <MDBCardImg v-bind:src="card.imageUrl" top alt="https://placehold.jp/150x150.png" class="img-fluid"/>
          </a>
          <MDBCardBody>
            <MDBCardTitle class="text-light card-title-text">{{ card.name }}</MDBCardTitle>
            <template v-for="(tag, index) in card.tags">
              <MDBBtn v-if="index < tagLimit" :tag="tag" href="#!" type="button" color="light" class="card-tag-text" rounded size="sm" style="margin-bottom: 10px;">{{ tag }}</MDBBtn>
            </template>
          </MDBCardBody>
        </MDBCard>
      </RouterLink>
    </template>
   
    <template v-if="cardArray.length % 3 == 2">
      <MDBCard class="card-style-empty">
      </MDBCard>
    </template>
    <template v-else-if="cardArray.length % 3 == 1">
      <MDBCard class="card-style-empty" >
      </MDBCard>
      <MDBCard class="card-style-empty" >
      </MDBCard>
    </template>
</template>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=League+Spartan&family=Rubik&family=Work+Sans&display=swap');

    .card-title-text {
      font-family: 'Rubik', sans-serif;
      font-weight: bolder;
      font-size:x-large;
    }

    .card-tag-text {
      font-family: 'Work Sans', sans-serif;
      font-weight: bold;
    }

    .card-style {
      width: 400px; 
      max-height: 500px; 
      height: 550px;
      background-color: #DA6C7E; 
      box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
      overflow:hidden;
    }

    .card-style-empty {
      width: 390px; 
      max-height: 490px; 
      height: 550px;
      overflow:hidden;
      visibility: hidden;
    }

    .image-fill {
      height: 500px;
      width: 400px;
    }

    
  </style>