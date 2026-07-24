const Profile = require("../models/Profile");


class ProfileController {


    // Create Profile
    static async create(req, res) {

        try {

            const userId = req.user.id;

            const {
                full_name,
                bio,
                gender,
                dob
            } = req.body;


            const profile = await Profile.createProfile({

                user_id: userId,
                full_name,
                bio,
                gender,
                dob

            });


            return res.status(201).json({

                success: true,
                message: "Profile created successfully.",
                data: profile

            });


        } catch (error) {

            return res.status(500).json({

                success: false,
                message: error.message

            });

        }

    }



    // Get Profile
    static async getProfile(req, res) {

        try {

            const userId = req.user.id;


            const profile = await Profile.getProfileByUserId(userId);


            return res.status(200).json({

                success: true,
                data: profile

            });


        } catch (error) {

            return res.status(500).json({

                success: false,
                message: error.message

            });

        }

    }




    // Update Profile
    // Update Profile
    static async update(req, res) {
        try {

            const userId = req.user.id;

            const {
                username,
                phone,
                full_name,
                bio,
                gender,
                dob
            } = req.body;

            await Profile.updateProfile(userId, {
                username,
                phone,
                full_name,
                bio,
                gender,
                dob
            });

            return res.status(200).json({
                success: true,
                message: "Profile updated successfully."
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }


}


module.exports = ProfileController;