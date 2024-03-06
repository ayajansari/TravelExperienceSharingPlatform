const variables={
    myAppwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    myProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    myDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    myCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    myBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinymceApiKey:String(import.meta.env.VITE_TINYMCE_API_KEY),
    universalTutorialApiToken:String(import.meta.env.VITE_UNIVERSAL_TUTORIAL_API_TOKEN),
    universalTutorialAuthToken:String(import.meta.env.VITE_UNIVERSAL_TUTORIAL_AUTH_TOKEN)
}

export default variables;