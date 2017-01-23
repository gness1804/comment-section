require("./styles.scss");

let user;
let moderator;
let superUser;
let comments = [];
let userNameInput = document.querySelector('#user-name-input');
let userEmailInput = document.querySelector('#user-email-input');
let userInfoSubmit = document.querySelector('#user-log-in-button');
let moderatorNameInput = document.querySelector('#moderator-name-input');
let moderatorEmailInput = document.querySelector('#moderator-email-input');
let moderatorInfoSubmit = document.querySelector('#moderator-log-in-button');
let moderatorRoleInput = document.querySelector('#moderator-role-input');
let superUserNameInput = document.querySelector('#super-user-name-input');
let superUserEmailInput = document.querySelector('#super-user-email-input');
let superUserRoleInput = document.querySelector('#super-user-role-input');
let superUserKeyInput = document.querySelector('#super-user-key-input');
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

  deleteOwnComment(id, className){
    if (this.name === className) {
      commentsDisplayContainer.innerHTML = '';
      comments = comments.filter((comment) => {
        return comment.id !== parseInt(id, 10);
      });
    } else {
      document.querySelector('.error-container').innerText = 'You do not have permission to delete other users\' comments.';
    }
  }

}

class SuperUser extends Moderator {
  constructor(options) {
    super(options);
    this.adminKey = options.adminKey;
  }

  deleteAllComments() {
    commentsDisplayContainer.innerHTML = '';
    comments = [];
  }

  deleteComment(id) {
    commentsDisplayContainer.innerHTML = '';
    comments = comments.filter((comment) => {
      return comment.id !== parseInt(id, 10);
    });
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
  if (!user && !superUser && !moderator) {
    if (userNameInput.value && userEmailInput.value) {
      user = new User({
        name: `${userNameInput.value.toLowerCase()}${Math.floor(Math.random() * 100)}`,
        email: userEmailInput.value,
      });
      commentsEntryContainer.style.display = 'block';
      document.querySelector('.comments-entry-container h3').innerText = `Logged in as: ${user.name}`;
      document.querySelector('.comments-entry-container h5').innerText = 'You are a User.';
      document.querySelector('.error-container').innerText = '';
      userNameInput.value = '';
      userEmailInput.value = '';
    } else {
      document.querySelector('.error-container').innerText = 'Please enter in valid values in the name and email fields.';
    }
  } else {
    document.querySelector('.error-container').innerText = 'Please log out first before attempting to log in.';
  }
});

userLogOutButton.addEventListener('click', (event) => {
  event.preventDefault();
  user = null;
  commentsEntryContainer.style.display = 'none';
});

document.querySelector('#moderator-log-out-button').addEventListener('click', (event) => {
  event.preventDefault();
  moderator = null;
  commentsEntryContainer.style.display = 'none';
});

document.querySelector('#super-user-log-out-button').addEventListener('click', (event) => {
  event.preventDefault();
  superUser = null;
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
  if (superUser) {
    event.preventDefault();
    let body = document.querySelector('.comments-entry-container textarea').value;
    superUser.postComment({
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
        deleteButton.classList.add(comment.author);
        commentsDisplayContainer.appendChild(newP);
        commentsDisplayContainer.appendChild(deleteButton);
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
  if (!user && !superUser && !moderator) {
    if (moderatorNameInput.value && moderatorEmailInput.value && moderatorRoleInput.value) {
      moderator = new Moderator({
        name: `${moderatorNameInput.value.toLowerCase()}${Math.floor(Math.random() * 100)}`,
        email: moderatorEmailInput.value,
        role: moderatorRoleInput.value,
      });
      commentsEntryContainer.style.display = 'block';
      document.querySelector('.comments-entry-container h3').innerText = `Logged in as: ${moderator.name}`;
      document.querySelector('.comments-entry-container h4').innerText = `Your Role: ${moderator.role}`;
      document.querySelector('.comments-entry-container h5').innerText = 'You are a Moderator.';
      document.querySelector('.error-container').innerText = '';
      moderatorNameInput.value = '';
      moderatorEmailInput.value = '';
      moderatorRoleInput.value = '';
    } else {
      document.querySelector('.error-container').innerText = 'Please enter in valid values in the name, email, and role fields.';
    }
  } else {
    document.querySelector('.error-container').innerText = 'Please log out first before attempting to log in.';
  }
});

document.addEventListener('click', () => {
  let test = /14+/;
  if (superUser) {
    if (event.target.id.match(test)) {
      superUser.deleteComment(event.target.id);
    }
  } else if (moderator) {
    if (event.target.className === moderator.name) {
      moderator.deleteOwnComment(event.target.id, event.target.className);
    }
  } else if (user) {
    if (event.target.className === user.name) {
      document.querySelector('.error-container').innerText = 'You do not have permission to delete comments.';
    }
  }
});

document.querySelector('.comments-entry-container textarea').addEventListener('click', () => {
  if (document.querySelector('.comments-entry-container textarea').value === 'Enter Comment') {
    document.querySelector('.comments-entry-container textarea').value = '';
  }
});

document.querySelector('#super-user-log-in-button').addEventListener('click', (event) => {
  event.preventDefault();
  if (!user && !superUser && !moderator) {
    if (superUserNameInput.value && superUserEmailInput.value && superUserRoleInput.value) {
      superUser = new SuperUser({
        name: `${superUserNameInput.value.toLowerCase()}${Math.floor(Math.random() * 100)}`,
        email: superUserEmailInput.value,
        role: superUserRoleInput.value,
        adminKey: superUserKeyInput.value,
      });
      commentsEntryContainer.style.display = 'block';
      document.querySelector('.comments-entry-container h3').innerText = `Logged in as: ${superUser.name}`;
      document.querySelector('.comments-entry-container h4').innerText = `Your Role: ${superUser.role}`;
      document.querySelector('.comments-entry-container h5').innerText = 'You are a Super User.';
      document.querySelector('.error-container').innerText = '';
      superUserNameInput.value = '';
      superUserEmailInput.value = '';
      superUserRoleInput.value = '';
    } else {
      document.querySelector('.error-container').innerText = 'Please enter in valid values all fields.';
    }
  } else {
    document.querySelector('.error-container').innerText = 'Please log out first before attempting to log in.';
  }
});

document.querySelector('#delete-all-comments-button').addEventListener('click', () => {
  if (superUser) {
    superUser.deleteAllComments();
  } else {
    document.querySelector('.error-container').innerText = 'You do not have permission to delete all comments.';
  }
});
