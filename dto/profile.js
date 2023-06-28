class UserProfileDTO{
    constructor(user){
        this._id = user._id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.phone = user.phone;
        this.country = user.country;
    }
}

module.exports = UserProfileDTO;