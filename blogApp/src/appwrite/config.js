import conf from "../conf/conf.js"

import { Client,ID , Databases , Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)          // Your API Endpoint
            .setProject(conf.appwriteProjectId);   // Your project ID
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // create post method 
    async createPost ({title , slug , content , featuredImage , status , userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error;
        }
    }

    // update post method
    async updatePost(slug , {title  , content , featuredImage , status}){
        try {
          return await this.databases.updateDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
            }
          )  
        } catch (error) {
            throw error;
        }
    }

    // delete post method 
    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
             )
             return true;
        } catch (error) {
            throw error;
            return false;
        }
    }

    // get only one post method
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
        } catch (error) {
            throw error;
        }
    }

    // get those post whos status is active
    // yahn per queries use ki hain or is kay liay data base main indexes banana zaruri hai 
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries
            )
        } catch (error) {
            throw error;
            return false;
        }
    } 
                // **********file services**********

    // file upload service/method
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error;
            return false;
        }
    }

    // delete file 
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            )
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }

    // preview file 
    getFilePreview(fileId){
       return this.bucket.getFilePreview(
            conf.appwriteBucketID,
                fileId
        )
    }
}

const service = new Service()

export default service;