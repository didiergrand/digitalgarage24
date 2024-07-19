import {defineField, defineType} from 'sanity'

export const blogAuthor = defineType({
  name: 'blogAuthor',
  title: 'Blog Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
  ],
})