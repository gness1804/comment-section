require("./styles.scss");

let user;
let comments = [];
let userNameInput = document.querySelector('#user-name-input');
let userEmailInput = document.querySelector('#user-email-input');
let userInfoSubmit = document.querySelector('#user-info-submit');
let commentsContainer = document.querySelector('.comments-container');

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
  if (userNameInput.value && userEmailInput.value) {
    user = new User({
      name: `${userNameInput.value.toLowerCase()}${Math.floor(Math.random() * 100)}`,
      email: userEmailInput.value,
    });
    commentsContainer.style.display = 'block';
    document.querySelector('.error-container').innerText = '';
  } else {
    document.querySelector('.error-container').innerText = 'Please enter in valid values in the name and email fields.';
  }
});
