require("./styles.scss");

let comments = [];
let userName = document.querySelector('#user-name-input');
let userEmail = document.querySelector('#user-email-input');
let userInfoSubmit = document.querySelector('#user-info-submit');

function User(options) {
  this.name = options.name;
  this.email = options.email;
}

User.prototype.postComment = function () {
  comments.push(new Comment(this.name, 'foo', Date.now()));
};

function Comment (author, body, id) {
  this.author = author;
  this.body = body;
  this.id = id;
}

userInfoSubmit.addEventListener('click', function (event) {
  event.preventDefault();
  let varName = `${userName.value.toLowerCase()}${Math.floor(Math.random() * 100)}`;
  
});

// let john = new User({
//   name: 'John',
//   email: 'john@john.com',
// });
