# BackendDeveloperTest
NodeJsMongoApi

# Run docker
docker-compose up -d

# Endpoints:
```
CreateVideo
POST: localhost:3000/video
BODY:
{
   "name":"Test2",
   "url":"www.youtubeteste.com.br/Test2",
   "thumbnailUrl":"Test2",
   "isPrivate":true,
   "timesViewed": 50
}
```
```
UpdateVideo
PUT: localhost:3000/video
BODY:
{
   "name":"Test2",
   "url":"www.youtubeteste.com.br/Test2",
   "thumbnailUrl":"Test2",
   "isPrivate":true,
   "timesViewed": 50
}
```
```
GetByName
GET: localhost:3000/video?name=Test1
```
```
GetPaginated
GET: localhost:3000/videoPaginated?page=1&limit=100&isPublic=true&viewTimes=40
```
