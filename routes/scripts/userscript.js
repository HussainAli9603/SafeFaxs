var request = require('request-promise');
var path = require('path');
var fs      = require('fs');
var cheerio = require('cheerio');
let TopWorld = require("../../models/top-world");
let TopRussia = require("../../models/top-russia");
let Rooms = require("../../models/rooms");
let RussiaRooms = require("../../models/Russiarooms");
let RoomId = require("../../models/roomId");
let RoomUserDetail = require("../../models/room-user-detail");
let mkdir = require('mkdir');
// let User = require("../../models/user");
let connection = require('../../config/database');
// let bcrypt = require('bcryptjs');
let axios = require("axios");
let async = require('async');
const puppeteer = require('puppeteer');
const headless = process.argv[2] === "headless";

const minimal_args = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
];

module.exports = {
  PostTopWorlds:async function(req,res){
 function run () {
   return new Promise(async (resolve, reject) => {
        try {
           let TopWorld = require("../../models/top-world");
            const browser = await puppeteer.launch({ headless: headless,timeout: 90000,ignoreDefaultArgs: ['--disable-extensions'], 
              args:minimal_args
             });
            const newPage = await browser.newPage();
            await newPage.setDefaultNavigationTimeout(0);
            await newPage.waitFor(5000);
            await newPage.goto("https://clubhouseranking.net/top-world");

              let results = [];
                let items = await newPage.$$('a.RankingTopWorld__userPreview--1CGVV');
                //8/onsole.log(items)
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
                            if(top){
                                top.followers = followers;
                                top.save();
                            }else{
                              //  let topWorld = new TopWorld({
                              //   username:username,
                              //   url:url,
                              //   rate:rate,
                              //   name:name,
                              //   img:img,
                              //   followers:followers,
                              //   bio:bio,
                              //    });
                              // await topWorld.save();
                            }
                          })

                          // await element.waitFor(5000);
                       }
                        
                        browser.close();
                               
                                   TopWorld.find({},function(err,top){
                                     res.render('home/top-world',{
                                      top:top
                                     })
                                  })
                              
                        
                       // return resolve(urls);
                   }catch(e){
                      return reject(e);
                   }
               });
  }
run()
// .then(result=>{
//                      TopWorld.find({}).limit(50).skip(50).sort('-createdAt')
//                             .exec(function(err,top) {
//                                  // return res.render('home/top-world',{
//                                  //   top:top
//                              // });
                              
//                             });
// });


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
           let TopRussia = require("../../models/top-russia");
            const browser = await puppeteer.launch();
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
                               let topRussia = new TopRussia({
                                username:username,
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
                               
                                   TopRussia.find({},function(err,top){
                                     res.render('home/top-russia',{
                                      top:top
                                     })
                                  })
                              
                        
                       // return resolve(urls);
                   }catch(e){
                      return reject(e);
                   }
               });
  }
run2()
// .then(result=>{
//                      TopWorld.find({}).limit(50).skip(50).sort('-createdAt')
//                             .exec(function(err,top) {
//                                  // return res.render('home/top-world',{
//                                  //   top:top
//                              // });
                              
//                             });
// });


 },

 //  RussiaUserDetails:async function(req,res){
 //     TopRussia.findOne({username:req.params.username},function(err,tops){
 //       res.render('home/RussiaUserDetails',{
 //          tops:tops
 //       });

 //     })
 // },


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
// .then(result=>{
     
//                                Rooms.find({},function(err,topss){//.sort('-createdAt')
//                           console.log(topss)
//                                      res.render('home/rooms',{
//                                       topss:topss,
//                                      })
//                                   })              
// });


 },

 // -----------------------------------------------------------------------------------------

RoomId:async function(req,res){

    function run4() {
   return new Promise(async (resolve, reject) => {
        try {

           // let RoomId = require("../../models/roomsId");
            const browser = await puppeteer.launch({headless: true,
  // slowMo: 250, // slow down by 250ms
  });
            // const newPage = await browser.newPage();
            // await newPage.setDefaultNavigationTimeout(0);
            // await newPage.goto("https://clubhouseranking.net/rooms",{waitUntil: 'networkidle0'});

              // let results = [];
               await Rooms.findOne({_id:req.params.id},async function(err,roomid){

               
                // if(roomid){
                  // console.log(roomid)
            const browser = await puppeteer.launch({headless: true, // slow down by 250ms
  });
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
                               res.redirect(`/rooms/${req.params.id}`)
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
                            

                       }
                     // }else{
                     //   // res.redirect('/rooms')
                     //   console.log('Error')
                     // }

                      })

                        
                         
                             await RoomId.find({room:req.params.id},async function(err,top){
                          // await Rooms.findOne({_id:req.params.id},function(roomId){
                          console.log(top)
                                     res.render('home/room-groups',{
                                      top:top,
                                      // roomId:roomId
                                   })
                                // })
                              })      
                        browser.close();
                       
                        
                                  
                        
                  
                       // return resolve(urls);
                   }catch(e){
                      return reject(e);
                   }
               });
  }
// setInterval(run4,20000)
run4();
// setTimeout
// .then(result=>{
//                      RoomId.find({})
//                             .exec(function(err,top) {
//                                  return res.render('home/room-groups',{
//                                    top:top
//                              });
                              
//                             });
// });


 },


 // ---------------------------------------------------------------------------------------------
 RoomUserDetail:async function(req,res){
   console.log(req.params.id)
    function run5 () {
   return new Promise(async (resolve, reject) => {
        try {

           // let RoomId = require("../../models/roomsId");
            const browser = await puppeteer.launch({headless: true,
  // slowMo: 250, // slow down by 250ms
});

               RoomId.findOne({_id:req.params.id},async function(err,roomid){

               
                // if(roomid){
                  // console.log(roomid)
            const browser = await puppeteer.launch({headless: true,slowMo: 250, // slow down by 250ms
});
            // var allDelete = await RoomId.deleteMany({local:1})

              const newPage = await browser.newPage();
            await newPage.setDefaultNavigationTimeout(0);
           var page =  await newPage.goto(`https://clubhouseranking.net${roomid.url}`,{waitUntil: 'networkidle0'});
                           const items = await newPage.$$('.User__root--2Jpeo');
                           console.log(items)
                           for(let element of items){
                          const userDetail = await element.$eval('.User__bio--1QL3V',node3 => node3.innerText.trim());
                          console.log(userDetail)
  
                         // await RoomUserDetail.findOne({userDetail:userDetail},async function(err,top){
                         //    if(top){
                         //       res.redirect(`/users-detail/${req.params.id}`)
                         //    }else{

                               let roomUserDetail = new RoomUserDetail({
                                   userId:req.params.id,
                                   userDetail:userDetail,
                                 });

                              console.log(roomUserDetail)
                              await roomUserDetail.save();

                          //   }
                          // })
                           }

                            

                       // }
                     // }else{
                     //   // res.redirect('/rooms')
                     //   console.log('Error')
                     // }

                      })
                        
                         
                        browser.close();
                           
                        //       RoomUserDetail.findOne({userId:req.params.id})
                        // .populate({ 
                        //   path : 'userId',
                        //   model : 'RoomId'})
                        // .then((err,top)=>{
                        //    console.log(top)
                         
                        //   // console.log(roomId)
                        //              res.render('home/roomUserDetails',{
                        //               top:top,
                        //               // roomId:roomId
                                   
                        //         })
                        //       }) 
                                  
                        
                  
                       // return resolve(urls);
                   }catch(e){
                      return reject(e);
                   }
               });
  }
run5()
// .then(result=>{
                   // RoomUserDetail.findOne({userId:req.params.id})
                   //      .populate({ 
                   //        path : 'userId',
                   //        model : 'RoomId'})
                   //      .then((err,top)=>{
                         
                   //        // console.log(roomId)
                   //                   res.render('home/roomUserDetails',{
                   //                    top:top,
                   //                    // roomId:roomId
                                   
                   //              })
                   //            }) 
// });


 },

  // -=-=-=-=-=-=-=-==-=-=-=--===--=-=-=-=-=-=-=-=-=-------==-===-=-==-=-==-=-==-=-=-=

RussiaRooms:async function(req,res){
 function run6 () {
   return new Promise(async (resolve, reject) => {
        try {
           let RussiaRooms = require("../../models/russiaRooms");
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
// .then(result=>{
     
//                                Rooms.find({},function(err,topss){//.sort('-createdAt')
//                           console.log(topss)
//                                      res.render('home/rooms',{
//                                       topss:topss,
//                                      })
//                                   })              
// });


 },

  // -----------------------------------------------------------------------------------------

RussiaRoomId:async function(req,res){

    function run7() {
   return new Promise(async (resolve, reject) => {
        try {

           // let RoomId = require("../../models/roomsId");
            const browser = await puppeteer.launch({headless: true,
  // slowMo: 250, // slow down by 250ms
  });

            // const newPage = await browser.newPage();
            // await newPage.setDefaultNavigationTimeout(0);
            // await newPage.goto("https://clubhouseranking.net/rooms",{waitUntil: 'networkidle0'});

              // let results = [];
              var asss = await RussiaRooms.findOne({_id:req.params.id},async function(err,roomid){

               
                if(roomid){
                  // console.log(roomid)
            const browser = await puppeteer.launch({headless: true, // slow down by 250ms
  });
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
                               res.redirect(`/rooms/${req.params.id}`)
                            }else{
                               let roomId = new RussiaRooms({
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
                            

                       }
                     }else{
                       // res.redirect('/rooms')
                       console.log('Error')
                     }

                      })

                        
                         
                                  
                        browser.close();
                        await RussiaRoomsId.find({room:req.params.id},async function(err,top){
                          // await Rooms.findOne({_id:req.params.id},function(roomId){
                          console.log(top)
                                     res.render('home/room-groups',{
                                      top:top,
                                      // roomId:roomId
                                   })
                                // })
                              })
                        
                                  
                        
                  
                       // return resolve(urls);
                   }catch(e){
                      return reject(e);
                   }
               });
  }
setInterval(run4,20000)
// setTimeout
// .then(result=>{
//                      RoomId.find({})
//                             .exec(function(err,top) {
//                                  return res.render('home/room-groups',{
//                                    top:top
//                              });
                              
//                             });
// });

},


}















































// }
// var request = require('request-promise');
// var path = require('path');
// var fs      = require('fs');
// var cheerio = require('cheerio');
// run().then(console.log).catch(console.error);
// let {TopWorld} = require("../../models/top-world");
// let mkdir = require('mkdir');
// let User = require("../../models/user");
// let connection = require('../../config/database');
// let bcrypt = require('bcryptjs');
// let axios = require("axios");
// let async = require('async');
// const puppeteer = require('puppeteer');
// // });
// // })();
// // }
// // var request = require('request-promise');
// // var request = require('request');
// // var request = require("request");
// // request(url,(err,response,html)=>{
// // let options = {
// // let fs = require('fs');
// // const response = await request({
// // const cheerioReq = require("cheerio-req");
// // cheerioReq("https://clubhouseranking.net/top-world", (err, $) => {
// // (async () => {
// //  await page.setDefaultNavigationTimeout(0);
// //   };
// //   }
// //   url: url,
// //   dataObj({
// //   bio: bio,
// //   async function dataObj(data){
// //    }
// //    var data = [];
// //    if(!err){
// //     },async function(error,response,body){
// //     },
// //     var topWorld = new TopWorld();
// //     var result = {};
// //     var $ = cheerio.load(html)
// //     uri:url,
// //     topWorld.save();
// //     topWorld.name = name;
// //     timeToLive: 60 * 60 * 24
// //     textsArray.forEach((textsArray, i) => 
// //     request("https://clubhouseranking.net/top-world",{
// //     priority: 'high',
// //     let name = $('div[class="UserPreview__right--32mC7 UserPreview__names--YTcon UserPreview__name--32-ta"]').text().trim();
// //     headers:{
// //     gzip:true,
// //     gzip:true
// //     const WinArray = await page.evaluate(
// //     const textsArray = await page.evaluate(
// //     const page = await browser.newPage();
// //     const browser = await puppeteer.launch();
// //     console.log(result);
// //     console.log(name)
// //     console.log(data)
// //     console.log('Data SuccessFull');
// //     await TopWorld.find({},function(err,result){
// //     await page.goto('https://scrapethissite.com/pages/forms/');
// //     await browser.close();
// //     );
// //      }).then(result=>{
// //      })
// //      var image = $('.UserPreview__root--2Z3e2 UserPreview__user--1Rf6d .UserPreview__left--2ydwK img').attr("src");
// //      console.log(image)
// //      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
// //       var $ = cheerio.load(body);
// //       if(error) console.log(error);
// //       console.log(result)
// //       "Accept-Language": "en-US,en;q=0.9",
// //       "Accept-Encoding": "gzip, deflate, br",
// //        var $ = cheerioReq.load(response);
// //        headers:{
// //        // var $ = cheerio.load(response,null, false);
// //        // console.log($)
// //         });
// //         return result;
// //         result[textsArray] = WinArray[i]);
// //         // }
// //         // if(result == ""){
// //         //   return topWorld.save();
// //         //   const topWorld = new TopWorld(dataObj);
// //         () => [...document.querySelectorAll(
// //          })
// //          var username =await $(' .UserPreview__username--2tKrj ').text();
// //          var username = $('.UserPreview__username--2tKrj > a').attr("href");
// //          var urls =await $('a > .RankingTopWorld__userPreview--1CGVV').attr("href");
// //          var rate = await $('.UserPreview__rate--1i6_h').text().trim();
// //          var name =await $(' .UserPreview__name--32-ta ').eq(4).text();
// //          var followers =await $('.UserPreview__followers--155pp  ').text();
// //          var bio =await $(' .UserPreview__bio--3bHn0 ').text();
// //          data.push({
// //          console.log(data)
// //          // });
// //          // var urls = $('.RankingTopWorld__userPreview--1CGVV').attr("href");
// //          // var rate = $('.UserPreview__rate--1i6_h').text();
// //          // var name = $('.UserPreview__name--32-ta ').text().trim();
// //          // var img = $('.UserPreview__left--2ydwK > img').attr('src');
// //          // var followers = $('.UserPreview__followers--155pp  ').text();
// //          // var bio = $('.UserPreview__bio--3bHn0 ').text().trim();
// //          // res.render('top_university/top_univ_bolochi');
// //          // Bolochi.findOne({title:title},function(err,bolochi){
// //          //   }
// //          //   {
// //          //   if(bolochi){
// //          //   else
// //          //     });
// //          //     var bolochi = new Bolochi({
// //          //     console.log(bolochi);
// //          //     bolochi.save();
// //          //      //res.render()
// //          //       url:url,
// //          //       town:town
// //          //       title:title,
// //           var urlss = $(this).find(" .UserPreview__followers--155pp ").text();
// //           var img = await $('img').attr("src");
// //           $('a').each(async function(index){ 
// //            var titles = $(this).find(".UserPreview__bio--3bHn0").text();
// //            var images = $(this).find('.UserPreview__user--1Rf6d > .UserPreview__left--2ydwK > img ').attr("src");
// //            console.log(rate)
// //            console.log(img)
// //            console.log(bio)
// //             console.log(index)
// //             .map(elem => elem.innerText)
// //             '#hockey > div > table > tbody > tr > td.wins')]
// //             '#hockey > div > table > tbody > tr > td.name')]
// //              username:username,
// //              // urls:urls,
// //              // rate:rate,
// //              // name:name,
// //              // img:img,
// //              // followers:followers,
// //              // bio:bio,
//  }
//  module.exports = {
//   PostTopWorlds:async function(req,res){
//   // },
//   // GetTopWorlds:async (req,res)=>{
//   //      res.render('home/top-world')
//    function run () {
//     })
//     }
//     return new Promise(async (resolve, reject) => {
//     // });
//     // var url = "https://clubhouseranking.net/top-world";
//     // const page = await browser.newPage();
//     // await page.setDefaultNavigationTimeout(0);
//     // await page.goto("https://clubhouseranking.net/top-world",{waitUntil: 'load', timeout: 0});
//     // .sort({ _id: 1 })
//     // .exec(function(err, Bolochi) {
//     //  });
//     //  let urls = await page.evaluate(async () => {
//     //  const browser = await puppeteer.launch({headless:false,defaultViewport:null});
//     //   } else {
//     //   }
//     //   if (err) {
//     //     });
//     //     return itemArray;
//     //     res.render('top_university/top_univ_bolochi',{
//     //     itemList.forEach(item =>{
//     //     const itemList = await document.querySelectorAll('a')
//     //     const itemArray = [];
//     //     console.log(itemList)
//     //     console.log(err);
//     //        Bolochi:Bolochi
//     //        // const itemImage = querySelectorAll('div > div > img').getAttribute('src');
//     //        //  console.log(itemImage)
//     //         itemArray.push({itemPrice})
//     //         const itemPrice = item.innerText;
//     //         console.log(itemPrice)
//     //         // const itemUrl = `https://www.facebook.com${item.getAttribute('href')}`
//     //         // const itemTitle = item.getAttribute('title');
//       // });
//       // Bolochi.find()
//         } catch (e) {
//         }
//         try {
//            let TopWorld = require("../../models/top-world");
//             return reject(e);
//             const newPage = await browser.newPage();
//             const browser = await puppeteer.launch();
//             browser.close();
//             await newPage.setDefaultNavigationTimeout(0);
//             await newPage.goto("https://clubhouseranking.net/top-world");
//             // return resolve(urls);
//             // let urls = await newPage.evaluate(async () => {
//               // let TopWorld = require("../../models/top-world");
//                // })
//                //  return results;
//                 };
//                 let results = [];
//                 let items = await newPage.$$('a.RankingTopWorld__userPreview--1CGVV');
//                 //8/onsole.log(items)
//                  for(let element of items){
//                   // var {TopWorld} = require(["../../models/top-world"]);
//                    // var data = results.push({
//                     // });
//                        // var username= item.querySelector(".UserPreview__username--2tKrj").innerText;
//                        // var rate= item.querySelector(".UserPreview__rate--1i6_h").innerText;
//                        // var name=item.querySelector(".UserPreview__name--32-ta").innerText;
//                        // var img= item.querySelector("img").src;
//                        // var followers=  item.querySelector(".UserPreview__followers--155pp").innerText;
//                        // var bio= item.querySelector(".UserPreview__bio--3bHn0").innerText;
//                        // var  url= `http://localhost:9000/top-worlds${item.getAttribute('href')}`;
//                         // text: item.innerText,
//                           let username = await element.$eval('.UserPreview__username--2tKrj',node5 => node5.innerText.trim());
//                           let url = await element.$eval(node => node.getAttributr('href'));
//                           let rate = await element.$eval('.UserPreview__rate--1i6_h',node2 => node2.innerText.trim());
//                           let name = await element.$eval('.UserPreview__name--32-ta',node4 => node4.innerText.trim());
//                           let img = await element.$eval('img',node1 => node1.src);
//                           let followers = await element.$eval('.UserPreview__followers--155pp',node3 => node3.innerText.trim());
//                           let bio = await element.$eval('.UserPreview__bio--3bHn0',node => node.innerText.trim());
//                           // let url = await element.$eval(a => a.getProperty('href'));
//                            })
//                            let topWorld = new TopWorld({
//                             username:username,
//                             url:url,
//                             rate:rate,
//                             name:name,
//                             img:img,
//                             followers:followers,
//                             bio:bio,
//                              });
//                              topWorld.save(function(result){
//                                res.render('home/top-world')
                   
                  
      
    
   
  
