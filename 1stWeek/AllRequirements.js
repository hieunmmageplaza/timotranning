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
async function getCustomerData() {
    try {
        const [users, posts, comments] = await Promise.all([
            fetchData(`${apiUrl}/users`),
            fetchData(`${apiUrl}/posts`),
            fetchData(`${apiUrl}/comments`)
        ]);

        const usersData = users.map(user => {
            const userPosts = posts
                .filter(post => post.userId === user.id)
                .map(post => ({
                    id: post.id,
                    title: post.title,
                    body: post.body
                }));

            const userComments = comments
                .filter(comment => userPosts.some(post => post.id === comment.postId))
                .map(comment => ({
                    id: comment.id,
                    postId: comment.postId,
                    name: comment.name,
                    body: comment.body
                }));

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
        // console.log(JSON.stringify(usersData, null, 2));
    } catch (e) {
        console.error(e.message);
    }
}

async function filterUserMore3Commands() {
    try {
        const [users, posts, comments] = await Promise.all([
            fetchData(`${apiUrl}/users`),
            fetchData(`${apiUrl}/posts`),
            fetchData(`${apiUrl}/comments`)
        ]);

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

        // console.log(JSON.stringify(usersMore3Comments, null, 2));
        fs.writeFileSync('./requirement4.json', JSON.stringify(usersMore3Comments, null, 2));
    } catch (e) {
        console.error(e.message);
    }
}

async function organizeData() {
    try {
        const [users, posts, comments] = await Promise.all([
            fetchData(`${apiUrl}/users`),
            fetchData(`${apiUrl}/posts`),
            fetchData(`${apiUrl}/comments`)
        ]);

        const usersData = users.map(user => {
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

        // console.log(JSON.stringify(usersData, null, 2));
        fs.writeFileSync('./requirement5.json', JSON.stringify(usersData, null, 2));

    } catch (e) {
        console.error(e.message);
    }
}

async function getTheFirstOneWithPost() {
    try {
        const [users, posts, comments] = await Promise.all([
            fetchData(`${apiUrl}/users`),
            fetchData(`${apiUrl}/posts`),
            fetchData(`${apiUrl}/comments`)
        ]);

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

    } catch (e) {
        console.error(e.message);
    }
}

async function sortUsersByPostsCount() {
    try {
        const [users, posts, comments] = await Promise.all([
            fetchData(`${apiUrl}/users`),
            fetchData(`${apiUrl}/posts`),
            fetchData(`${apiUrl}/comments`)
        ]);
        const userData = users.map(user => {
            const userPosts = posts.filter(post => post.userId === user.id);

            return {
                id: user.id,
                name: user.name,
                postsCount: userPosts.length
            };

        })
        const sortedUsers = userData.sort((a, b) => b.postCount - a.postCount);
        // const sortedUsers = userData.sort((a, b) => b.id - a.id);

        fs.writeFileSync('./requirement7.json', JSON.stringify(sortedUsers, null, 2));
    } catch (e) {
        console.error(e.message);
    }
}

async function getPostWithComments(postId) {
    try {
        const postResponse = await fetch(`${apiUrl}/posts/${postId}`);
        const post = await postResponse.json();

        const commentsResponse = await fetch(`${apiUrl}/posts/${postId}/comments`);
        const comments = await commentsResponse.json();

        // console.log(JSON.stringify(usersData, null, 2));
        post.comments = comments;

        return fs.writeFileSync('./requirement8.json', JSON.stringify(post, null, 2));

    } catch (e) {
        console.error(e.message);
    }
}
//Requirement 3: Get all the posts and comments from the API. Map the data with the users array.
getCustomerData();

//Requirement 4: Filter only users with more than 3 comments.
filterUserMore3Commands();

//Requirement 5: Reformat the data with the count of comments and posts
organizeData();

// Requirement 6 :Who is the user with the most comments/posts?
getTheFirstOneWithPost();

//Requirement 7: Sort the list of users by the postsCount value descending?
sortUsersByPostsCount();

//Requirement 8: Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request.?
getPostWithComments(1);
