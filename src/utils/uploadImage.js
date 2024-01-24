const { getStorage, ref, uploadString, getDownloadURL } = require("firebase/storage");


const firebaseApp = require("./../db/firebase");

const storage = getStorage(firebaseApp);

const uploadImage = async (image) => {
    try {
        const name = `${Date.now()}.${image.fileType}`;
        const storageRef = ref(storage, '/images/'+name);
        const imageRef = image.image.split(",")[1];
        await uploadString(storageRef, imageRef, "base64")
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        throw error;
    }
};

module.exports = uploadImage;