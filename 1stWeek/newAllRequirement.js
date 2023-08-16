const fetch = require("node-fetch");
const fs = require('fs');
const apiUrl = 'https://jsonplaceholder.typicode.com';

async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (e) {
        console.error(e.message);
        throw e;
    }
}

async function fetchAllData() {
    try {
        const [users, posts, comments] = await Promise.all([
            fetchData(`${apiUrl}/users`),
            fetchData(`${apiUrl}/posts`),
            fetchData(`${apiUrl}/comments`)
        ]);
        return [users, posts, comments];
    } catch (e) {
        console.error(e.message);
        throw e;
    }
}

(async () => {
    try {
        const [users, posts, comments] = await fetchAllData();

        //TODO: Requirement 3: Get all the posts and comments from the API. Map the data with the users array.
        const usersData = users.map(user => {
            const userPosts = posts
                .filter(post => post.userId === user.id)
                .map(post => ({id: post.id, title: post.title, body: post.body}));

            const userComments = comments
                .filter(comment => userPosts.some(post => post.id === comment.postId))
                .map(comment => ({id: comment.id, postID: comment.postId, name: comment.name ,body: comment.body}));

            return {
                idUser: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                comments123: userComments,
                posts123: userPosts
            };
        });
        fs.writeFileSync('./requirement3.json', JSON.stringify(usersData, null, 2));
        console.log('Requirement 3 Done');

        //TODO: Requirement 4: Filter only users with more than 3 comments
        const usersMore3Comments = users
            .map(user => {
                const userPosts = posts.filter(post => post.userId === user.id);
                const userComments = comments.filter(comment => userPosts.some(post => post.id === comment.postId));

                return {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    comments: userComments,
                    posts: userPosts
                };
            })
            .filter(user => user.comments.length > 3);

        fs.writeFileSync('./requirement4.json', JSON.stringify(usersMore3Comments, null, 2));
        console.log('Requirement 4 Done');

        //TODO: Requirement 5: Reformat the data with the count of comments and posts
        const usersCountPostsCommentsData = users.map(user => {
            const userPosts = posts.filter(post => post.userId === user.id);
            const userComments = comments.filter(comment => userPosts.some(post => post.id === comment.postId));

            return {
                idUser: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                comments123: userComments.length,
                posts123: userPosts.length
            };
        });

        fs.writeFileSync('./requirement5.json', JSON.stringify(usersCountPostsCommentsData, null, 2));
        console.log('Requirement 5 Done');
        //TODO: Requirement 6 :Who is the user with the most comments/posts?
        let mostActiveUser = {
            id: null,
            name: '',
            username: '',
            email: '',
            commentCount: 0,
            postCount: 0,
        };

        users.forEach(user => {
            const userPosts = posts.filter(post => post.userId === user.id);
            const userComments = comments.filter(comment => userPosts.some(post => post.id === comment.postId));

            if (userPosts.length + userComments.length > mostActiveUser.commentCount + mostActiveUser.postCount) {
                mostActiveUser = {
                    IDUser: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    commentCount: userComments.length,
                    postCount: userPosts.length
                }
            }
        })
        fs.writeFileSync('./requirement6.json', JSON.stringify(mostActiveUser, null, 2));
        console.log('Requirement 6 Done');
        //TODO: Requirement 7: Sort the list of users by the postsCount value descending?
        const userData = users.map(user => {
            const userPosts = posts.filter(post => post.userId === user.id);

            return {
                id: user.id,
                name: user.name,
                postsCount: userPosts.length
            };

        })
        const sortedUsers = userData.sort((a, b) => b.postCount - a.postCount);
        fs.writeFileSync('./requirement7.json', JSON.stringify(sortedUsers, null, 2));
        console.log('Requirement 7 Done');

        //TODO: Requirement 8: Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request.
        const idPost = 1;
        const [postsOfID1, commentsofID1] = await Promise.all([
            fetchData(`${apiUrl}/posts/${idPost}`),
            fetchData(`${apiUrl}/posts/${idPost}/comments`)
        ]);
        const postWithComments = {post: postsOfID1, comments: commentsofID1};

        fs.writeFileSync('./requirement8.json', JSON.stringify(postWithComments, null, 2));
        console.log('Requirement 8 Done');
    } catch (e) {
        console.error(e.message);
    }
})();