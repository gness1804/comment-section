require("./styles.scss");

let user;
let comments = [];
let userNameInput = document.querySelector('#user-name-input');
let userEmailInput = document.querySelector('#user-email-input');
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
  user = new User({
    name: `${userNameInput.value.toLowerCase()}${Math.floor(Math.random() * 100)}`,
    email: userEmailInput.value,
  });
  console.log(user);
});
