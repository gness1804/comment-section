import comments from './comments-data';

function User (options) {
  this.name = options.name;
  this.email = options.email;
}

User.prototype.postComment = function () {

};

export default User;
