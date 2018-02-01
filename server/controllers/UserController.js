var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcryptjs');
module.exports = (function () {


    return {
        index: function (req, res) {
            User.find({}, function (err, User) {
                res.json(User)
            })
        },


        createUser: function (req, res) {
            console.log('IN: User Controller | createUser()')
            var users = new User();
            users.email = req.body.email;
            users.fullname = req.body.fullname;
            users.password = req.body.password;
            users.save(function (error, person) {
                console.log('THIS USER IS', users)
                if (error) {
                    console.log('===-- ERRRORRR --====')
                    console.log(error)
                    return res.json({ Error: 'Register FAILED', registeredIn: false })
                }
                else {
                    let response = {
                        _id: person._id,
                        email: person.email,
                        fullname: person.fullname,
                        displayname: person.displayname,
                        registeredIn: true
                    }
                    console.log('MAMA, I MADE IT!')
                    console.log('THIS USER IS', person)
                    req.session.currentUser = response
                    console.log("THIS IS USER ID:", req.session.currentUser)
                    // return res.json({'newPerson': person})
                    return res.json(response);
                }

            });
    },
        
        logging :function (req, res) {
            console.log('===INSIDE USER LOGIN CONTROLLER===')
            console.log('req.body:', req.body)
            User.findOne({ email: req.body.email }, function (errors, resultResponse) {
                console.log('response:', resultResponse)
                if (errors || resultResponse == null) {
                    console.log('===ERROR FINDING USER===')
                    return res.json({ Error: 'Email was not found' })
                } else {
                    console.log('===COMPARING PASSWORD===')
                    // console.log('req.body.password:', req.body.password)
                    // if (bcrypt.compareSync(req.body.password, resultResponse.password)) 
                    if (req.body.password === resultResponse.password)
                    {
                        // console.log(resultResponse.password)
                        let response = {
                            _id: resultResponse._id,
                            email: resultResponse.email,
                            fullname: resultResponse.fullname,
                            displayname: resultResponse.displayname,
                            loggedIn: true
                        }
                        req.session.currentUser = response
                        // req.session.currentUser = resultResponse._id
                        console.log("SESSION ID: ", req.session.currentUser._id)
                        return res.json(response)
                    } else {
                        console.log('===FAILED COMPARING PASSWORDS===')
                        return res.json({ Error: 'Password does not match', loggedIn: false })
                    }
                }
            });

        },
        update: function (req, res) {
            console.log("====UPDATING PROFILE====");
            User.update({ _id: req.session.currentUser._id}, 
             { fullname: req.body.fullname,  
                email: req.body.email }, function (err, user) {
                if (err) {
                    console.log({ Error: 'Cannot be updated!', updatedTo: false });
                }
                else {
                    console.log("This user is now updated to:", user);
                    console.log("this user ID and info is:", req.session.currentUser)
                    res.json(user)
                }
            });
            
        },
        getAll: function (request, response) {
            console.log('===GETTING LOGGED IN USER===')
            User.find({email : response.email }, function (error, response) {
                console.log(response.email)
                console.log('ERRORS,', error);
                if (error || response == null) {
                    console.log('ERRRORRRR')
                    return res.json({ 'error': error, 'response': response })
                } else {
                    console.log('YASS')
                    // return res.json({ 'response': response })
                    return res.json(response);
                }
            })
        }

    };
})();