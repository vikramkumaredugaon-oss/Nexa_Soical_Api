const OtpService = require("../services/OtpService");


class OtpController{


static async send(req,res){

try{


const {phone}=req.body;


await OtpService.sendOtp(phone);


res.json({

success:true,
message:"OTP sent successfully"

});


}catch(error){

res.status(500).json({

success:false,
message:error.message

});


}

}





static async verify(req,res){

try{


const {
phone,
otp
}=req.body;


const result =
await OtpService.verifyOtp(
    phone,
    otp
);



if(result.status !== "approved"){

return res.status(400).json({

success:false,
message:"Invalid OTP"

});

}



res.json({

success:true,
message:"OTP verified"

});


}catch(error){

res.status(500).json({

success:false,
message:error.message

});

}


}


}


module.exports = OtpController;