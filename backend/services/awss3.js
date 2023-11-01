require("dotenv").config();
const AWS = require("aws-sdk");

exports.UploadFileToS3 = (fName, data) => {
  let S3bucket = new AWS.S3({
    accessKeyId: process.env.S3ACCESS_KEY,
    secretAccessKey: process.env.S3ACCESS_SECRET,
  });
  var params = {
    Bucket: process.env.BUCKET,
    Key: fName,
    Body: data,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    S3bucket.upload(params, (err, response) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("sucess", response);
        resolve(response.Location);
      }
    });
  });
};
