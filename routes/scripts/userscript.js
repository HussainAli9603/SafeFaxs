var request = require('request-promise');
var path = require('path');
var fs      = require('fs');
var cheerio = require('cheerio');
let TopWorld = require("../../models/top-world");
let TopRussia = require("../../models/top-russia");
let TopItaly = require("../../models/top-italy");
let Rooms = require("../../models/rooms");
let RussiaRooms = require("../../models/Russiarooms");
let RussiaRoomsId = require("../../models/russia-roomId");
let RoomId = require("../../models/roomId");
let RoomUserDetail = require("../../models/room-user-detail");
let ItalyUserDetail = require("../../models/italy-user-detail");
let Events = require("../../models/events");
let EventsRussia = require("../../models/eventRussia");
let RussiaRoomUserDetail =  require("../../models/russia-room-user-detail");
let mkdir = require('mkdir');
// let User = require("../../models/user");
let connection = require('../../config/database');
// let bcrypt = require('bcryptjs');
let axios = require("axios");
let async = require('async');
const puppeteer = require('puppeteer');
const headless = process.argv[2] === "headless";

// const minimal_args = [
//   '--autoplay-policy=user-gesture-required',
//   '--disable-background-networking',
//   '--disable-background-timer-throttling',
//   '--disable-backgrounding-occluded-windows',
//   '--disable-breakpad',
//   '--disable-client-side-phishing-detection',
//   '--disable-component-update',
//   '--disable-default-apps',
//   '--disable-dev-shm-usage',
//   '--disable-domain-reliability',
//   '--disable-extensions',
//   '--disable-features=AudioServiceOutOfProcess',
//   '--disable-hang-monitor',
//   '--disable-ipc-flooding-protection',
//   '--disable-notifications',
//   '--disable-offer-store-unmasked-wallet-cards',
//   '--disable-popup-blocking',
//   '--disable-print-preview',
//   '--disable-prompt-on-repost',
//   '--disable-renderer-backgrounding',
//   '--disable-setuid-sandbox',
//   '--disable-speech-api',
//   '--disable-sync',
//   '--hide-scrollbars',
//   '--ignore-gpu-blacklist',
//   '--metrics-recording-only',
//   '--mute-audio',
//   '--no-default-browser-check',
//   '--no-first-run',
//   '--no-pings',
//   '--no-sandbox',
//   '--no-zygote',
//   '--password-store=basic',
//   '--use-gl=swiftshader',
//   '--use-mock-keychain',
// ];

module.exports = {

  PostTopWorlds:async function(req,res){
 function run () {
   return new Promise(async (resolve, reject) => {
        try {
           // let TopWorld = require("../../models/top-world");
            const browser = await puppeteer.launch({ headless: true, slowMo: -250,
              // args:minimal_args,waitUntil: 'domcontentloaded',ignoreDefaultArgs: ['--disable-extensions'], 
             });
            const newPage = await browser.newPage();
            await newPage.setDefaultNavigationTimeout(0);
            // await newPage.waitFor(5000); 
            await newPage.goto("https://clubhouseranking.net/top-world");
              // await newPage.waitForNavigation({ waitUntil: 'domcontentloaded' });

              let results = [];
                let items = await newPage.$$('a.RankingTopWorld__userPreview--1CGVV');
                console.log(items)
                 for(let element of items){
                        let username = await element.$eval('.UserPreview__username--2tKrj',node5 => node5.innerText.trim());
                          // let url = await element.$eval(href);
                          const handle = await element.$('selector');
                          const url = await element.evaluate(anchor => anchor.getAttribute('href'), handle);
                          let rate = await element.$eval('.UserPreview__rate--1i6_h',node2 => node2.innerText.trim());
                          let name = await element.$eval('.UserPreview__name--32-ta',node4 => node4.innerText.trim());
                          let img = await element.$eval('img',node1 => node1.src);
                          let followers = await element.$eval('.UserPreview__followers--155pp',node3 => node3.innerText.trim());
                          let bio = await element.$eval('.UserPreview__bio--3bHn0',node => node.innerText.trim());
                          // let url = await element.$eval(a => a.getProperty('href'));
                          TopWorld.findOne({username:username},async function(err,top){
                            console.log(top)
                            if(top){
                                top.followers = followers;
                                top.save();
                            }
                            else{
                               var oldStr = username;
                            var newStr = oldStr.substring(1); //remove first character "ello"
                               let topWorld = new TopWorld({
                                username:newStr,
                                url:url,
                                rate:rate,
                                name:name,
                                img:img,
                                followers:followers,
                                bio:bio,
                                 });
                               console.log(topWorld)
                              await topWorld.save();
                            }
                          })

                          // await element.waitFor(5000);
                       }
                        
                        browser.close();
                        res.redirect('/top-world')
                                  //  TopWorld.find({},function(err,top){
                                  //    res.render('home/top-world',{
                                  //     top:top
                                  //    })
                                  // })
                              
                        
                       // return resolve(urls);
                   }catch(e){
                      return reject(e);
                   }
               });
  }
run()

 },

 // UserDetails:async function(req,res){
 //     TopWorld.findOne({username:req.params.username},function(err,tops){
 //       res.render('home/userDetails',{
 //          tops:tops
 //       });

 //     })
 // },


 // -------------------------------------------------------------------------------
PostTop250Russia:async function(req,res){
 function run2 () {
   return new Promise(async (resolve, reject) => {
        try {
           // let TopRussia = require("../../models/top-russia");
           // var allDelete = await TopRussia.deleteMany({local:1 || ""});
            const browser = await puppeteer.launch({headless: true,});
            const newPage = await browser.newPage();
            await newPage.setDefaultNavigationTimeout(0);
            await newPage.goto("https://clubhouseranking.net/top-russia");

              let results = [];
                let items = await newPage.$$('.RankingTopRussia__userPreview--3lqdv');
              
                 for(let element of items){
                        let username = await element.$eval('.UserPreview__username--2tKrj',node5 => node5.innerText.trim());
                        
                          // let url = await element.$eval(href);
                          const handle = await element.$('selector');
                          const url = await element.evaluate(anchor => anchor.getAttribute('href'), handle);
                          let rate = await element.$eval('.UserPreview__rate--1i6_h',node2 => node2.innerText.trim());
                          let name = await element.$eval('.UserPreview__name--32-ta',node4 => node4.innerText.trim());
                          let img = await element.$eval('img',node1 => node1.src);
                          let followers = await element.$eval('.UserPreview__followers--155pp',node3 => node3.innerText.trim());
                          let bio = await element.$eval('.UserPreview__bio--3bHn0',node => node.innerText.trim());
                           // console.log(url)
                          // let url = await element.$eval(a => a.getProperty('href'));
                          TopRussia.findOne({username:username},async function(err,top){
                            if(top){
                                top.followers = followers;
                                top.save();
                            }else{
                              var oldStr = username;
                            var newStr = oldStr.substring(1); //remove first character "ello"
                               let topRussia = new TopRussia({
                                username:newStr,
                                url:url,
                                rate:rate,
                                name:name,
                                img:img,
                                followers:followers,
                                bio:bio,
                                 });
                               console.log(topRussia)
                              await topRussia.save();
                            }
                          })

                          
                       }
                        
                        browser.close();
                        res.redirect('/top-russia')
                               
                                  //  TopRussia.find({},function(err,top){
                                  //    res.render('home/top-russia',{
                                  //     top:top
                                  //    })
                                  // })
                              
                        
                       // return resolve(urls);
                   }catch(e){
                      return reject(e);
                   }
               });
  }
run2()

 },


// -=-=-=-=-=-=-=-==-=-=-=--===--=-=-=-=-=-=-=-=-=-------==-===-=-==-=-==-=-==-=-=-=

Rooms:async function(req,res){
 function run3 () {
   return new Promise(async (resolve, reject) => {
        try {
           let Rooms = require("../../models/rooms");
            const browser = await puppeteer.launch({headless: true,
  // slowMo: 250, // slow down by 250ms
   });
                var allDelete = await Rooms.deleteMany({local:1 || ""});
                if(allDelete){

            const newPage = await browser.newPage({headless: true});
            await newPage.setDefaultNavigationTimeout(0);
            await newPage.goto("https://clubhouseranking.net/rooms",{waitUntil: 'networkidle0'});

              images = [];
              const items = await newPage.$$('a.Channels__channelPreview--16gYL');
              // const image = await newPage.$$('div.ChannelPreview__hostsAvatars--3Lt_o');
              
              
                 for(let element of items){
                      // for (let i = 0; i < image.length; i++) { 
                  // console.log(element)
                        // let url = await element.$eval(href);
                          const handle = await element.$('selector');
                          const url = await element.evaluate(anchor => anchor.getAttribute('href'), handle);
                          const name = await element.$eval('.ChannelPreview__name--3BXVF',node4 => node4.innerText.trim());
                        
                          const users = await element.$eval('.ChannelPreview__users--2YJjN',node3 => node3.innerText.trim());
                          const comment = await element.$eval('div',node => node.innerText.trim());
                         
                            // console.log(comment)
                            // console.log(users)
                   const img1 = await element.$eval('img',image => image.src);

                // const issueSrcs = await element.$eval('img',imgs => {
                // const srcs =  Array.from("img").map(
                //   (image) => image.src);
                // // images.push(srcs)
                // console.log(srcs)
                //   return srcs;
                //   images.push(srcs)
                // }); 
                // console.log(issueSrcs)


        // var img1 =  await element.$eval('img',node1 => node1.src);                             
                         
                         // var img2 =  await element.$eval('.ChannelPreview__hostAvatar--PsdaI',node2 => node2.src);                             
                          
                          // let url = await element.$eval(a => a.getProperty('href'));
                          // Rooms.deleteMany({local:1}).then(async(err,result)=>{
                          //   if(top){
                          //       top.users = users;
                          //       top.save();
                          //   }else{

                               const rooms = new Rooms({
                                url:url,
                                name:name,
                                users:users,
                                comment:comment,
                                img1:img1,
                                // img2:img2,

                                 });
                               // console.log(rooms)
                               await rooms.save();
                           
                          //   }
                          // })
                          }
                                                     

                       }else{


            const newPage = await browser.newPage();
            await newPage.setDefaultNavigationTimeout(0);
            await newPage.goto("https://clubhouseranking.net/rooms",{waitUntil: 'networkidle0'});

              images = [];
              const items = await newPage.$$('a.Channels__channelPreview--16gYL');
              // const image = await newPage.$$('div.ChannelPreview__hostsAvatars--3Lt_o');
              
              
                 for(let element of items){
                   

                      // for (let i = 0; i < image.length; i++) { 
                  // console.log(element)
                        // let url = await element.$eval(href);
                          const handle = await element.$('selector');
                          const url = await element.evaluate(anchor => anchor.getAttribute('href'), handle);
                          const name = await element.$eval('.ChannelPreview__name--3BXVF',node4 => node4.innerText.trim());
                        
                          const users = await element.$eval('.ChannelPreview__users--2YJjN',node3 => node3.innerText.trim());
                          const comment = await element.$eval('div',node => node.innerText.trim());
                         
                            // console.log(comment)
                            // console.log(users)
                   const img1 = await element.$eval('img',image => image.src);

                // const issueSrcs = await element.$eval('img',imgs => {
                // const srcs =  Array.from("img").map(
                //   (image) => image.src);
                // // images.push(srcs)
                // console.log(srcs)
                //   return srcs;
                //   images.push(srcs)
                // }); 
                // console.log(issueSrcs)


        // var img1 =  await element.$eval('img',node1 => node1.src);                             
                         
                         // var img2 =  await element.$eval('.ChannelPreview__hostAvatar--PsdaI',node2 => node2.src);                             
                          
                          // let url = await element.$eval(a => a.getProperty('href'));
                          // Rooms.deleteMany({local:1}).then(async(err,result)=>{
                          //   if(top){
                          //       top.users = users;
                          //       top.save();
                          //   }else{

                               const rooms = new Rooms({
                                url:url,
                                name:name,
                                users:users,
                                comment:comment,
                                img1:img1,
                                // img2:img2,

                                 });
                               // console.log(rooms)
                               await rooms.save();
                           
                          //   }
                          // })
                          // }
                                                     
                       }
                         }
                            
                              
                        browser.close();
                          await Rooms.find({},function(err,topss){//.sort('-createdAt')
                          console.log(topss)
                                     res.render('home/rooms',{
                                      topss:topss,
                                     })
                                  })
                        
                        // return resolve(top);
                   }catch(e){
                      return reject(e);
                   }
               });
  }
run3()

 },

 // -----------------------------------------------------------------------------------------

RoomId:async function(req,res){

    function run4() {
   return new Promise(async (resolve, reject) => {
        try {

           // let RoomId = require("../../models/roomsId");
            // const browser = await puppeteer.launch({headless: true}); // slowMo: 250, // slow down by 250ms
  
            // const newPage = await browser.newPage();
            // await newPage.setDefaultNavigationTimeout(0);
            // await newPage.goto("https://clubhouseranking.net/rooms",{waitUntil: 'networkidle0'});

              // let results = [];
    await Rooms.findOne({_id:req.params.id},async function(err,roomid){
               
                // if(roomid){
                  // console.log(roomid)
            const browser = await puppeteer.launch({headless: true }); // slow down by 250ms
 
            // var allDelete = await RoomId.deleteMany({local:1})

              const newPage = await browser.newPage();
            await newPage.setDefaultNavigationTimeout(0);
           var page =  await newPage.goto(`https://clubhouseranking.net${roomid.url}`,{waitUntil: 'networkidle0'});

              const items = await newPage.$$('a.Channel__user--fJO2j');  
              console.log(items)
              // var allDelete = await RoomId.deleteMany({local:1})
                 for(let element of items){
                     // console.log(element)
                        // let url = await element.$eval(href);
                          const handle = await element.$('selector');
                          const url = await element.evaluate(anchor => anchor.getAttribute('href'), handle);
                          const name = await element.$eval('.Channel__user_name--1LlOZ',node4 => node4.innerText.trim());
                          const img = await element.$eval('img',node1 => node1.src);
                          const username = await element.$eval('.Channel__user_username--3dFzu',node3 => node3.innerText.trim());
                           // console.log(url)
                           // console.log(name)
                           // console.log(img)
                           // console.log(username)
                          // let url = await element.$eval(a => a.getProperty('href'));
                          RoomId.findOne({name:name},async function(err,top){
                            
                            if(top){
                               // res.redirect(`/rooms/${req.params.id}`)
                            }else{
                               let roomId = new RoomId({
                                room:req.params.id,
                                url:url,
                                name:name,
                                username:username,
                                img1:img,
                                 });
                               console.log(roomId)
                              await roomId.save();
                            }
                          
                          })
                          //   if(name.length == 100){
                          //       await RoomId.find({room:req.params.id},async function(err,top){
                          // // await Rooms.findOne({_id:req.params.id},function(roomId){

                          // console.log(top)
                          //            return res.render('home/room-groups',{
                          //             top:top,
                          //             // roomId:roomId
                          //          })
                          //       // })
                          //     })    
                          //   }
                            

                       }
                     // }else{
                     //   // res.redirect('/rooms')
                     //   console.log('Error')
                     // }
                      await RoomId.find({room:req.params.id},async function(err,top){
                          // await Rooms.findOne({_id:req.params.id},function(roomId){

                          console.log(top)
                                     return res.render('home/room-groups',{
                                      top:top,
                                      // roomId:roomId
                                   })
                                // })
                              })      
                        browser.close();

                      })

                        
                         
                            
                       
                        
                                  
                        
                  
                       return resolve();
                   }catch(e){
                      return reject(e);
                   }
               });
  }
// setInterval(run4,20000)
run4();
 },


 // ---------------------------------------------------------------------------------------------
 RoomUserDetail:async function(req,res){
   
    function run5 () {
   return new Promise(async (resolve, reject) => {
        try {

           // let RoomId = require("../../models/roomsId");
            // const browser = await puppeteer.launch({headless: true});// slowMo: 250, // slow down by 250ms


               RoomId.findOne({_id:req.params.id},async function(err,roomid){

               console.log(roomid)
                // if(roomid){
                  // console.log(roomid)
            const browser = await puppeteer.launch({headless: true,slowMo: 250}); // slow down by 250ms

            // var allDelete = await RoomId.deleteMany({local:1})

              const newPage = await browser.newPage();
            await newPage.setDefaultNavigationTimeout(0);
           var page =  await newPage.goto(`https://clubhouseranking.net${roomid.url}`,{waitUntil: 'networkidle0'});
                    // const href = await page.$eval(".User__section--1GRwE.User__bio--1QL3V", (elm) => elm.textContent);
                    // console.log(href)
                     // const text = await (await element.getProperty('User__bio--1QL3V')).jsonValue(); 
                     // console.log(text)  

                           const items = await newPage.$$('.User__root--2Jpeo');
                           // console.log(items)
                           for(let element of items){
                          const userDetail = await element.$eval('.User__bio--1QL3V',node3 => node3.innerText.trim());
                  const followers = await element.$eval('.UserPreview__followers--155pp',node4 => node4.innerText.trim());
                  const img = await element.$eval('img',node1 => node1.src);
                  const name = await element.$eval('.UserPreview__name--32-ta',node6 => node6.innerText.trim());
                  const username = await element.$eval('.UserPreview__username--2tKrj',node5 => node5.innerText.trim());
                          console.log(followers)
                          console.log(img)
                          console.log(name)
                          console.log(username)
                                                  
                           // const getDimensions = await page.evaluate(() => {
                           //    return {
                           //      width: document.documentElement.clientWidth,
                           //      height: document.documentElement.clientHeight
                           //    };
                           //  });
  
                         // await RoomUserDetail.findOne({userDetail:userDetail},async function(err,top){
                         //    if(top){
                         //       res.redirect(`/users-detail/${req.params.id}`)
                         //    }else{

                               let roomUserDetail = new RoomUserDetail({
                                   userId:req.params.id,
                                   userDetail:userDetail,
                                   followers:followers,
                                   img1:img,
                                   name:name,
                                   username:username,
                                 });

                              console.log(roomUserDetail)
                              await roomUserDetail.save();

                          //   }
                          // })
                           }

                            RoomUserDetail.findOne({userId:req.params.id})
                        .populate({ 
                          path : 'userId',
                          model : 'RoomUserDetail'})
                        .then((top)=>{
                           console.log(top)
                         
                          // console.log(roomId)
                                     res.render('home/roomUserDetails',{
                                      top:top,
                                      // roomId:roomId
                                   
                                })
                              }) 

                               browser.close();


                       // }
                     // }else{
                     //   // res.redirect('/rooms')
                     //   console.log('Error')
                     // }

                      })
                        
                         
                     
                           
                      
                                  
                        
                  
                       // return resolve(urls);
                   }catch(e){
                      return reject(e);
                   }
               });
  }
run5()
 },

// -=-=-=-=-=-=-=-==-=-=-=--===--=-=-=-=-=-=-=-=-=-------==-===-=-==-=-==-=-==-=-=-=

RussiaRoomss:async function(req,res){
    function run6 () {
      return new Promise(async (resolve, reject) => {
        try {
           let RussiaRooms = require("../../models/Russiarooms");
            const browser = await puppeteer.launch({headless: true,
   // slowMo: 250, // slow down by 250ms
    });
                var allDelete = await RussiaRooms.deleteMany({local:1 || ""});
                if(allDelete == undefined || allDelete == ""){

            const newPage = await browser.newPage();
            await newPage.setDefaultNavigationTimeout(0);
            await newPage.goto("https://clubhouseranking.net/rooms?country_code=ru",{waitUntil: 'networkidle0'});

              images = [];
              const items = await newPage.$$('a.Channels__channelPreview--16gYL');
              console.log(items);
              // const image = await newPage.$$('div.ChannelPreview__hostsAvatars--3Lt_o');
              
              
                 for(let element of items){
                   

                      // for (let i = 0; i < image.length; i++) { 
                  // console.log(element)
                        // let url = await element.$eval(href);
                          const handle = await element.$('selector');
                          const url = await element.evaluate(anchor => anchor.getAttribute('href'), handle);
                          const name = await element.$eval('.ChannelPreview__name--3BXVF',node4 => node4.innerText.trim());
                        
                          const users = await element.$eval('.ChannelPreview__users--2YJjN',node3 => node3.innerText.trim());
                          const comment = await element.$eval('div',node => node.innerText.trim());
                         
                            // console.log(comment)
                            // console.log(users)
                   const img1 = await element.$eval('img',image => image.src);

                // const issueSrcs = await element.$eval('img',imgs => {
                // const srcs =  Array.from("img").map(
                //   (image) => image.src);
                // // images.push(srcs)
                // console.log(srcs)
                //   return srcs;
                //   images.push(srcs)
                // }); 
                // console.log(issueSrcs)


        // var img1 =  await element.$eval('img',node1 => node1.src);                             
                         
                         // var img2 =  await element.$eval('.ChannelPreview__hostAvatar--PsdaI',node2 => node2.src);                             
                          
                          // let url = await element.$eval(a => a.getProperty('href'));
                          // Rooms.deleteMany({local:1}).then(async(err,result)=>{
                          //   if(top){
                          //       top.users = users;
                          //       top.save();
                          //   }else{

                               const rooms = new RussiaRooms({
                                url:url,
                                name:name,
                                users:users,
                                comment:comment,
                                img1:img1,
                                // img2:img2,

                                 });
                               // console.log(rooms)
                               await rooms.save();
                           
                          //   }
                          // })
                          }
                                                     

                       }else{

                            const newPage = await browser.newPage();
            await newPage.setDefaultNavigationTimeout(0);
            await newPage.goto("https://clubhouseranking.net/rooms?country_code=ru",{waitUntil: 'networkidle0'});

              images = [];
              const items = await newPage.$$('a.Channels__channelPreview--16gYL');
              // const image = await newPage.$$('div.ChannelPreview__hostsAvatars--3Lt_o');
              
              
                 for(let element of items){
                   

                      // for (let i = 0; i < image.length; i++) { 
                  // console.log(element)
                        // let url = await element.$eval(href);
                          const handle = await element.$('selector');
                          const url = await element.evaluate(anchor => anchor.getAttribute('href'), handle);
                          const name = await element.$eval('.ChannelPreview__name--3BXVF',node4 => node4.innerText.trim());
                        
                          const users = await element.$eval('.ChannelPreview__users--2YJjN',node3 => node3.innerText.trim());
                          const comment = await element.$eval('div',node => node.innerText.trim());
                         
                            // console.log(comment)
                            // console.log(users)
                   const img1 = await element.$eval('img',image => image.src);

                // const issueSrcs = await element.$eval('img',imgs => {
                // const srcs =  Array.from("img").map(
                //   (image) => image.src);
                // // images.push(srcs)
                // console.log(srcs)
                //   return srcs;
                //   images.push(srcs)
                // }); 
                // console.log(issueSrcs)


        // var img1 =  await element.$eval('img',node1 => node1.src);                             
                         
                         // var img2 =  await element.$eval('.ChannelPreview__hostAvatar--PsdaI',node2 => node2.src);                             
                          
                          // let url = await element.$eval(a => a.getProperty('href'));
                          // Rooms.deleteMany({local:1}).then(async(err,result)=>{
                          //   if(top){
                          //       top.users = users;
                          //       top.save();
                          //   }else{

                               const rooms = new RussiaRooms({
                                url:url,
                                name:name,
                                users:users,
                                comment:comment,
                                img1:img1,
                                // img2:img2,

                                 });
                               // console.log(rooms)
                               await rooms.save();
                           
                          //   }
                          // })
                          }
                         }
                            
                              
                        browser.close();
                          await RussiaRooms.find({},function(err,topss){//.sort('-createdAt')
                          console.log(topss)
                                     res.render('home/russia-rooms',{
                                      topss:topss,
                                     })
                                  })
                        
                        // return resolve(top);
                   }catch(e){
                      return reject(e);
                   }
               });
  }
run6()


 },

  // -----------------------------------------------------------------------------------------

RussiaRoomId:async function(req,res){

    function run7() {
   return new Promise(async (resolve, reject) => {
        try {
            // var allDelete = await RoomId.deleteMany({local:1})
              
            // const newPage = await browser.newPage();
            // await newPage.setDefaultNavigationTimeout(0);
            // await newPage.goto("https://clubhouseranking.net/rooms",{waitUntil: 'networkidle0'});
              // let results = [];
              var asss = await RussiaRooms.findOne({_id:req.params.id},async function(err,roomid){
                  
            const browser = await puppeteer.launch({headless: true}); // slow down by 250ms
            // var allDelete = await RoomId.deleteMany({local:1})

              const newPage = await browser.newPage();
            await newPage.setDefaultNavigationTimeout(0);
           var page =  await newPage.goto(`https://clubhouseranking.net${roomid.url}`);

              const items = await newPage.$$('a.Channel__user--fJO2j');  
              console.log(items)
              // var allDelete = await RoomId.deleteMany({local:1})
                 for(let element of items){
                     // console.log(element)
                        // let url = await element.$eval(href);
                          const handle = await element.$('selector');
                          const url = await element.evaluate(anchor => anchor.getAttribute('href'), handle);
                          const name = await element.$eval('.Channel__user_name--1LlOZ',node4 => node4.innerText.trim());
                          const img = await element.$eval('img',node1 => node1.src);
                          const username = await element.$eval('.Channel__user_username--3dFzu',node3 => node3.innerText.trim());
                           // console.log(url)
                           // console.log(name)
                           // console.log(img)
                           // console.log(username)
                          // let url = await element.$eval(a => a.getProperty('href'));
                          RussiaRoomsId.findOne({name:name},async function(err,top){
                            if(top){
                               // res.redirect(`/rooms/${req.params.id}`)
                            }else{
                               let roomId = new RussiaRoomsId({
                                room:req.params.id,
                                url:url,
                                name:name,
                                username:username,
                                img1:img,
                                 });
                               console.log(roomId)
                              await roomId.save();
                               if(name.length == 100){
                                await RussiaRoomsId.find({room:req.params.id},async function(err,top){
                          // await Rooms.findOne({_id:req.params.id},function(roomId){

                          console.log(top)
                                     return res.render('home/russia-room-groups',{
                                      top:top,
                                      // roomId:roomId
                                   })
                                // })
                              })    
                            }
                            }
                          })
                         
                          
                     }
                      
                        await RussiaRoomsId.find({room:req.params.id},async function(err,top){
                          // await Rooms.findOne({_id:req.params.id},function(roomId){
                          console.log(top)
                                     res.render('home/russia-room-groups',{
                                      top:top,
                                      // roomId:roomId
                                   })
                                // })
                              })
                        browser.close();

                      })

                        
                         
                                  
                       
                        
                                  
                        
                  
                       // return resolve(urls);
                   }catch(e){
                      return reject(e);
                   }
               });
  }
run7()
},

// ---------------------------------------------------------------------------------------------
 RussiaRoomUserDetail:async function(req,res){
   console.log(req.params.id)
    function run8 () {
   return new Promise(async (resolve, reject) => {
        try {
           // let RoomId = require("../../models/roomsId");
            // const browser = await puppeteer.launch({headless: true});// slowMo: 250, // slow down by 250ms
               RussiaRoomsId.findOne({_id:req.params.id},async function(err,roomid){  
                // if(roomid){
                  // console.log(roomid)
            const browser = await puppeteer.launch({headless: true,slowMo: 250}); // slow down by 250ms
            // var allDelete = await RoomId.deleteMany({local:1})
              const newPage = await browser.newPage();
            await newPage.setDefaultNavigationTimeout(0);
           var page =  await newPage.goto(`https://clubhouseranking.net${roomid.url}`,{waitUntil: 'networkidle0'});
                    // const href = await page.$eval(".User__section--1GRwE.User__bio--1QL3V", (elm) => elm.textContent);
                    // console.log(href)
                     // const text = await (await element.getProperty('User__bio--1QL3V')).jsonValue(); 
                     // console.log(text)  

                           const items = await newPage.$$('.User__root--2Jpeo');
                           console.log(items)
                           for(let element of items){
                          const userDetail = await element.$eval('.User__bio--1QL3V',node3 => node3.innerText.trim());
                  const followers = await element.$eval('.UserPreview__followers--155pp',node4 => node4.innerText.trim());
                  const img = await element.$eval('img',node1 => node1.src);
                  const name = await element.$eval('.UserPreview__name--32-ta',node6 => node6.innerText.trim());
                  const username = await element.$eval('.UserPreview__username--2tKrj',node5 => node5.innerText.trim());
                          console.log(followers)
                          console.log(img)
                          console.log(name)
                          console.log(username)
                                                  
                           // const getDimensions = await page.evaluate(() => {
                           //    return {
                           //      width: document.documentElement.clientWidth,
                           //      height: document.documentElement.clientHeight
                           //    };
                           //  });
  
                         // await RoomUserDetail.findOne({userDetail:userDetail},async function(err,top){
                         //    if(top){
                         //       res.redirect(`/users-detail/${req.params.id}`)
                         //    }else{

                               let roomUserDetail = new RussiaRoomUserDetail({
                                   userId:req.params.id,
                                   userDetail:userDetail,
                                   followers:followers,
                                   img1:img,
                                   name:name,
                                   username:username,
                                 });

                              console.log(roomUserDetail)
                              await roomUserDetail.save();

                          //   }
                          // })
                           }

                            RussiaRoomUserDetail.findOne({userId:req.params.id})
                        .populate({ 
                          path : 'userId',
                          model : 'RussiaRoomUserDetail'})
                        .then((tops)=>{
                           console.log(tops)
                         
                          // console.log(roomId)
                                     res.render('home/RussiaUserDetails',{
                                      tops:tops,
                                      // roomId:roomId
                                   
                                })
                              }) 

                               browser.close();


                       // }
                     // }else{
                     //   // res.redirect('/rooms')
                     //   console.log('Error')
                     // }

                      })
                        
                     // return resolve(urls);
                   }catch(e){
                      return reject(e);
                   }
               });
  }
run8()
 },

 // -=-=-=-=-=-=-=-==-=-=-=--===--=-=-=-=-=-=-=-=-=-------==-===-=-==-=-==-=-==-=-=-=

Events:async function(req,res){
 function run9 () {
   return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({headless: true,
  // slowMo: 250, // slow down by 250ms
   });
                var allDelete = await Events.deleteMany({local:1 || ""});
                if(allDelete){

            const newPage = await browser.newPage({headless: true});
            await newPage.setDefaultNavigationTimeout(0);
            await newPage.goto("https://clubhouseranking.net/events",{waitUntil: 'networkidle0'});

              images = [];
              const items = await newPage.$$('a.Events__eventPreview--1lVsw');
              // const image = await newPage.$$('div.ChannelPreview__hostsAvatars--3Lt_o');
              
              
                 for(let element of items){
                      // for (let i = 0; i < image.length; i++) { 
                  // console.log(element)
                        // let url = await element.$eval(href);
                          const handle = await element.$('selector');
                          const url = await element.evaluate(anchor => anchor.getAttribute('href'), handle);
                          const name = await element.$eval('.EventPreview__name--3fJES',node4 => node4.innerText.trim());
                        
                          const users = await element.$eval('.EventPreview__hostName--3Z9nQ',node3 => node3.innerText.trim());
                          const time = await element.$eval('.EventPreview__time--RaNih',node => node.innerText.trim());
                          const bio = await element.$eval('.EventPreview__description--3pD0_',node => node.innerText.trim());
                         
                            // console.log(comment)
                            // console.log(users)
                   const img1 = await element.$eval('img',image => image.src);

                // const issueSrcs = await element.$eval('img',imgs => {
                // const srcs =  Array.from("img").map(
                //   (image) => image.src);
                // // images.push(srcs)
                // console.log(srcs)
                //   return srcs;
                //   images.push(srcs)
                // }); 
                // console.log(issueSrcs)


        // var img1 =  await element.$eval('img',node1 => node1.src);                             
                         
                         // var img2 =  await element.$eval('.ChannelPreview__hostAvatar--PsdaI',node2 => node2.src);                             
                          
                          // let url = await element.$eval(a => a.getProperty('href'));
                          // Rooms.deleteMany({local:1}).then(async(err,result)=>{
                          //   if(top){
                          //       top.users = users;
                          //       top.save();
                          //   }else{

                               const rooms = new Events({
                                url:url,
                                name:name,
                                users:users,
                                bio:bio,
                                time:time,
                                img1:img1,
                                // img2:img2,

                                 });
                               console.log(rooms)
                               await rooms.save();
                           
                          //   }
                          // })
                          }
                                                     

                       }else{
                          
            const newPage = await browser.newPage({headless: true});
            await newPage.setDefaultNavigationTimeout(0);
            await newPage.goto("https://clubhouseranking.net/events",{waitUntil: 'networkidle0'});

              images = [];
              const items = await newPage.$$('a.Events__eventPreview--1lVsw');
              // const image = await newPage.$$('div.ChannelPreview__hostsAvatars--3Lt_o');
              
              
                 for(let element of items){
                      // for (let i = 0; i < image.length; i++) { 
                  // console.log(element)
                        // let url = await element.$eval(href);
                          const handle = await element.$('selector');
                          const url = await element.evaluate(anchor => anchor.getAttribute('href'), handle);
                          const name = await element.$eval('.EventPreview__name--3fJES',node4 => node4.innerText.trim());
                        
                          const users = await element.$eval('.EventPreview__hostName--3Z9nQ',node3 => node3.innerText.trim());
                          const time = await element.$eval('.EventPreview__time--RaNih',node => node.innerText.trim());
                          const bio = await element.$eval('.EventPreview__description--3pD0_',node => node.innerText.trim());
                         
                            // console.log(comment)
                            // console.log(users)
                   const img1 = await element.$eval('img',image => image.src);

                // const issueSrcs = await element.$eval('img',imgs => {
                // const srcs =  Array.from("img").map(
                //   (image) => image.src);
                // // images.push(srcs)
                // console.log(srcs)
                //   return srcs;
                //   images.push(srcs)
                // }); 
                // console.log(issueSrcs)


        // var img1 =  await element.$eval('img',node1 => node1.src);                             
                         
                         // var img2 =  await element.$eval('.ChannelPreview__hostAvatar--PsdaI',node2 => node2.src);                             
                          
                          // let url = await element.$eval(a => a.getProperty('href'));
                          // Rooms.deleteMany({local:1}).then(async(err,result)=>{
                          //   if(top){
                          //       top.users = users;
                          //       top.save();
                          //   }else{

                               const rooms = new Events({
                                url:url,
                                name:name,
                                users:users,
                                 bio:bio,
                                time:time,
                                img1:img1,
                                // img2:img2,

                                 });
                               console.log(rooms)
                               await rooms.save();
                           
                          //   }
                          // })
                          }

         
                         }
                            
                              
                        browser.close();
                          await Events.find({},function(err,topss){//.sort('-createdAt')
                          console.log(topss)
                                     res.render('home/events',{
                                      topss:topss,
                                     })
                                  })
                        
                        // return resolve(top);
                   }catch(e){
                      return reject(e);
                   }
               });
  }
run9()

 },

 EventUserDetails:async function(req,res){
    Events.findOne({_id:req.params.id},function(err,tops){
       res.render('home/eventUserDetails',{
        tops:tops
       })
    })
 },
 EventOverUserDetails:async function(req,res){
  // console.log(req.body.id)
    Events.findOne({_id:req.params.id},function(err,tops){
       res.render('home/eventOverUserDetails',{
        tops:tops
       })
    })
 },

 // ------------------------------- Event Russia-------------------------------------------------

EventsRussia:async function(req,res){
 function run10 () {
   return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({headless: true,
  // slowMo: 250, // slow down by 250ms
   });
                var allDelete = await EventsRussia.deleteMany({local:1 || ""});
                if(allDelete){

            const newPage = await browser.newPage({headless: true});
            await newPage.setDefaultNavigationTimeout(0);
            await newPage.goto("https://clubhouseranking.net/events?country_code=ru&page=1",{waitUntil: 'networkidle0'});

              images = [];
              const items = await newPage.$$('a.Events__eventPreview--1lVsw');
              // const image = await newPage.$$('div.ChannelPreview__hostsAvatars--3Lt_o');
              
              
                 for(let element of items){
                      // for (let i = 0; i < image.length; i++) { 
                  // console.log(element)
                        // let url = await element.$eval(href);
                          const handle = await element.$('selector');
                          const url = await element.evaluate(anchor => anchor.getAttribute('href'), handle);
                          const name = await element.$eval('.EventPreview__name--3fJES',node4 => node4.innerText.trim());
                        
                          const users = await element.$eval('.EventPreview__hostName--3Z9nQ',node3 => node3.innerText.trim());
                          const time = await element.$eval('.EventPreview__time--RaNih',node => node.innerText.trim());
                          const bio = await element.$eval('.EventPreview__description--3pD0_',node => node.innerText.trim());
                         
                            // console.log(comment)
                            // console.log(users)
                   const img1 = await element.$eval('img',image => image.src);

                // const issueSrcs = await element.$eval('img',imgs => {
                // const srcs =  Array.from("img").map(
                //   (image) => image.src);
                // // images.push(srcs)
                // console.log(srcs)
                //   return srcs;
                //   images.push(srcs)
                // }); 
                // console.log(issueSrcs)


        // var img1 =  await element.$eval('img',node1 => node1.src);                             
                         
                         // var img2 =  await element.$eval('.ChannelPreview__hostAvatar--PsdaI',node2 => node2.src);                             
                          
                          // let url = await element.$eval(a => a.getProperty('href'));
                          // Rooms.deleteMany({local:1}).then(async(err,result)=>{
                          //   if(top){
                          //       top.users = users;
                          //       top.save();
                          //   }else{

                               const rooms = new EventsRussia({
                                url:url,
                                name:name,
                                users:users,
                                bio:bio,
                                time:time,
                                img1:img1,
                                // img2:img2,

                                 });
                               console.log(rooms)
                               await rooms.save();
                           
                          //   }
                          // })
                          }
                                                     

                       }else{
                          
                             const newPage = await browser.newPage({headless: true});
            await newPage.setDefaultNavigationTimeout(0);
            await newPage.goto("https://clubhouseranking.net/events?country_code=ru&page=1",{waitUntil: 'networkidle0'});

              images = [];
              const items = await newPage.$$('a.Events__eventPreview--1lVsw');
              // const image = await newPage.$$('div.ChannelPreview__hostsAvatars--3Lt_o');
              
              
                 for(let element of items){
                      // for (let i = 0; i < image.length; i++) { 
                  // console.log(element)
                        // let url = await element.$eval(href);
                          const handle = await element.$('selector');
                          const url = await element.evaluate(anchor => anchor.getAttribute('href'), handle);
                          const name = await element.$eval('.EventPreview__name--3fJES',node4 => node4.innerText.trim());
                        
                          const users = await element.$eval('.EventPreview__hostName--3Z9nQ',node3 => node3.innerText.trim());
                          const time = await element.$eval('.EventPreview__time--RaNih',node => node.innerText.trim());
                          const bio = await element.$eval('.EventPreview__description--3pD0_',node => node.innerText.trim());
                         
                            // console.log(comment)
                            // console.log(users)
                   const img1 = await element.$eval('img',image => image.src);

                // const issueSrcs = await element.$eval('img',imgs => {
                // const srcs =  Array.from("img").map(
                //   (image) => image.src);
                // // images.push(srcs)
                // console.log(srcs)
                //   return srcs;
                //   images.push(srcs)
                // }); 
                // console.log(issueSrcs)


        // var img1 =  await element.$eval('img',node1 => node1.src);                             
                         
                         // var img2 =  await element.$eval('.ChannelPreview__hostAvatar--PsdaI',node2 => node2.src);                             
                          
                          // let url = await element.$eval(a => a.getProperty('href'));
                          // Rooms.deleteMany({local:1}).then(async(err,result)=>{
                          //   if(top){
                          //       top.users = users;
                          //       top.save();
                          //   }else{

                               const rooms = new EventsRussia({
                                url:url,
                                name:name,
                                users:users,
                                bio:bio,
                                time:time,
                                img1:img1,
                                // img2:img2,

                                 });
                               console.log(rooms)
                               await rooms.save();
                           
                          //   }
                          // })
                          }

         
                         }
                            
                              
                        browser.close();
                          await EventsRussia.find({},function(err,topss){//.sort('-createdAt')
                          console.log(topss)
                                     res.render('home/eventRussia',{
                                      topss:topss,
                                     })
                                  })
                        
                        // return resolve(top);
                   }catch(e){
                      return reject(e);
                   }
               });
  }
run10()

 },

 EventRussiaUserDetails:async function(req,res){
    EventsRussia.findOne({_id:req.params.id},function(err,tops){
       res.render('home/eventRussiaUserDetails',{
        tops:tops
       })
    })
 },
 EventRussiaOverUserDetails:async function(req,res){
  // console.log(req.body.id)
    EventsRussia.findOne({_id:req.params.id},function(err,tops){
       res.render('home/eventRussiaOverUserDetails',{
        tops:tops
       })
    })
 },

 // -------------------------------------------------------------------------------
PostTop250Italy:async function(req,res){
 function run11 () {
   return new Promise(async (resolve, reject) => {
        try {
           // let TopRussia = require("../../models/top-russia");
           // var allDelete = await TopItaly.deleteMany({local:1 || ""});
            const browser = await puppeteer.launch({headless: true,});
            const newPage = await browser.newPage();
            await newPage.setDefaultNavigationTimeout(0);
            await newPage.goto("https://starngage.com/app/global/influencer/search?sort_by=followers&followers=0%2C1M%2B&user_engagement_rate=0&avg_post_engagement=0&country=it&audience_country=&gender=&topic=Film%2C+Music+%26+Books&instagram_username=&hashtag=&keywords=");


              let results = [];
                let items = await newPage.$$('.influencer');
                  console.log(items)
                 for(let element of items){
                        // let username = await element.$eval('.UserPreview__username--2tKrj',node5 => node5.innerText.trim());
                        
                          // let url = await element.$eval(href);
                          // const handle = await element.$('selector');
                          // const url = await element.evaluate(anchor => anchor.getAttribute('href'), handle);
                          // let rate = await element.$eval('data-v-1565792a',node2 => node2.innerText.trim());
                          let name = await element.$eval('.font-we',node4 => node4.innerText.trim());
                          // let title = await element.$eval('.contributor__title',node4 => node4.innerText.trim());
                          let img = await element.$eval('img',node1 => node1.src);
                          let followers = await element.$eval('.text-dark',node3 => node3.innerText.trim());
                          // let bio = await element.$eval('.UserPreview__bio--3bHn0',node => node.innerText.trim());
                           // console.log(rate)
          
                          // let url = await element.$eval(a => a.getProperty('href'));
                          TopItaly.findOne({name:name},async function(err,top){
                            if(top){
                                top.followers = followers;
                                top.save();
                            }else{
                            var oldStr = name;
                            var newStr = oldStr.substring(1); //remove first character "ello"
                               let topItaly = new TopItaly({
                                name:newStr,
                                img:img,
                                followers:followers,
                                
                                 });
                               

                               console.log(topItaly)
                              await topItaly.save();
                            }
                          })

                          
                       }
                        
                        browser.close();
                                res.redirect('/top-italy')
                                  //  TopItaly.find({},function(err,top){
                                  //    res.render('home/top-italy',{
                                  //     top:top
                                  //    })
                                  // })
                              
                        
                       // return resolve(urls);
                   }catch(e){
                      return reject(e);
                   }
               });
  }
run11()

 },

  // ---------------------------------------------------------------------------------------------
 ItalyUserDetails:async function(req,res){
    console.log(req.params.name)
    function run12 () {
   return new Promise(async (resolve, reject) => {
        try {

           // let RoomId = require("../../models/roomsId");
            // const browser = await puppeteer.launch({headless: true});// slowMo: 250, // slow down by 250ms


               TopItaly.findOne({name:req.params.name},async function(err,roomid){

                // if(roomid){
                  // console.log(roomid.img)
            const browser = await puppeteer.launch({headless: true}); // slow down by 250ms

            // var allDelete = await RoomId.deleteMany({local:1})

              const newPage = await browser.newPage();
            await newPage.setDefaultNavigationTimeout(0);
           var page =  await newPage.goto(`https://starngage.com/app/global/influencers/${roomid.name}`,{waitUntil: 'networkidle0'});
                    // const href = await page.$eval(".User__section--1GRwE.User__bio--1QL3V", (elm) => elm.textContent);
                    // console.log(href)
                     // const text = await (await element.getProperty('User__bio--1QL3V')).jsonValue(); 
                     // console.log(text)  

                           const items = await newPage.$$('.summary');
                           // console.log(items)
                           for(let element of items){
                  const followers = await element.$eval('.h3 ',node4 => node4.innerText.trim());
                          // console.log(img)
                          // console.log(userDetail)
                                                  
                           // const getDimensions = await page.evaluate(() => {
                           //    return {
                           //      width: document.documentElement.clientWidth,
                           //      height: document.documentElement.clientHeight
                           //    };
                           //  });
  
                         // await RoomUserDetail.findOne({userDetail:userDetail},async function(err,top){
                         //    if(top){
                         //       res.redirect(`/users-detail/${req.params.id}`)
                         //    }else{

                               let topItalyUser = new ItalyUserDetail({
                                   name:req.params.name,
                                   // userDetail:userDetail,
                                   followers:followers,
                                   img1:roomid.img
                                 });
                              
                              console.log(topItalyUser)
                              await topItalyUser.save();

                          //   }
                          // })
                           }

                            ItalyUserDetail.findOne({name:req.params.name})
                        .then((top)=>{
                           console.log(top)
                         
                          // console.log(roomId)
                                     res.render('home/italyUserDetails',{
                                      top:top,
                                      // roomId:roomId
                                   
                                })
                              }) 

                               browser.close();


                       // }
                     // }else{
                     //   // res.redirect('/rooms')
                     //   console.log('Error')
                     // }

                      })
                        
                         
                     
                           
                      
                                  
                        
                  
                       // return resolve(urls);
                   }catch(e){
                      return reject(e);
                   }
               });
  }
run12()
 },





}














































