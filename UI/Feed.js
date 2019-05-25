const DisplayFeed = () => {
  if (localStorage.user !== '') {
    localStorage.state = '2';
  }
  const logIN = document.getElementsByClassName('logIN')[0];
  const addPhotoForm = document.getElementsByClassName('addPhotoForm')[0];
  const menu = document.getElementsByClassName('menu')[0];
  if (logIN) { logIN.remove(); }
  if (addPhotoForm) { addPhotoForm.remove(); }
  if (menu) { menu.style.display = 'block'; }
  const filters = document.createElement('div');
  filters.classList.add('filters');
  filters.innerHTML = `
  <div class="filter">
  <div class="filter_description">USERNAME</div>
  <input type="text" oninput="filterChange('author', this)" name="user">
</div>
<div class="filter">
  <div class="filter_description">DATE</div>
  <input type="date" oninput="filterChange('dateBegin', this)" name="date_interval_start">
  <div class="filter_description" style="text-align: center;">through</div>
  <input type="date" oninput="filterChange('dateEnd', this)" name="date_interval_end">
</div>
<div class="filter">
      <div class="filter_description">TAGS</div>
      <input type="text" name="tags" oninput="filterChange('tags', this)" placeholder="start each one with # symbol">
</div>
            `;
  const body = document.getElementsByTagName('body')[0];
  body.insertBefore(filters, body.childNodes[1]);

  const main = document.getElementsByClassName('main')[0];
  const feed = document.createElement('div');
  feed.id = 'feed';
  main.insertBefore(feed, main.childNodes[1]);
  loadMore = document.createElement('div');
  loadMore.id = 'load_more';
  loadMore.innerHTML = '<div><button>load more posts</button></div>';
  loadMore.addEventListener('click', dom.loadMorePosts);
  body.insertBefore(loadMore, body.childNodes[5]);
};

function displayGuest() {
  document.getElementById('log_in_button').style.display = 'inline';
  document.getElementById('log_out_button').style.display = 'none';
  document.getElementById('add_button').style.display = 'none';
}

function displayPosts() {
  const feed = document.getElementById('feed');
  feed.innerHTML = '';
  dom.createPage(filterConfig);
}

// function addPhotoPost(post) {
//   const posts = JSON.parse(localStorage.photoPosts);
//   if (posts.addPhotoPost(post)) {
//     localStorage.photoPosts = JSON.stringify(posts);
//   }
//   const feed = document.getElementsByClassName('feed')[0];
//   feed.innerHTML = '';

//   localStorage.state = '2';
//   dom.displayPosts(posts.getPage());

//   const actuall_amount = document.getElementsByClassName('post').length;
//   if (actuall_amount < posts.length) { document.getElementsByClassName('btn-load-more')[0].style.display = 'block'; } else return false;
// }
// function removePhotoPost(id) {
//   const posts = JSON.parse(localStorage.photoPosts);
//   if (posts.removePhotoPost(id)) {
//     localStorage.photoPosts = JSON.stringify(posts);
//     if (dom.removePhotoPost(id)) {
//       const actuall_amount = document.getElementsByClassName('post').length;
//       if (actuall_amount < posts.getPage(0, posts.length, filterConfig).length) { dom.displayPosts([posts.getPage(actuall_amount, 1, filterConfig)[0]]); }
//       if (posts.length <= actuall_amount + 1) { document.getElementsByClassName('btn-load-more')[0].style.display = 'none'; }
//     }
//     return true;
//   }
//   return false;
// }
// function editPhotoPost(id, newPost) {
//   const posts = JSON.parse(localStorage.photoPosts);
//   if (posts.editPhotoPost(id, newPost)) {
//     localStorage.photoPosts = JSON.stringify(posts);
//     dom.editPhotoPost(id, posts.getPhotoPost(id));
//     return true;
//   }
//   return false;
// }

function filterChange(option, el) {
  // eslint-disable-next-line default-case
  switch (option) {
    case 'dateBegin': {
      filterConfig.dateBegin = el.value;
      if (el.value === '') {
        delete filterConfig.dateBegin;
      }
      break;
    }

    case 'dateEnd': {
      filterConfig.dateEnd = el.value;
      if (el.value === '') {
        delete filterConfig.dateEnd;
      }
      break;
    }

    case 'author': {
      filterConfig.author = el.value;
      if (el.value === '') {
        delete filterConfig.author;
      }
      break;
    }

    case 'tags': {
      if (el.value === '') {
        delete filterConfig.tags;
      } else {
        filterConfig.tags = el.value.split('#');
        if (filterConfig.tags[0] === '') {
          delete filterConfig.tags[0];
        }
      }
      break;
    }
  }

  displayPosts();
}
