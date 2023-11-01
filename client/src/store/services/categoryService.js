import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


const categoryService = createApi({
    reducerPath: 'category', //assign unique value
    tagTypes: 'categories',

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/",
        prepareHeaders: (headers, { getState }) => {
          const reducers = getState();
          const token = reducers?.authReducer?.adminToken;
          console.log(token);
          headers.set("authorization", token ? `Bearer ${token}` : "");
          return headers;
        },
      }),
      
    endpoints: (builder) => {
        return {
            create: builder.mutation({   //add , update
                query: (name) => {
                    return {
                      url: "create-category",
                      method: "POST",
                      body: name,
                    }
                  },
                  invalidatesTags: ['categories']
            }),

            get: builder.query({      // fetch
               query: (page) => {
                return {
                  url: `categories/${page}`,
                  method: 'GET'
                }  
               },
               providesTags: ['categories']
            })
        }
    }
});

export const { useCreateMutation, useGetQuery } = categoryService;

 
export default categoryService;