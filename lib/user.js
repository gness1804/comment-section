function User(options) {
  this.name = options.name;
  this.email = options.email;
}

User.prototype.postComment = function () {
  comments.push(new Comment(this.name, 'foo', Date.now()));
};

export default User;
