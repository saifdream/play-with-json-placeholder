const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

const initialState = {
    isLoading: false,
    post: {},
    isError: false,
    error: ""
};

const featchPostById = createAsyncThunk("post/featchPostById", async (postId) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const post = await response.json();

    return post;
});

const postByIdSlice = createSlice({
    name: "postById",
    initialState,
    extraReducers: builder => {
        builder
            .addCase(featchPostById.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(featchPostById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.post = action.payload;
            })
            .addCase(featchPostById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message || "Something went wrong!";
            })
    }
});

module.exports = postByIdSlice.reducer;
module.exports.featchPostById = featchPostById;