const client = require("../config/twilio");


class OtpService {


static async sendOtp(phone){


    const verification =
    await client.verify
    .v2
    .services(
        process.env.TWILIO_VERIFY_SERVICE_SID
    )
    .verifications
    .create({

        to: phone,
        channel:"sms"

    });


    return verification;


}




static async verifyOtp(phone,otp){


    const result =
    await client.verify
    .v2
    .services(
        process.env.TWILIO_VERIFY_SERVICE_SID
    )
    .verificationChecks
    .create({

        to:phone,
        code:otp

    });


    return result;

}


}


module.exports = OtpService;