# Description
Video carousel for "[accedo](https://www.accedo.tv)"

## Project setup
Install [NodeJS](https://nodejs.org/) if not installed. After you clone repo (expected that you see it in github), to install necessary dependencies run:
```
npm install
```

### Development (run with hot reload)
All sources are in folder `/src`, to edit them in "developers" mode on port [8080](http://localhost:8080) run:
```
npm run serve
```

### Build (chuck and minify to "/docs" folder)
```
npm run build
```

### Server (optional)
There is simple node one file (a bit more) server, but not really required for development. To run it - you should run. Server will run as "nodemon" on [:3002/api/memory](http://localhost:3002/api/memory).
```
npm run server:nodemon
```


### Test (not too many of them, just jest)
```
npm run test
```

### Docker (optional)
Yes, there is docker build here, so you don't run mongo locally if extend server. You should have "[docker-compose](https://docs.docker.com/compose/install/)" being installed. To run locally on http://localhost:3002 docker (which will launch ui as well) do:
There is simple node one file (a bit more) server, but not really required for development. To run it - you should run. Server will run as "nodemon" on port [3002](http://localhost:3002/) with up and running node on [:3002/api/memory](http://localhost:3002/api/memory), static part of app on [:3002/](http://localhost:3002), and with up and running MongoDB.
```
docker-compose up
```

### Notes

Please note that this repo does not contain linters, in all modern productions we use es-lint and where we don't use styled components - also using stylelint fix. Also, often we use prettify. So lets say, you see how I write code without linters here (but I am using IDE of course)

I did not split app into pages, instead I tried to compose in "youtube" style all the components. Reason - I already spent unacceptable amount of time on the UI to make it looking nice, so don't think should spend even more.

Probably nice to add here image loaders (showing ajax loader while image is loading), but most of time in web they are not used.

Probably better to show "image not available", or even filter object with invalid preview image. I did not do this, but mentioned that test data is not perfect.

I did not used CSS frameworks - I am not fan of this, because of extra size for the project. No doubt it would look more fancy with bootstrap, but it is not wise, especially on environment that should be maximum fast (video platform should be maximum fast)

### Questions

VOD with save to watch later
 1. Describe data you would capture as part of this service.
 - when user added to watch later
 - what user added to watch later
 - if user was watching - position when user added (and storing position until user switch video)
 Quality, sound level of video - I would store it but as app config, so switching to watch later user will be in same state as in videos not in list. 
 
 Additionally (for big data purposes):
 - where user added to watch later
 - what was search term (if any) from where user added to watch later
 
 2. How would make this service more efficient?
 
 We should deeply analyse UI for Netflix and Youtube (or current year market leaders), purpose 2-3 types of "extras" for watch later for Netflix / Youtube interface, then analyse our interface, then define changes. 
 
 3. Once the feature is complete, how would you know what it's ready to go live?
 
 Manual testing, automated testing (have doubts that will have automated tests here), test group (have doubts - never had experience with custom hired people). I would of course waiting for defects, but, also, for feedback if it is useful.
 I will try to ask to use my feature of not IT person, like my wife, or even like my mom - adult opinion will matter here, since will be sign of simplicity (or complexity).
 
 4. How would you determine if this feature is successful?
 
 A / B testing - I would run (if it is possible) for percentage of auditory app without feature, and with feature and then collect stats and compare if people spend more time in app, return more frequently to app, very simple charts will indicate the success.
 
 Even if A / B testing is not possible, I would check stats if people are opening "watch later" section, for this I would use UI analytics (I predict, that analytics like GA or Kissmetrix or craze egg is installed). If people open - feature was necessary = is successful (feature itself and its implementation)