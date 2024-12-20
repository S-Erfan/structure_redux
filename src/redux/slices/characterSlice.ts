import api from "@/services/api";
import { generateQueryStr } from "@/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

export interface ICharacter {
  results: object[];
  info: object;
  isLoading: boolean;
  isError: boolean;
  error: any | null;
}

const initialState: ICharacter = {
  results: [],
  info: {},
  error: null,
  isLoading: false,
  isError: false,
};

// AsyncThunk to fetch characters with query filters
// export const fetchCharacters = createAsyncThunk(
//   "characters/fetchCharacters",
//   async (queryParams: Record<string, string>, { rejectWithValue }) => {
//     try {
//       const queryString = new URLSearchParams(queryParams).toString();
//       const response = await axios.get(
//         `https://rickandmortyapi.com/api/character?${queryString}`
//       );
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Failed to fetch data");
//     }
//   }
// );

export const getListCharacters = createAsyncThunk(
  "characters_get_req",
  async (
    queryParams: { page: number },
    { rejectWithValue, getState, dispatch, fulfillWithValue, extra }
  ) => {
    console.log(getState(), "get state method");
    console.log(extra, "get extra property");
    const queryStr = generateQueryStr("character?", queryParams);
    console.log(queryStr);
    try {
      dispatch(dispatch(setLoader(true)));
      const response = await api.get(queryStr);
      console.log(response);
      // fulfillWithValue(response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error || "Failed to fetch data");
    } finally {
      dispatch(dispatch(setLoader(false)));
    }
  }
);

const characterSlice = createSlice({
  name: "Character_Slice",
  initialState,
  reducers: {
    // manage/control the currIndex value
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListCharacters.fulfilled, (state, action) => {
        if (action.payload.results && Array.isArray(action.payload.results)) {
          console.log(state.results, "state in fulfilled")
          state.results.push(...action.payload.results);
        }
        if (
          action.payload.info &&
          Object.keys(action.payload.info).length > 0
        ) {
          state.info = action.payload.info;
        }
      })
      .addCase(getListCharacters.rejected, (state, action) => {
        let err = action.payload; // Store the error message
        state.error = err;
        state.isError = true;
        console.log("err", err);
      });
  },
});

export const { setLoader } = characterSlice.actions;
export default characterSlice.reducer;
