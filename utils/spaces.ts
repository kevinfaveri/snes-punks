const AWS = require('aws-sdk');

const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: 'XQORQLFBSSJR2IUHSZPC',
  secretAccessKey: 'Wie6kypyEJDdZxitMp0INMQ2K5Sw1KMUoH8UjI5AA48'
});

const spacesBucket = 'snes-16bit-punks'

export const getSignedUrl = async (id) => {
  const getSignedUrlQuery = {
    Bucket: spacesBucket,
    Key: `${id}.png`,
    Expires: 300
  }

  const signedUrl = await s3.getSignedUrl('getObject', getSignedUrlQuery)
  const signedCDNUrl = signedUrl.replace(`https://${spacesBucket}.nyc3`, `https://${spacesBucket}.nyc3.cdn`)
  return signedCDNUrl
}