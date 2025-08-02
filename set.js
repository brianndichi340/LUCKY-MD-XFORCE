const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUJYYkdaV2U4QkdULzQyTVZMeVA3eE1LRGg0YTlEM2FoYzJWanNXdlBIVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUGhSMVRQNmpzQWoxeksyTE5sd0tvZEhPVFoyaWNaa1BzZjhZa2NSR05rWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTR0hEV2d6NXNGVjRRQ2ppRldoeUJxL1pkREF6RDhlVFFDbXpkdTBaTEhJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0ZE9VVlBabXJiOHZJRWdZUGdaeFNraU1Ob3Vub1NKd0o5b2l3YXhyTTB3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtCUkxPYWZrMGUvSS9HWDhieW93Mnp1UmlWZWtzcWxwZ3FkRnlocHYyVjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJzNUlIUVp3QVlXZDU3NmhlckZoZTRFWTYyM2FQMEpXNVVxRElRdDlOMG89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0Fyd1ZKRzlRRm1BSzJvSTlyZFdzS21IbTRCUDJnVW5rYk4rTlpITVRtOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieVVoTmxSd1FNVXYzZkJCU1R2ZFBOK2FkQmI1d25kcVZ3S1NDRXNUZUFHWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRDNVFFbFVFc2dtYXRnYlVEdTR0S3FFWS8va0t2Z0R3WUNnbmUzdzVJaFI0cWd6MmxKclh5MDZ3UkE4VlNmeTFaVS9Nd01jM2pxRWhLY3BrV3RzZUN3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA1LCJhZHZTZWNyZXRLZXkiOiJESXdzMFFFeStWNGRnVlM4ck4vUlh0eStMUVVmTVBLS3A0M2FoQUdMNURjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc0ODEzODI5NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1QUQ0ODYxQUM5MTc0MzNBRjZCOTY1NDYyMjk5Q0RCOCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU0MTMyODQ5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3NDgxMzgyOTVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMDIwMjk5MEIzRTZCMTQyNTBBNjE3MkE5Q0QxOUFENzMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NDEzMjg1NX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiQ0dQNUNWN1QiLCJtZSI6eyJpZCI6IjI1NDc0ODEzODI5NTo2M0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJCcmlhbiIsImxpZCI6IjIzMDQ1MTIzNDk5NjM2Njo2M0BsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ08rTzFlQURFTi9pdDhRR0dCSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InkyTWFodHhSL1BsUjBGMFp2VGxPZkF6K0pXVDYzZFJLcThWbkRCYlo3Mk09IiwiYWNjb3VudFNpZ25hdHVyZSI6Im16MzRtOGsrdHhsWElTVUcrZjQxSnNZRjdRNXBkbmMyMnhGM1o5bVlCVFlQY1ppaFNmejJ5K1BxNTRCN0RGV3hrOWZlc2VTNm5VR1ZtTkd1SUcvOEFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJndVhUTWtEZjZFOG9lOUt0OVh3dmpLWFBXc0lQR1FQdU1NY29JZEFhNjZlNmlBbkJMYXF1R0VqY2ZaVVNORGp1bldiV0JMMnpWanhoMVJWUit1clFDdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc0ODEzODI5NTo2M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjdGpHb2JjVWZ6NVVkQmRHYjA1VG53TS9pVmsrdDNVU3F2Rlp3d1cyZTlqIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTQxMzI4NDQsImxhc3RQcm9wSGFzaCI6IlBXazVCIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGV3QifQ==',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "BRIAN",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254717276195",
    DEV : process.env.DEV || "BOYER KN",
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT : process.env.AUTO_REACTION || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no",
    AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/uw4l17.jpeg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/3o37c5.jpeg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'yes
        ',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    GREET : process.env.GREET_MESSAGE || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By LUCKY-MD-XFORCE',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    ANTI_BUG : process.env.ANTI_BUG || "yes",
    ANTI_MENTION_GROUP : process.env.ANTI_MENTION_GROUP || "no",
    ANTI_TAG : process.env.ANTI_TAG || "no",
    ANTI_BAD : process.env.ANTI_BAD || "no",
    AUTO_BIO: process.env.AUTO_BIO || 'no',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://fredi-ai-site.vercel.app",
    CAPTION : process.env.CAPTION || "LUCKY-BOYER",
    BOT : process.env.BOT_NAME || 'BRIAN-MD-XFORCE',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGES || 'yes',
    ANTI_DELETE_GROUP : process.env.ANTI_DELETE_GROUP || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'no', 
    VOICE_CHATBOT_INBOX : process.env.VOICE_CHATBOT_INBOX || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
