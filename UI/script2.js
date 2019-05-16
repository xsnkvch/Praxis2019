const dom = (function () {
  return {
    page() {
      pageView = new View();
    },
    setPageUser(user) {
      pageView.setUser(user);
    },
    setPosts(posts) {
      pagePosts = new PostCollection(posts);
      this.createPage();
    },

    addPost(post) {
      if (pagePosts.add(post)) {
        const nextID = `post${pagePosts.getPage().find(el => el.createdAt < post.createdAt).id}`;
        pageView.insertPost(post, nextID);
        return true;
      }
      return false;
    },
    createPage() {
      pagePosts.getPage(0).forEach((element) => { pageView.pushBackPost(element); });
    },
    removePost(id) {
      if (pagePosts.remove(id)) {
        pageView.removePost(id);
        return true;
      }
      return false;
    },
    editPost(id, post) {
      if (pagePosts.edit(id, post)) {
        pageView.editPost(id, post);
        return true;
      }
      return false;
    },
  };
}());

const pppppposts = [
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
    likes: ['Tarkovsky', 'xsnkvch', 'defiler'],
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
    likes: ['defiler', 'user1', 'asfdasg'],
  },
  {
    id: '7',
    description: 'T R U T H',
    createdAt: new Date('2019-02-23T10:10:00'),
    author: 'Obschjitie_6',
    photoLink: 'images/img7.jpg',
    tags: ['shestiorka'],
    likes: ['defiler', 'user1', 'xsnkvch', 'photographer'],
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

dom.page();
dom.setPageUser('xsnkvch');
dom.setPosts(pppppposts);

dom.addPost({
  id: '4545',
  description: 'descript',
  createdAt: new Date('2019-05-16T20:36:00'),
  author: 'xsnkvch',
  photoLink: 'images/img8.jpg',
  tags: ['tag1', 'tag2'],
  likes: ['defiler', 'user1', 'photographer', 'gdf', 'sgdasg', 'sdgaser'],
});
dom.editPost('8');
dom.editPost('4', {
  id: '4',
  description: 'BRUHBERRY',
  createdAt: new Date('2019-03-02T08:00:00'),
  author: 'fash',
  photoLink: 'images/img4.jpg',
  tags: ['meme', 'fashion', 'i dont understand it'],
  likes: ['Tarkovsky', 'xsnkvch', 'defiler'],
});
