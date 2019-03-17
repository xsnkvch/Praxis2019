let photoPosts = [
    {
        id: '1',
        description: 'Director Stanley Kubrick can make your own living room seem creepy and unfamiliar.',
        createdAt: new Date('2019-03-04T01:59:00'),
        author: 'defiler',
        photoLink: 'images/img1.jpg',
        tags: ['The Shining', 'Stanley Kubrick'],
        likes: ['photographer','defiler','user1']
     },

     {
        id: '2',
        description: '"Stalker" was released in 1979. A guide leads two men through an area known as the Zone to find a room that grants wishes.',
        createdAt: new Date('2019-03-02T10:00:00'),
        author: 'Tarkovsky',
        photoLink: 'images/img2.jpg',
        tags: ['STALKER', 'filming', 'Andrei Tarkovsky'],
        likes: ['Tarkovsky','defiler','user1']
     },

     {
        id: '3',
        description: '',
        createdAt: new Date('2019-03-02T9:59:00'),
        author: 'rnduser',
        photoLink: 'images/img3.jpg',
        tags: ['scientific illustration', 'black', 'arrow'],
        likes: ['Tarkovsky','defiler','user1']
     },

     {
        id: '4',
        description: 'BRUHBERRY',
        createdAt: new Date('2019-03-02T8:00:00'),
        author: 'fash',
        photoLink: 'images/img4.jpg',
        tags: [],
        likes: ['Tarkovsky','defiler']
     },

     {
        id: '5',
        description: 'me rn.',
        createdAt: new Date('2019-02-28T15:35:00'),
        author: 'photographer',
        photoLink: 'images/img5.jpg',
        tags: ['УППППП', 'в', 'последний','день'],
        likes: ['Tarkovsky','defiler','user1']
     },

     {
        id: '6',
        description: 'Error page concept.',
        createdAt: new Date('2019-02-26T01:12:00'),
        author: 'photographer',
        photoLink: 'images/img6.PNG',
        tags: ['defiler', 'yellow', 'up'],
        likes: ['defiler','user1']
     },

     {
        id: '7',
        description: 'T R U T H',
        createdAt: new Date('2019-02-23T10:10:00'),
        author: 'Obschjitie_6',
        photoLink: 'images/img7.jpg',
        tags: ['shestiorka'],
        likes: ['defiler','user1','photographer']
     },

     {
        id: '8',
        description: '',
        createdAt: new Date('2019-03-02T20:36:00'),
        author: 'xnkvch',
        photoLink: 'images/img8.jpg',
        tags: ['shestiorka'],
        likes: ['defiler','user1','photographer']
     },

     {
        id: '9',
        description: '«Плита ограды ПО‑2»\nПроектная организация: «Мосгорстройматериалы»;\nАрхитекторы: коллектив под руководством Б. Лахмана;\nГоды создания: 1970-е (первая половина)',        
        createdAt: new Date('2019-02-21T15:24:00'),
        author: 'sovmod',
        photoLink: 'images/img9.jpg',
        tags: ['sovmod'],
        likes: ['USSR','design','photographer']
     },
     
  ]



let methods = (function() {
	return {
		getPhotoPosts(skip = 0, top = 10, filterConfig) {
			
			if (typeof skip !== 'number' || typeof top !== 'number') {
                return;
            }

            let posts = this;
			
            if (typeof filterConfig === 'object') {
                posts = posts.filter((post) => {
					
					if (filterConfig.hasOwnProperty('date')) {
						if(Date.parse(post.createdAt) < Date.parse(filterConfig.dateBegin) || Date.parse(post.createdAt) > Date.parse(filterConfig.dateEnd))                                                 
                            return false;
					}
                    if (filterConfig.hasOwnProperty('author')) {
                        if (filterConfig.author !== post.author)
                            return false;
                    }
                    if (filterConfig.hasOwnProperty('tags')) {
                        if (!filterConfig.tags.every((tag) => {
                            return post.tags.includes(tag);
                        }))
                            return false;
                    }
                    return true;
                });
            }
            return posts.slice(skip, top + skip);
		},
		
		getPhotoPost(id) {
            if (typeof id !== 'string' || id === '') {
                return;
            }
            return this.find((post) => {
                return post.id === id;
            });
        },
		
		validatePhotoPost(post) {
            if (typeof post !== 'object') {
                return false;
            }
            if (typeof post.id !== 'string' || post.id === '')
                return false;
            if (typeof post.description !== 'string')
                return false;
            if (!(post.createdAt instanceof Date))
                return false;
            if (typeof post.author !== 'string' || post.author === '')
                return false;
            if (typeof post.photoLink !== 'string' || post.photoLink === '')
                return false;
            if (typeof post.tags === 'undefined' || !Array.isArray(post.tags))
                return false;
            if (typeof post.likes === 'undefined' || !Array.isArray(post.likes))
                return false;

            return true;
        },
		
		addPhotoPost(photoPost) {
			if (!this.validatePhotoPost(photoPost))
                return false;
			this.push(photoPost);
			this.sort((post1, post2) => {
                return post2.createdAt - post1.createdAt;
            });
            return true;
		},
		
		editPhotoPost(id, photoPost) {
            if (typeof id !== 'string' || id === '' || typeof photoPost !== 'object') {
                return false;
            }
            let post = this.getPhotoPost(id);
            if (post) {

                if (photoPost.hasOwnProperty('description')) {
                    post.description = photoPost.description;
                }
                if (photoPost.hasOwnProperty('photoLink')) {
                    post.photoLink = photoPost.photoLink;
                }
                if (photoPost.hasOwnProperty('tags')) {
                    post.hashTags = photoPost.tags;
                }
                if (photoPost.hasOwnProperty('likes')) {
                    post.likes = photoPost.likes;
                }
                return true;
            }
            return false;
        },
		
		removePhotoPost(id) {
			if (typeof id !== 'string' || id === '') {
                return false;
            }
			let posts = this;
			for (var i = 0; i < posts.length; ++i) {
				if(posts[i].id === id) {
					posts.splice(i, 1);
            		return true;
				}
			}
			
			return false;
		}
	}
})();	

for (method in methods) {
    photoPosts.__proto__[method] = methods[method];
}


console.log('Verifications:');
console.log('\n');
console.log('getPhotoPosts');
console.log('invalid args: ', photoPosts.getPhotoPosts('arg1','arg2'));
console.log('default args: ', photoPosts.getPhotoPosts());
console.log('skip = 3, default top: ', photoPosts.getPhotoPosts(3));
console.log('skip = 4, top = 4: ', photoPosts.getPhotoPosts(4, 4));
console.log('filter by author=\'defiler\': ', photoPosts.getPhotoPosts(0,3,{author: 'defiler'}));
console.log('\n');
console.log('getPhotoPost:');
console.log('invalid argument: ', photoPosts.getPhotoPost(''));
console.log('id=100 (invalid): ', photoPosts.getPhotoPost('100'));
console.log('id = 3: ', photoPosts.getPhotoPost('3'));
console.log('\n');
console.log('validatePhotoPost:');
console.log('valid post: ', photoPosts.validatePhotoPost({
    id: '10',
    description: 'descript',
    createdAt: new Date('2019-02-23T23:00:00'),
    author: 'auth',
    photoLink: 'images/img1.jpg',
	tags: ['tag1'],
    likes: ['likeuser']
}));
console.log('invalid post: ', photoPosts.validatePhotoPost({
    id: '10',
    description: 'descript',
    createdAt: new Date('2019-02-23T23:00:00'),
    author: 'auth',
    photoLink: null,
	tags: ['tag1'],
    likes: ['likeuser']
}));
console.log('\n');
console.log('addPhotoPost:');
console.log('valid post: ', photoPosts.addPhotoPost({
	id: '21',
    description: 'desc',
    createdAt: new Date('2022-03-05T01:46:00'),
    author: 'person',
    photoLink: 'images/img1.jpg',
    tags: ['hello'],
    likes: []
}));
console.log('invalid post: ', photoPosts.addPhotoPost({
	id: '22',
    description: 'desc',
    createdAt: new Date('2022-03-05T01:46:00'),
    author: 1,
    photoLink: 'images/img1.jpg',
    tags: ['hello'],
    likes: []
}));
console.log('all posts after adding:', photoPosts);
console.log('\n')
console.log('editPhotoPost:');
console.log('post with id=\'1\': ', photoPosts.getPhotoPost('1'));
console.log('edit post with id=\'1\': ', photoPosts.editPhotoPost('1', {
	description: 'edited description'
}));
console.log('edited post with id=\'1\': ', photoPosts.getPhotoPost('1'));
console.log('trying to edit with invalid args: ', photoPosts.getPhotoPost('', 1));
console.log('\n');
console.log('removePhotoPost:');
console.log('remove post with id=\'5\': ', photoPosts.removePhotoPost('5'));
console.log('get post with id=\'5\':', photoPosts.getPhotoPost('5'));
console.log('all posts after removing post:', photoPosts);





