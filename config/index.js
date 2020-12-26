const env = require('dotenv').config()
const functions = require('firebase-functions');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (!env) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  secretKey: process.env.SECRET_KEY,
  port: process.env.PORT,
  projectId: process.env.GCLOUD_PROJECT_ID,
  storageBucket: process.env.GCLOUD_STORAGE_BUCKET_URL,
  emailjsServiceId: process.env.EMAILJS_SERVICE_ID,
  emailjsTemplateId: process.env.EMAILJS_TEMPLATE_ID,
  emailjsUid: process.env.EMAILJS_UID,
  password: process.env.PASSWORD,
  user: process.env.USER,
  sendGrid: process.env.SENDGRID_API_KEY,
  paperTrailPort: process.env.PAPERTAIL_PORT,
  paperTrailHost: process.env.PAPERTAIL_HOST,
  projectId: functions.config().env ? functions.config().env.projectid : process.env.GCLOUD_PROJECT_ID,
  storageBucket: functions.config().env ? functions.config().env.storagebucket :  process.env.GCLOUD_STORAGE_BUCKET_URL,
  databaseUrl: functions.config().env ? functions.config().env.databaseurl : process.env.DATABASEURL,
  templateId: functions.config().env ? functions.config().env.templateid : process.env.Template_ID,


};