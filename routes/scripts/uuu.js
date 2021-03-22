var request = require('request-promise');
var path = require('path');
var fs      = require('fs');
var cheerio = require('cheerio');
run().then(console.log).catch(console.error);
let {TopWorld} = require("../../models/top-world");
let mkdir = require('mkdir');
let User = require("../../models/user");
let connection = require('../../config/database');
let bcrypt = require('bcryptjs');
let axios = require("axios");
let async = require('async');
const puppeteer = require('puppeteer');

module.exports = {
  PostTopWorlds:async function(req,res){
 function run () {
 	 return new Promise(async (resolve, reject) => {
    	  try {
           let TopWorld = require("../../models/top-world");
            return reject(e);
            const newPage = await browser.newPage();
            const browser = await puppeteer.launch();
            browser.close();
            await newPage.setDefaultNavigationTimeout(0);
            await newPage.goto("https://clubhouseranking.net/top-world");

              let results = [];
                let items = await newPage.$$('a.RankingTopWorld__userPreview--1CGVV');
                //8/onsole.log(items)
                 for(let element of items){
                 	      let username = await element.$eval('.UserPreview__username--2tKrj',node5 => node5.innerText.trim());
                          let url = await element.$eval(node => node.getAttributr('href'));
                          let rate = await element.$eval('.UserPreview__rate--1i6_h',node2 => node2.innerText.trim());
                          let name = await element.$eval('.UserPreview__name--32-ta',node4 => node4.innerText.trim());
                          let img = await element.$eval('img',node1 => node1.src);
                          let followers = await element.$eval('.UserPreview__followers--155pp',node3 => node3.innerText.trim());
                          let bio = await element.$eval('.UserPreview__bio--3bHn0',node => node.innerText.trim());
                          // let url = await element.$eval(a => a.getProperty('href'));
                           let topWorld = new TopWorld({
                            username:username,
                            url:url,
                            rate:rate,
                            name:name,
                            img:img,
                            followers:followers,
                            bio:bio,
                             });
                           topWorld.save(function(result){
                               res.render('home/top-world')
                           });
                       }
                   }catch(error){
                     console.log(error)
                   }
               });
 	}
 }

}
