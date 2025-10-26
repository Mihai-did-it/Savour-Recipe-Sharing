<script>
import { getDownloadURL, uploadBytes, uploadBytesResumable, ref } from 'firebase/storage';
import { storage } from '../../firebase';

    
    export default{
        data() {
            return {
                selectedFileName: 'No file chosen...',
            }
        },
        methods: {
            async changeImage(event) {
                const selectedImage = event.target.files[0];   
                
                this.selectedFileName = selectedImage.name;

                console.log(selectedImage);
                if (selectedImage) {
                        //image reference in storage
                        const storageRef = ref(storage, 'images/' + selectedImage.name);
                        //sends image to storage
                        const uploadTask = uploadBytes(storageRef, selectedImage);

                    try {
                        
                        await uploadTask;
                        

                        getDownloadURL(storageRef).then((givenURL) =>{
                            let downloadURL = givenURL;
                            this.$emit('child-image', downloadURL);
                        })


                    } catch (error) {
                        console.error('Error uploading image:', error);
                    }
                }
            },
        },
    }; 
 </script>
    
    

<template>
        <!--Upload Image Card-->
        <div class="imageUploadCard">

            <!--title card Box, added imageComponent class to specify this pages header--> 
                <h1 class="imageComponent" style="background-color: #DA6C7E;">Image Upload</h1>
            

            <!--cloud Box for uploading-->
            <!--Adjust Cloud Styling-->
                <div id="imageButton">

                    <!--this is the real upload button, functionally, cloud button works through this-->
                    <input type="file" id="recipePicture" name="filename" @change="changeImage" hidden/>
            
                    <!--CLOUD UPLOAD BUTTON-->
                    <label for="recipePicture">
                        <!--This makes the cloud the button to press-->
                            <img src="../../assets/UploadPage/cloud_uploading.png" alt='cloud_upload_icon' id="cloudImage">
                            
                    </label>
                    <p id="fileChosen">
                        <span>{{ selectedFileName }}</span>
                    </p>
                    <!--ADD FUNCTIONALITY TO UPDATE WHEN FILE IS INCLUDED-->
                    <!-- <div id="fileChosenText">
                        <span id='fileChosen'>No File Chosen</span>
                    </div> -->
                </div>
        </div>
</template>

<style>
/*flexBox that is the Image Upload Card*/
.imageUploadCard {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 15px 10px rgba(0, 0, 0, 0.3); /* shadow component for depth, Adjust if needed*/
    border-radius: 10px; /* Needed to avoid shadow from making the white part of box stand out */

    align-items: center;
    /* add more flexible bounds*/
    height: 347px;
}

/*title text for each cards title ADJUST BACKGROUND COLOR IN LINE*/
h1.imageComponent {
    color: white;
    padding: 10px; 
    margin-bottom:0; /* leaves no space in flex box*/
    border-top-left-radius: 10px; border-top-right-radius: 10px; /* rounded top edges*/
    width: 100%;
}

/*Button on Image Upload*/
#imageButton {
    border: none;
    flex: 1;
    border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; /* rounded bottom edges */
    width: 100%;
}



/* CLOUD ICON NEEDS ADJUSTMENT */
#cloudImage {
    width: 300px;
    height: 300px;
    margin-left: 200px;
}

/* style attibutes for button to upload photo*/
label {
    display: block;
    background-color: white;
    height: 250.84px;
    border-radius: 10px;
}

label:hover {
    cursor: pointer;
}

#fileChosen {
    padding-left: 20px;
}

/*STyLE FOR WHEN A FILE IS CHOSEN IT IS SHOWN*/
/* #fileChosenText{

} */

</style>