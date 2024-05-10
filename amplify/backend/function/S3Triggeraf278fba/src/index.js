exports.handler = async function (event) {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  // File information to go to MatLab
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  console.log(`Bucket: ${bucket}`, `Key: ${key}`);
};