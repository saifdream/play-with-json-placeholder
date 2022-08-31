const store = require("./app/store");
const { featchPostById } = require("./features/post/postByIdSlice");
const { featchRelatedPosts } = require("./features/relatedPosts/relatedPostSlice");

store.subscribe(() => {
    // console.log(store.getState());
});

store.dispatch(featchPostById(1))
    // .unwrap()
    .then(action => {
        console.log("post is: ", action);
        if(action.payload?.title) {
            store.dispatch(featchRelatedPosts(action.payload?.title));
        }
    });