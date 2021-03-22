const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth:{
      api_key:'9b7587990e46d7d45b905282596f3162-77751bfc-d0ba1c81',
      domain:'sandbox05a3da0b94bb421caa02db795b3536dc.mailgun.org'
    }
  };
  let transporter = nodemailer.createTransport(mailGun(auth));
  // console.log(transporter)
  const sendMail = (from,subject,text,callback) => {
    const mailOptions = {
        from:'husnali1010@gmail.com',
        to:'husnali1010@gmail.com',
        subject:"Contact Message",
        text:"messages Sending",
        fileImage:"messages Sending",
        callback
    };
    // console.log(mailOptions)
    transporter.sendMail(mailOptions,function(err,data){
    	 console.log('Data:',data)
        if(err){
            console.log(err)
        }else{
             console.log(data)
        }
    }); 

  }
  module.exports = sendMail;