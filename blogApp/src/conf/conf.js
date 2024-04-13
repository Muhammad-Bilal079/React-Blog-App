const conf = {
appwriteUrl : String(import.meta.VITE_APPWRITE_URL),
appwriteProjectId : String(import.meta.VITE_APPWRITE_PROJECT_ID ),
appwriteDatabaseID : String(import.meta.VITE_APPWRITE_DATABASE_ID),
appwriteCollectionID : String(import.meta.VITE_APPWRITE_COLLECTION_ID ),
appwriteBucketID : String(import.meta.VITE_APPWRITE_BUCKET_ID),
}

export default conf;

 // import.meta.VITE_APPWRITE_URL
  // vite kay through jo project banay ga wahan import.meta kar kay env file ko acess
  //  karain gay otherwise Process.env create rect app kay liay used hota hai 