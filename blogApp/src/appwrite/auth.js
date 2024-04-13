// authantication file of appwrite 
import conf from "../conf/conf.js"

import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)          // Your API Endpoint
            .setProject(conf.appwriteProjectId);   // Your project ID
        this.account = new Account(this.client);
    }
    // createAccount method ***************
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // yahan hum chach rahay hain kay create hotay hi login bhi hojay 
                return this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    // login method 
    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    // get current user 
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            throw error;
        }
        return null;
    }

    // logout method 
    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService()

export default authService