import CryptoJS from "crypto-js";


class Helper{
    constructor(){}
    /**
     * 
     * @param {String} password password we want to hash 
     * @returns 
     */
    passwordToHash(password){
        const firstHash = CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH).toString();
        const secondHash = CryptoJS.HmacSHA256(password, firstHash);
        return secondHash; 
    }

    
}

export default new Helper();