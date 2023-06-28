class UserDTO{
    constructor(user){
        this._id = user._id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.isAdmin = user.isAdmin;
    }
}

module.exports = UserDTO;