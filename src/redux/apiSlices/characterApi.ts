import { generateQueryStr } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// API endpoint for fetching data
export const characterApi = createApi({
  reducerPath: "characterApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      // * if need Authorization
      //   try {
      //     const token = await getCookie("token");
      //     if (token?.value) {
      //       headers.set("Authorization", `Bearer ${token?.value}`);
      //     }
      //   } catch (error) {
      //     console.log(error, "this is token");
      //   } finally {
      //     return headers;
      //   }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getCharacters: builder.query<any, object>({
      query: (queryParams) => {
        const queryStr = generateQueryStr("character?", queryParams);

        return { url: queryStr };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if (newItems.info.prev === null) {
          return [...newItems];
        }

        currentCache.results.push(...newItems.results);
        currentCache.info = { ...newItems.info };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetCharactersQuery } = characterApi;
