const { configureStore } = require("@reduxjs/toolkit");
const { createLogger } = require("redux-logger");
const postReducer = require("../features/post/postByIdSlice");
const relatedPostsReducer = require("../features/relatedPosts/relatedPostSlice");

const logger = createLogger();
const store = configureStore({
    reducer: {
        post: postReducer,
        relatedPosts: relatedPostsReducer,
    }, 
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(logger)
});

module.exports = store;