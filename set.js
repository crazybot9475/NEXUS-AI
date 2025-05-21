




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUtqd1NDMmJBWFhXcWtGT3NGWkd0Mm1jWGVYUnJkTlRMNElKWGxKR3BuST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQVBoZExNZ2lHb3BaWCtiYkVHS2VNZzVhVjNGSTBJd3BkTVdnMWN0VE1obz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyRjF5bHdQcTV0Z2lHaGpUaFpocXhneTRzQkhBVGp3a2hBZGtBU1pmOFVZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRQ3lXcyt0b3loYkhpYzB2My91WWsyY1lrc05JTk9oallCaEVRMUlMdGhVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1KekFGWHBReUxjMlRZc2RQajFNMWxjOTZHWHpvc0RZY1RodnlZTlZGbDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhQR1ZEZGJhQVkwckJScFBoTWt2RlUwaUprZDcyNGpUcDRLSitSMm5UVVE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0NQclJRdElDeHpMSzJFRWYvVWxDVm01Z3JJbG01R3o5bDE4VDIzWnJHZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSFlncjlqWGFKTTRodGxuSFJnVzV1WkxSblFiVE56QzVqTjBJU3NlOEJ3ST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVLY2NFMFc1dVc2dlJVbmJaaW9rNk5VMnhYU2dTQ3lndVdBa056M01HUktST3BRTWRFVE1HNWpOY1FaWFBldFdvUVpFTFQwcnJESjIvYVgzdm5tbURRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYwLCJhZHZTZWNyZXRLZXkiOiI4K3RBclk3VHJLYnY2VEU1dExqSDkzYXM1aERGTmFKaUVFbys1V0hDZ2VFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkxOTMzMzI4MjMzM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCOURFREEwOUZDRTdEMkQ5N0QwNTIxOUU1NjhDOUZBNyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3ODQ1OTc5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTkzMzMyODIzMzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODZGQUM4QjZDQTc3OUYyNUVDNTc3NUI0RTNBRjM5RkQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0Nzg0NTk4MH0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTE5MzMzMjgyMzMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjA3QkJEQTk0MDAyQTQ5MjRGRjBCRDc2N0NFMDJGMTQ0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDc4NDYwMTB9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IloxRFRKVlJRIiwibWUiOnsiaWQiOiI5MTkzMzMyODIzMzM6NkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjIyMjQxMDY3MDM2Njc3OTo2QGxpZCIsIm5hbWUiOiLinKhTLkRlYiDinKgifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05UZzlMVUJFTW1HdU1FR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IldLaFZqbDlpd1hzMlEySGI5UmpsNnJNSWhrdUR0LytoY3RKcVRzNVI1UWs9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImdzdFNEcS8vMXRHYndFRTRyeE5CYnRNUEIxYkFmQjlEOE5ycHMrT0s1V1Z6Rzk4Z3B6OTNldDEvU2pteDY3ZTRUdTZER2xROFlxNENFWllyRVkvd0RBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJpQ0xTRXdJckVIbmZXWWlncFlVK0FqcHJERFI3c1Q5cUc0UnpwWllZR1hCaEl1UWQ2YjdPQ0kxa0s0R0ZXMndSYlZMV2hpTlcyODBuczVIdEpYMDZEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkxOTMzMzI4MjMzMzo2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZpb1ZZNWZZc0Y3TmtOaDIvVVk1ZXF6Q0laTGc3Zi9vWExTYWs3T1VlVUoifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0Nzg0NTk3NCwibGFzdFByb3BIYXNoIjoiMk1GS1BRIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGS3YifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "254710772666",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "yes",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
