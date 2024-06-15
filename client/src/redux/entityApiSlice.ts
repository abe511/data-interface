import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const entityApi = createApi({
  reducerPath: "entityApi",
  baseQuery: fetchBaseQuery({baseUrl: `${BASE_URL}/api/data/`}),
  tagTypes: ["Entity"],
  endpoints: (builder) => ({
    getEntities: builder.query<Entity[] | [], void>({
      query: () => "/entities",
      providesTags: ["Entity"],
        // providesTags: (result) =>
        // result
        //   ? [
        //       ...result.map(({ id }) => ({ type: "Entity" as const, id })),
        //       { type: "Entity", id: "LIST" },
        //     ]
        //   : [{ type: "Entity", id: "LIST" }],
    }),
    getSelectedEntities: builder.query<Entity[] | [], Coords>({
      query: (params) => ({
        url: "/entities",
        params: params
      }),
      providesTags: ["Entity"],
      // providesTags: (result) =>
      //   result
      //     ? [
      //         ...result.map(({ id }) => ({ type: "Entity" as const, id })),
      //         { type: "Entity", id: "LIST" },
      //       ]
      //     : [{ type: "Entity", id: "LIST" }],
    }),
    addEntity: builder.mutation<Entity, NewEntity>({
      query: (newEntity) => ({
        url: "/entity",
        method: "POST",
        body: newEntity,
      }),
      invalidatesTags: ["Entity"],
    }),
    updateEntity: builder.mutation<Entity, Entity>({
      query: (updatedEntity) => ({
        url: `/entity/${updatedEntity.id}`,
        method: "PUT",
        body: updatedEntity,
      }),
      invalidatesTags: ["Entity"],
    }),
    deleteEntity: builder.mutation<{status: string, id: string}, string>({
      query: (id) => ({
        url: `/entity/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Entity"],
    }),
  }),
});

export const { useGetEntitiesQuery, useGetSelectedEntitiesQuery, useAddEntityMutation, useUpdateEntityMutation, useDeleteEntityMutation } = entityApi;
