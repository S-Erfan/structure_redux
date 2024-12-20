import { characterApi } from "./apiSlices/characterApi";
import characterSlice from "./slices/characterSlice";

export default {
  characters: characterSlice,
  [characterApi.reducerPath]: characterApi.reducer,
};
