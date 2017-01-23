require("./styles.scss");

let user;
let moderator;
let comments = [];
let userNameInput = document.querySelector('#user-name-input');
let userEmailInput = document.querySelector('#user-email-input');
let userInfoSubmit = document.querySelector('#user-log-in-button');
let moderatorNameInput = document.querySelector('#moderator-name-input');
let moderatorEmailInput = document.querySelector('#moderator-email-input');
let moderatorInfoSubmit = document.querySelector('#moderator-log-in-button');
let commentsEntryContainer = document.querySelector('.comments-entry-container');
let userLogOutButton = document.querySelector('#user-log-out-button');
let submitCommentButton = document.querySelector('#submit-comment-button');
let commentsDisplayContainer = document.querySelector('.comments-display-container');
let viewCommentsButton = document.querySelector('#view-comments-button');

class User {
  constructor(options) {
    this.name = options.name;
    this.email = options.email;
  }

  postComment(options) {
    comments.push(new Comment(this.name, options.body, Date.now()));
  }

}

class Moderator extends User {
  constructor(options) {
    super(options);
    this.adminKey = options.adminKey;
  }
  deleteComment(id) {
    console.log(id);
  }
}

// function Moderator(options) {
//   // User.call(this, options.name, options.email);
//   // this.adminKey = options.adminKey;
//   return new User(options);
// }
//
// // Moderator.prototype = new User();
//
// Moderator.prototype.deleteComment = function (id) {
//   console.log(id);
//   //filter through comments array to get rid of the comment whose id matches the incoming id
// };

class Comment {
  constructor(author, body, id) {
    this.author = author;
    this.body = body;
    this.id = id;
  }
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

userLogOutButton.addEventListener('click', (event) => {
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
    document.querySelector('.comments-entry-container textarea').value = '';
  }
  if (moderator) {
    event.preventDefault();
    let body = document.querySelector('.comments-entry-container textarea').value;
    moderator.postComment({
      body,
    });
    document.querySelector('.comments-entry-container textarea').value = '';
  }
});

viewCommentsButton.addEventListener('click', () => {
  comments.forEach((comment) => {
    let newP = document.createElement('P');
    let commentBody = document.createTextNode(`${comment.author} says: ${comment.body}`);
    newP.appendChild(commentBody);
    let deleteButton = document.createElement('BUTTON');
    let text = document.createTextNode('Delete Comment');
    deleteButton.appendChild(text);
    deleteButton.id = comment.id;
    deleteButton.classList.add('delete-comment-button');
    commentsDisplayContainer.appendChild(newP);
    commentsDisplayContainer.appendChild(deleteButton);
  });
});

moderatorInfoSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  if (moderatorNameInput.value && moderatorEmailInput.value) {
    moderator = new Moderator({
      name: `${moderatorNameInput.value.toLowerCase()}${Math.floor(Math.random() * 100)}`,
      email: moderatorEmailInput.value,
    });
    commentsEntryContainer.style.display = 'block';
    document.querySelector('.comments-entry-container h3').innerText = `Logged in as: ${moderator.name}`;
    document.querySelector('.error-container').innerText = '';
    moderatorNameInput.value = '';
    moderatorEmailInput.value = '';
  } else {
    document.querySelector('.error-container').innerText = 'Please enter in valid values in the name and email fields.';
  }
});

document.addEventListener('click', () => {
  if (event.target.className === 'delete-comment-button') {
    if (moderator) {
      moderator.deleteComment(event.target.id);
    } else {
      document.querySelector('.error-container').innerText = 'You do not have permission to delete comments.';
    }
  }
});

document.querySelector('.comments-entry-container textarea').addEventListener('click', () => {
  if (document.querySelector('.comments-entry-container textarea').value === 'Enter Comment') {
    document.querySelector('.comments-entry-container textarea').value = '';
  }
});
