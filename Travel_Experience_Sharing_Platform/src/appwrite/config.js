import variables from "./variables";;
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client=new Client()
    databases;
    bucket;//bucket is nothing but storage . storage and databases both are different
    //databases are for storing structured data while  storage is used for unstructed data like images,video,audio,etc.

    constructor(){
        this.client
            .setEndpoint(variables.myAppwriteUrl)
            .setProject(variables.myProjectId)
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }
    
    //createDocument
    async createPost({title,country,state,city,slug,content,featuredImage,status,userId}){

        try{
            return await this.databases.createDocument(
                variables.myDatabaseId,    //[DATABASE_ID]
                variables.myCollectionId,  //[COLLECTION_ID]
                slug,                       //[DOCUMENT_ID]
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    country,
                    state,
                    city
                }
            )
        }
        catch(error){
            throw error;
        }
    }

    //updateDocument
    async updatePost(slug,{title,content,featuredImage,status,country,state,city,author}){
        console.log("author",author)
        try{
            return await this.databases.updateDocument(
                variables.myDatabaseId,
                variables.myCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    country,
                    state,
                    city,
                    name:author
                    
                }
            )     
        }
        catch(error){
            console.log("Appwrite Service :: updataPost :: error",error)
        }
    }
    //delete document
    async deletePost(slug){
        try {
            
            await this.databases.deleteDocument(
                variables.myDatabaseId,
                variables.myCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("appwrite:service::deletePost::error",error)
            return false;
        }
    }

    //get Document
    async getPost(slug){

        try {
            return await this.databases.getDocument(
                variables.myDatabaseId,
                variables.myCollectionId,
                slug
            )
        } catch (error) {
            console.log("error getting post:",error)
            return false
        }
    }

    //get Documents via queries
    async getPosts(userId){
        try{
            return await this.databases.listDocuments(
                variables.myDatabaseId,
                variables.myCollectionId,
                [
                    Query.equal('userId',userId)  
                ]
            )
        }
        catch(error){
            console.log("appwrite service :: getPosts :: error",error)
            
        }
    }

    //get all posts
    async getAllPosts(){
        try{
            return await this.databases.listDocuments(
                variables.myDatabaseId,
                variables.myCollectionId,
                
            )
        }
        catch(error){
            console.log("appwrite service :: getAllPosts :: error",error)
            
        }
    }
    
    //getPosts according to filter
    async getPostsFilter({country,state,city}){

        try{
            if(city){
                return await this.databases.listDocuments(
                    variables.myDatabaseId,
                    variables.myCollectionId,
                    [
                        Query.equal( "city",city),
                    ],
                    100,
                    0
                )
                
            }
            else if(state){

                return await this.databases.listDocuments(
                    variables.myDatabaseId,
                    variables.myCollectionId,
                    [
                        Query.equal( "state",state),
                    ],
                    100,
                    0
                )

            }
            else {

            
                return await this.databases.listDocuments(
                    variables.myDatabaseId,
                    variables.myCollectionId,
                    [
                        Query.equal( "country",country)
                    ],
                    100,    //limit->100 means that the query will retrieve up to 100 documents at a time.
                    0   //offset: This parameter specifies the offset from which to start retrieving documents.
                    // For example, if you have already retrieved the first 100 documents and want to fetch 
                    //the next set of documents, you would set offset to 100 to start from the 101st document.
                )
            }

        }catch(error){
            console.log("error while retrieving filtered documents:",error.message)
            throw error
        }
    }

    //upload file
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                variables.myBucketId,
                ID.unique(),
                file
            )
        }
        catch(error){
            return false;
        }

    }

    //delete file
    async deleteFile(fileId){

        try {
            await this.bucket.deleteFile(
                variables.myBucketId,
                fileId
            )
            return true;
        } catch (error) {
            throw error;
        }
    }

    //getFilePreview ->it is a method that can be used to generate a preview
                    // URL for a file. It is commonly used to generate URLs for 
                    //image and video previews uploaded to the Appwrite storage service. 

    async getFilePreview(fileId){

        try{
            console.log("got file id:",fileId)
            let file=await this.bucket.getFilePreview(
                variables.myBucketId,
                fileId
            )
            
            // console.log("filepreview",file)
            return file
           
        }catch(err){
            console.log("image preview error:",err)
            throw err
        }
    }

    //add email to newsletters
    async newsletter(email,userId){
        try{
            return await this.databases.createDocument(
                variables.myDatabaseId,    //[DATABASE_ID]
                variables.myNewsletterId,  //[COLLECTION_ID]
                userId,                       //[DOCUMENT_ID]
                {
                    email
                }
            )
        }
        catch(error){
            throw error;
        }
    }

 

    //get active and inactive posts number
    async getActiveInactivePosts(id){

        let obj={
            "active":0,
            "inactive":0
        };
        try{

            const activePosts=await this.databases.listDocuments(
                variables.myDatabaseId,
                variables.myCollectionId,
                [
                    Query.equal('userId', id),
                    Query.equal('status',"Active"),

                ]
            )
            if(activePosts){
                console.log("activePosts:",activePosts)
                obj["active"]=activePosts.documents.length;
            }

            const InactivePosts=await this.databases.listDocuments(
                variables.myDatabaseId,
                variables.myCollectionId,
                [
                    Query.equal('userId', id),
                    Query.equal('status',"Inactive"),

                ]
            )
            if(InactivePosts){
                console.log(InactivePosts)
                obj["inactive"]=InactivePosts.documents.length;
                return obj;
            }

            
        }
        catch(err){
            console.log("some error while fetching active inactive posts",err)
        }
    }

    //get profileData from userDetails
    async userDetails(id){
        try{
            return await this.databases.getDocument(
                variables.myDatabaseId,
                variables.myUsersDetailsId,
                id
            )
        }
        catch(error){
            console.log("user details not found")
            throw error;
        }
    }

   


    //update userDetails
    async updataDetails({$id,name}){
        try {
            // return await this.databases.updateDocument(
            //     variables.myDatabaseId,
            //     variables.myUsersDetailsId,
            //     $id,
            //     {
            //         name,
            //         ,

            //     }
            // )  

            
        } catch (error) {
            console.log(error.message)
            throw error;
        }
        
    }
}

const service=new Service()
export default service;


//in class no need to write data types of variables,functions