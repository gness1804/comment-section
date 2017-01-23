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
let moderatorRoleInput = document.querySelector('#moderator-role-input');
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
    this.role = options.role;
  }

  deleteComment(id) {
    commentsDisplayContainer.innerHTML = '';
    comments = comments.filter((comment) => {
      return comment.id !== parseInt(id, 10);
    });
  }

  editComment(id){
    //need to parseInt the id
    let textArea = document.createElement('TEXTAREA');
    document.querySelector('.comments-edit-container').appendChild(textArea);
    textArea.placeholder = 'Edit Chosen Comment.';
    let button = document.createElement('BUTTON');
    let text = document.createTextNode('Submit Edits');
    button.appendChild(text);
    document.querySelector('.comments-edit-container').appendChild(button);
  }

}

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
  if (!commentsDisplayContainer.innerText) {
    if (comments.length > 0) {
      comments.forEach((comment) => {
        let newP = document.createElement('P');
        let commentBody = document.createTextNode(`${comment.author} says: ${comment.body}`);
        newP.appendChild(commentBody);
        let deleteButton = document.createElement('BUTTON');
        let text = document.createTextNode('Delete Comment');
        deleteButton.appendChild(text);
        deleteButton.id = comment.id;
        deleteButton.classList.add('delete-comment-button');
        let editButton = document.createElement('BUTTON');
        let text1 = document.createTextNode('Edit Comment');
        editButton.appendChild(text1);
        editButton.id = comment.id;
        editButton.classList.add('edit-comment-button');
        commentsDisplayContainer.appendChild(newP);
        commentsDisplayContainer.appendChild(deleteButton);
        commentsDisplayContainer.appendChild(editButton);
      });
    } else {
      document.querySelector('.error-container').innerText = 'No comments to display.';
    }
  } else {
    commentsDisplayContainer.innerText = '';
  }
});

moderatorInfoSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  if (moderatorNameInput.value && moderatorEmailInput.value && moderatorRoleInput.value) {
    moderator = new Moderator({
      name: `${moderatorNameInput.value.toLowerCase()}${Math.floor(Math.random() * 100)}`,
      email: moderatorEmailInput.value,
      role: moderatorRoleInput.value,
    });
    commentsEntryContainer.style.display = 'block';
    document.querySelector('.comments-entry-container h3').innerText = `Logged in as: ${moderator.name}`;
    document.querySelector('.comments-entry-container h4').innerText = `Your Role: ${moderator.role}`;
    document.querySelector('.error-container').innerText = '';
    moderatorNameInput.value = '';
    moderatorEmailInput.value = '';
    moderatorRoleInput.value = '';
  } else {
    document.querySelector('.error-container').innerText = 'Please enter in valid values in the name, email, and admin key fields.';
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
  if (event.target.className === 'edit-comment-button') {
    if (moderator) {
      moderator.editComment(event.target.id);
    } else {
      document.querySelector('.error-container').innerText = 'You do not have permission to edit comments.';
    }
  }
});

document.querySelector('.comments-entry-container textarea').addEventListener('click', () => {
  if (document.querySelector('.comments-entry-container textarea').value === 'Enter Comment') {
    document.querySelector('.comments-entry-container textarea').value = '';
  }
});
