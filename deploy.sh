npm run build
cd dist
scp index.html root@119.29.201.53:/root/NeteaseCloudMusicApi/public
scp -r static/ root@119.29.201.53:/root/NeteaseCloudMusicApi/public
ssh root@119.29.201.53 'pm2 restart app && exit'
