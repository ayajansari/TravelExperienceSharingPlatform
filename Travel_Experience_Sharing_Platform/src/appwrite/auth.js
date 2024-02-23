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
        console.log("data received in signup page")
        try{
            
            const userSignedUp=await this.account.create(ID.unique(),email,password,name);
            
            if(userSignedUp){
                console.log("signup successfull")   
                return this.login({email,password});
            }

        }catch(error){
            console.log(error.message)
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