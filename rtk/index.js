const store = require("./app/store");
const { featchPostById } = require("./features/post/postByIdSlice");
const { featchRelatedPosts } = require("./features/relatedPosts/relatedPostSlice");

store.subscribe(() => {
    // console.log(store.getState());
});

store.dispatch(featchPostById(1))
    .unwrap()
    .then(post => {
        console.log("post is: ", post);
        if(post?.title) {
            store.dispatch(featchRelatedPosts(post?.title));
        }
    });