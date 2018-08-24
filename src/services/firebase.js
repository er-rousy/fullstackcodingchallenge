import facebook from './facebook'
import services from './services'
import * as firebaseLibrary from 'firebase';
// allow single instance during app lifecycle
let firebaseInstance = null

/**
 * Manage firebase library.
 */
class firebase {
    constructor() {
        // initialize a new instance if needed
        if (!firebaseInstance) {
            firebaseInstance = this

        }
        this.facebook = new facebook();
        return firebaseInstance
    }


    /**
     * upload selected photos to firebase
     * @param {*callback} progressCallback function to report uploading progress
     */
    async uploadSelectedPhotos(progressCallback = (percent) => { }) {
        let selectedPhotos = this.facebook.getSelectedPhotos()
        if (selectedPhotos.length === 0) return;

        let profile = await this.facebook.getProfile();
        // get firebase client token
        let token = (await services.getTokenFirbase(profile.id)).data;
        var config = {
            apiKey: "AIzaSyCGekgEJT43B8iJkDi5JALjFBqaov00IZo",
            authDomain: "hidden-founder.firebaseapp.com",
            projectId: "hidden-founder",
            storageBucket: "hidden-founder.appspot.com"
        };
        debugger;
        let appFirebase = firebaseLibrary.initializeApp(config);
        appFirebase.auth().signInWithCustomToken(token);

        let processedPhotosCount = 1;
        for (let photo of selectedPhotos) {
            // download image

            let image = (await services.getFileBlobFromUrl(photo.thumbnail)).data;
            // Create a root reference
            let storageRef = appFirebase.storage().ref();
            // Create a reference to images
            let mountainsRef = storageRef.child('images/' + photo.id + '.jpg');
            // Create file metadata including the content type
            let metadata = {
                contentType: 'image/jpeg',
            };
            // Upload the file and metadata
            await mountainsRef.put(image, metadata);
            // report progress 
            let progressPercent = (processedPhotosCount++ * 100) / selectedPhotos.length
            progressCallback(progressPercent)

            this.facebook.removeSelectedPhoto(photo)
        }
    }

}


export default firebase