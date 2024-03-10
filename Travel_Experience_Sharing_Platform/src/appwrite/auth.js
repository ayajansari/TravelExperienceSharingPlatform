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

}
const authService=new Authentication()
export default authService;

export var universalTutorialAuthToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJzaGFyZXRyYXZlbGV4cDIwMjRAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoicnNUenYtT0l6eXJ2ODdVc3o3djBwTEtoa1g1WVlmcGFMWGp6VUxkM3BBU19TQ1VkcjdDaFBBVzVmVThOUEdBTVdYQSJ9LCJleHAiOjE3MTAwNjI3ODl9.tM8tQ4uWsk4Hl2VERF97AZKA2uyEuQBZgZ5Vnb6CrnM"
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
                console.log(data.auth_token)
                universalTutorialAuthToken=data.auth_token;
            
            } else { 
            
                console.log('API authToken is expired. ')
            }
        } 
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    fetchApi()
    

},12*60*60*1000);

