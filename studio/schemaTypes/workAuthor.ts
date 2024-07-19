import {defineField, defineType} from 'sanity'

export const workAuthor = defineType({
  name: 'workAuthor',
  title: 'Work Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
  ],
})