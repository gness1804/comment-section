require("./styles.scss");

let user;
let comments = [];
let userNameInput = document.querySelector('#user-name-input');
let userEmailInput = document.querySelector('#user-email-input');
let userInfoSubmit = document.querySelector('#log-in-button');
let commentsEntryContainer = document.querySelector('.comments-entry-container');
let logOutButton = document.querySelector('#log-out-button');
let submitCommentButton = document.querySelector('#submit-comment-button');
let commentsDisplayContainer = document.querySelector('.comments-display-container');

function User(options) {
  this.name = options.name;
  this.email = options.email;
}

User.prototype.postComment = function (options) {
  comments.push(new Comment(this.name, options.body, Date.now()));
};

function Comment (author, body, id) {
  this.author = author;
  this.body = body;
  this.id = id;
}

userInfoSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  if (userNameInput.value && userEmailInput.value) {
    user = new User({
      name: `${userNameInput.value.toLowerCase()}${Math.floor(Math.random() * 100)}`,
      email: userEmailInput.value,
    });
    commentsEntryContainer.style.display = 'block';
    document.querySelector('.comments-entry-container h3').innerText = `Logged in as: ${user.name}`;
    document.querySelector('.error-container').innerText = '';
    userNameInput.value = '';
    userEmailInput.value = '';
  } else {
    document.querySelector('.error-container').innerText = 'Please enter in valid values in the name and email fields.';
  }
});

logOutButton.addEventListener('click', (event) => {
  event.preventDefault();
  user = null;
  commentsEntryContainer.style.display = 'none';
});

submitCommentButton.addEventListener('click', () => {
  if (user) {
    event.preventDefault();
    let body = document.querySelector('.comments-entry-container textarea').value;
    user.postComment({
      body,
    });
    comments.forEach((comment) => {
      let newLI = document.createElement('LI');
      let commentBody = document.createTextNode(`${comment.author} says: ${comment.body}`);
      newLI.appendChild(commentBody);
      commentsDisplayContainer.appendChild(newLI);
    });
  }
});
