class PostCollection {
  constructor(posts) {
    let _posts = posts;
    this.setPosts = function (postsToSet) { _posts = postsToSet; };
    this.getPosts = () => _posts;
  }

  getPage(skip = 0, top = 10, filterConfig) {
    let posts = this.getPosts();
    posts.sort((p1, p2) => (p2.createdAt - p1.createdAt));
    if (typeof skip !== 'number' || typeof top !== 'number') {
      return [];
    }
    if (typeof filterConfig === 'object') {
      posts = posts.filter((post) => {
        if (filterConfig.hasOwnProperty('date')) {
          if (Date.parse(post.createdAt) < Date.parse(filterConfig.dateBegin) || Date.parse(post.createdAt) > Date.parse(filterConfig.dateEnd)) {
            return false;
          }
        }
        if (filterConfig.hasOwnProperty('author')) {
          if (filterConfig.author !== post.author) { return false; }
        }
        if (filterConfig.hasOwnProperty('tags')) {
          if (!filterConfig.tags.every(tag => post.tags.includes(tag))) { return false; }
        }
        return true;
      });
    }
    return posts.slice(skip, top + skip);
  }

  get(id) {
    if (typeof id !== 'string' || id === '') {
      return undefined;
    }
    return this.getPosts().find(post => post.id === id);
  }

  static validate(post) {
    if (typeof post !== 'object') { return false; }
    if (typeof post.id !== 'string' || post.id === '') { return false; }
    if (typeof post.description !== 'string') { return false; }
    if (!(post.createdAt instanceof Date)) { return false; }
    if (typeof post.author !== 'string' || post.author === '') { return false; }
    if (typeof post.photoLink !== 'string' || post.photoLink === '') { return false; }
    if (typeof post.tags === 'undefined' || !Array.isArray(post.tags)) { return false; }
    if (typeof post.likes === 'undefined' || !Array.isArray(post.likes)) { return false; }
    return true;
  }

  add(photoPost) {
    if (!this.constructor.validate(photoPost)) { return false; }
    const newPostCollection = this.getPosts();
    newPostCollection.push(photoPost);
    this.setPosts(newPostCollection);
    return true;
  }

  edit(id, photoPost) {
    if (typeof id !== 'string' || id === '' || typeof photoPost !== 'object') {
      return false;
    }
    const post = this.get(id);
    if (post) {
      if (photoPost.hasOwnProperty('description')) { post.description = photoPost.description; }
      if (photoPost.hasOwnProperty('photoLink')) { post.photoLink = photoPost.photoLink; }
      if (photoPost.hasOwnProperty('tags')) { post.hashTags = photoPost.tags; }
      return true;
    }
    return false;
  }

  remove(id) {
    if (typeof id !== 'string' || id === '') { return false; }
    const post = this.get(id);
    if (post !== undefined) {
      const i = this.getPosts().indexOf(post);
      this.getPosts().splice(i, 1);
      return true;
    }
    return false;
  }

  addAll(posts) {
    // eslint-disable-next-line prefer-const
    let notAdded = [];
    for (let index = 0; index < posts.length; index++) {
      if (!this.add(posts[index])) { notAdded.push(posts[index]); }
    }
    return notAdded;
  }
}

const photoPosts = [
  {
    id: '1',
    description: 'Director Stanley Kubrick can make your own living room seem creepy and unfamiliar.',
    createdAt: new Date('2019-03-04T01:59:00'),
    author: 'defiler',
    photoLink: 'images/img1.jpg',
    tags: ['The Shining', 'Stanley Kubrick'],
    likes: ['photographer', 'defiler', 'user1'],
  },
  {
    id: '2',
    description: '"Stalker" was released in 1979. A guide leads two men through an area known as the Zone to find a room that grants wishes.',
    createdAt: new Date('2019-03-02T10:00:00'),
    author: 'Tarkovsky',
    photoLink: 'images/img2.jpg',
    tags: ['STALKER', 'filming', 'Andrei Tarkovsky'],
    likes: ['Tarkovsky', 'defiler', 'user1'],
  },
  {
    id: '3',
    description: '',
    createdAt: new Date('2019-03-02T09:59:00'),
    author: 'rnduser',
    photoLink: 'images/img3.jpg',
    tags: ['scientific illustration', 'black', 'arrow'],
    likes: ['Tarkovsky', 'defiler', 'user1'],
  },
  {
    id: '4',
    description: 'BRUHBERRY',
    createdAt: new Date('2019-03-02T08:00:00'),
    author: 'fash',
    photoLink: 'images/img4.jpg',
    tags: [],
    likes: ['Tarkovsky', 'defiler'],
  },
  {
    id: '5',
    description: 'me rn.',
    createdAt: new Date('2019-02-28T15:35:00'),
    author: 'photographer',
    photoLink: 'images/img5.jpg',
    tags: ['УППППП', 'в', 'последний', 'день'],
    likes: ['Tarkovsky', 'defiler', 'user1'],
  },

  {
    id: '6',
    description: 'Error page concept.',
    createdAt: new Date('2019-02-26T01:12:00'),
    author: 'photographer',
    photoLink: 'images/img6.PNG',
    tags: ['defiler', 'yellow', 'up'],
    likes: ['defiler', 'user1'],
  },
  {
    id: '7',
    description: 'T R U T H',
    createdAt: new Date('2019-02-23T10:10:00'),
    author: 'Obschjitie_6',
    photoLink: 'images/img7.jpg',
    tags: ['shestiorka'],
    likes: ['defiler', 'user1', 'photographer'],
  },
  {
    id: '8',
    description: '',
    createdAt: new Date('2019-03-02T20:36:00'),
    author: 'xnkvch',
    photoLink: 'images/img8.jpg',
    tags: ['shestiorka'],
    likes: ['defiler', 'user1', 'photographer'],
  },
  {
    id: '9',
    description: '«Плита ограды ПО‑2»\nПроектная организация: «Мосгорстройматериалы»;\nАрхитекторы: коллектив под руководством Б. Лахмана;\nГоды создания: 1970-е (первая половина)',
    createdAt: new Date('2019-02-21T15:24:00'),
    author: 'sovmod',
    photoLink: 'images/img9.jpg',
    tags: ['sovmod'],
    likes: ['USSR', 'design', 'photographer'],
  },
];

const postList = new PostCollection(photoPosts);
console.log('Verifications:');
console.log('\n');
console.log('getPage');
console.log('invalid args: ', postList.getPage('arg1', 'arg2'));
console.log('default args: ', postList.getPage());
console.log('skip = 3, default top: ', postList.getPage(3));
console.log('skip = 4, top = 4: ', postList.getPage(4, 4));
console.log('filter by author=\'defiler\': ', postList.getPage(0, 3, { author: 'defiler' }));
console.log('\n');
console.log('get:');
console.log('invalid argument: ', postList.get(''));
console.log('id=100 (invalid): ', postList.get('100'));
console.log('id = 3: ', postList.get('3'));
console.log('\n');
console.log('validate:');
console.log('valid post: ', PostCollection.validate({
  id: '10',
  description: 'descript',
  createdAt: new Date('2019-02-23T23:00:00'),
  author: 'auth',
  photoLink: 'images/img1.jpg',
  tags: ['tag1'],
  likes: ['likeuser'],
}));
console.log('invalid post: ', PostCollection.validate({
  id: '10',
  description: 'descript',
  createdAt: new Date('2019-02-23T23:00:00'),
  author: 'auth',
  photoLink: null,
  tags: ['tag1'],
  likes: ['likeuser'],
}));
console.log('\n');
console.log('add:');
console.log('valid post: ', postList.add({
  id: '21',
  description: 'desc',
  createdAt: new Date('2022-03-05T01:46:00'),
  author: 'person',
  photoLink: 'images/img1.jpg',
  tags: ['hello'],
  likes: [],
}));
console.log('invalid post: ', postList.add({
  id: '22',
  description: 'desc',
  createdAt: new Date('2022-03-05T01:46:00'),
  author: 1,
  photoLink: 'images/img1.jpg',
  tags: ['hello'],
  likes: [],
}));
console.log('all posts after adding:', postList.getPosts());
console.log('\n');
console.log('edit:');
console.log('post with id=\'1\': ', postList.get('1'));
console.log('edit post with id=\'1\': ', postList.edit('1', { description: 'edited description' }));
console.log('edited post with id=\'1\': ', postList.get('1'));
console.log('trying to edit with invalid args: ', postList.edit('', 1));
console.log('\n');
console.log('remove:');
console.log('remove post with id=\'5\': ', postList.remove('5'));
console.log('get post with id=\'5\':', postList.get('5'));
console.log('all posts after removing post:', postList.getPosts());
