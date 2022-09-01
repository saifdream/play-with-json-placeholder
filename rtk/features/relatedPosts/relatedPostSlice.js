const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

const initialState = {
    isLoading: false,
    relatedPosts: [],
    isError: false,
    error: ""
};

const featchRelatedPosts = createAsyncThunk("posts/featchRelatedPosts", async (title) => {
    let queryStr = '';
    if(title) {
        const filterStr = title.split(' ').join('&title_like=');
        queryStr = `title_like=${filterStr}`;
    }

    console.log("queryStr is: ", queryStr)

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?${queryStr}`);
    const posts = await response.json();

    return posts;
});

const relatedPostsSlice = createSlice({
    name: "relatedPosts",
    initialState,
    extraReducers: builder => {
        builder
            .addCase(featchRelatedPosts.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(featchRelatedPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.relatedPosts = action.payload;
            })
            .addCase(featchRelatedPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message || "Something went wrong!";
            })
    }
});

module.exports = relatedPostsSlice.reducer;
module.exports.featchRelatedPosts = featchRelatedPosts;