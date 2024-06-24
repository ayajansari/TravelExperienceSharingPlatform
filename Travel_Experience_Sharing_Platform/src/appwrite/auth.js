import { Client,Account,ID } from 'appwrite';
import variables from './variables';



class Authentication{
    client=new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(variables.myAppwriteUrl)
            .setProject(variables.myProjectId);
    
        this.account=new Account(this.client);
    }
    
    async signup({name,email,password}){
        // console.log("data received in signup page")
        try{
            
            const userSignedUp=await this.account.create(ID.unique(),email,password,name);
            
            if(userSignedUp){
                // console.log("signup successfull")   
                return this.login({email,password});
            }

        }catch(error){
            // console.log(error.message)
            throw error;
        }

    }

    async login({email,password}){
        try {
            
            return await this.account.createEmailSession(email,password);
            

        } catch (error) {
            console.log(error.message);
            throw error
        }
    }

    async loginByGoogle(){

        this.account.createOAuth2Session('google', "travel-experience-sharing-platform.vercel.app/","travel-experience-sharing-platform.vercel.app/signup")    
    }

    async loginByGithub(){

        this.account.createOAuth2Session('github', "http://localhost:5173/","http://localhost:5173/signup")
    }

    async getCurrentUser(){
        try{
            return this.account.get()
        }catch(error){
            console.log(error.message)
            return error
        }
    }

    async logout(){
        try {
            
            return await this.account.deleteSessions();

        } catch (error) {
            console.log(error.message)
            throw error;
        }
        
    }

    async changePass(password,oldPassword){
        try {
            return await this.account.updatePassword(
                password,
                oldPassword
            );
            
        } catch (error) {
            throw error;

        }
    }

}






const authService=new Authentication()
export default authService;

export var universalTutorialAuthToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJzaGFyZXRyYXZlbGV4cDIwMjRAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoicnNUenYtT0l6eXJ2ODdVc3o3djBwTEtoa1g1WVlmcGFMWGp6VUxkM3BBU19TQ1VkcjdDaFBBVzVmVThOUEdBTVdYQSJ9LCJleHAiOjE3MTkyOTUxMDR9.lyjz0ubA71ll8-0a0sX0ImZBYqSXlXgbbM9KNR8k6Uc"

setInterval(() => {
    // console.log("fetching")
    const fetchApi=async()=>{

    
        try {
            const response = await fetch("https://www.universal-tutorial.com/api/getaccesstoken", {
            headers: {
                
                "Accept": "application/json",
                "api-token":variables.universalTutorialApiToken,
                "user-email":variables.userEmail,

            }
            });
            if (response.ok) {
            const data = await response.json();
            console.log(data)
            universalTutorialAuthToken=data;

            } else {
            
            setError('API authToken is expired. ')
            }
        } 
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    fetchApi()
    

},60*60*1000);

