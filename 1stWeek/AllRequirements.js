// const fetch = require("node-fetch");
// const fs = require('fs');
// const apiUrl = 'https://jsonplaceholder.typicode.com';
// async function fetchData(url) {
//     try {
//         const response = await fetch(url);
//         return await response.json();
//     } catch (e) {
//         console.error(e.message);
//         throw e;
//     }
// }
//
// async function fetchAllData() {
//     try {
//         const [users, posts, comments] = await Promise.all([
//             fetchData(`${apiUrl}/users`),
//             fetchData(`${apiUrl}/posts`),
//             fetchData(`${apiUrl}/comments`)
//         ]);
//         return [users, posts, comments];
//     } catch (e) {
//         console.error(e.message);
//         throw e;
//     }
// }
// async function writeJsonFile(filename, data) {
//     try {
//         fs.writeFileSync(filename, JSON.stringify(data, null, 2));
//     } catch (e) {
//         console.error(e.message);
//     }
// }
//
// //Requirement 3: Get all the posts and comments from the API. Map the data with the users array.
// async function getCustomerData() {
//     try {
//         const [users, posts, comments] = await fetchAllData();
//
//         const usersData = users.map(user => {
//             const userPosts = posts
//                 .filter(post => post.userId === user.id)
//                 .map(post => ({
//                     id: post.id,
//                     title: post.title,
//                     body: post.body
//                 }));
//
//             const userComments = comments
//                 .filter(comment => userPosts.some(post => post.id === comment.postId))
//                 .map(comment => ({
//                     id: comment.id,
//                     postId: comment.postId,
//                     name: comment.name,
//                     body: comment.body
//                 }));
//
//             return {
//                 idUser: user.id,
//                 name: user.name,
//                 username: user.username,
//                 email: user.email,
//                 comments123: userComments,
//                 posts123: userPosts
//             };
//         });
//         fs.writeFileSync('./requirement3.json', JSON.stringify(usersData, null, 2));
//     } catch (e) {
//         console.error(e.message);
//     }
// }
//
// (async () => {
//     try {
//         await getCustomerData();
//     } catch (e) {
//         console.error(e.message);
//     }
// })();
//
// //Requirement 4: Filter only users with more than 3 comments.
// async function filterUserMore3Commands() {
//     try {
//         const [users, posts, comments] = await fetchAllData();
//
//
//         const usersMore3Comments = users
//             .map(user => {
//                 const userPosts = posts.filter(post => post.userId === user.id);
//                 const userComments = comments.filter(comment => userPosts.some(post => post.id === comment.postId));
//
//                 return {
//                     id: user.id,
//                     name: user.name,
//                     username: user.username,
//                     email: user.email,
//                     comments: userComments,
//                     posts: userPosts
//                 };
//             })
//             .filter(user => user.comments.length > 3);
//
//         fs.writeFileSync('./requirement4.json', JSON.stringify(usersMore3Comments, null, 2));
//     } catch (e) {
//         console.error(e.message);
//     }
// }
//
// //Requirement 5: Reformat the data with the count of comments and posts
//
// async function organizeData() {
//     try {
//         const [users, posts, comments] = await fetchAllData();
//
//         const usersData = users.map(user => {
//             const userPosts = posts.filter(post => post.userId === user.id);
//             const userComments = comments.filter(comment => userPosts.some(post => post.id === comment.postId));
//
//             return {
//                 idUser: user.id,
//                 name: user.name,
//                 username: user.username,
//                 email: user.email,
//                 comments123: userComments.length,
//                 posts123: userPosts.length
//             };
//         });
//
//         fs.writeFileSync('./requirement5.json', JSON.stringify(usersData, null, 2));
//
//     } catch (e) {
//         console.error(e.message);
//     }
// }
//
// // Requirement 6 :Who is the user with the most comments/posts?
// async function getTheFirstOneWithPost() {
//     try {
//         const [users, posts, comments] = await fetchAllData();
//
//         let mostActiveUser = {
//             id: null,
//             name: '',
//             username: '',
//             email: '',
//             commentCount: 0,
//             postCount: 0,
//         };
//
//         users.forEach(user => {
//             const userPosts = posts.filter(post => post.userId === user.id);
//             const userComments = comments.filter(comment => userPosts.some(post => post.id === comment.postId));
//
//             if (userPosts.length + userComments.length > mostActiveUser.commentCount + mostActiveUser.postCount) {
//                 mostActiveUser = {
//                     IDUser: user.id,
//                     name: user.name,
//                     username: user.username,
//                     email: user.email,
//                     commentCount: userComments.length,
//                     postCount: userPosts.length
//                 }
//             }
//         })
//         fs.writeFileSync('./requirement6.json', JSON.stringify(mostActiveUser, null, 2));
//
//     } catch (e) {
//         console.error(e.message);
//     }
// }
//
// //Requirement 7: Sort the list of users by the postsCount value descending?
// async function sortUsersByPostsCount() {
//     try {
//         const [users, posts] = await fetchAllData();
//
//         const userData = users.map(user => {
//             const userPosts = posts.filter(post => post.userId === user.id);
//
//             return {
//                 id: user.id,
//                 name: user.name,
//                 postsCount: userPosts.length
//             };
//
//         })
//         const sortedUsers = userData.sort((a, b) => b.postCount - a.postCount);
//         writeJsonFile('./requirement7.json', sortedUsers);
//     } catch (e) {
//         console.error(e.message);
//     }
// }
//
// //Requirement 8: Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request.
// async function getPostWithComments(postId) {
//     try {
//         const [comments, posts ] = await fetchAllData();
//         const post = posts.find(post => post.id === postId);
//
//         if (post) {
//             const postComments = comments.filter(comment => comment.postId === postId);
//
//             post.comments = postComments;
//
//             return writeJsonFile('./requirement8.json',post);
//         } else {
//             console.error(`Post with ID ${postId} not found.`);
//         }
//     } catch (e) {
//         console.error(e.message);
//     }
// }