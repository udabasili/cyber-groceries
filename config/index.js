const env = require('dotenv').config()

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
  templateIdPickUp: process.env.Template_ID_PICKUP,
  templateIdDelivery: process.env.Template_ID_DELIVERY,

  paperTrailPort: process.env.PAPERTAIL_PORT,
  paperTrailHost: process.env.PAPERTAIL_HOST,

};