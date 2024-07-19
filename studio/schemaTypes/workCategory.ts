import {defineField, defineType} from 'sanity'

export const workCategory = defineType({
  name: 'workCategory',
  title: 'Work Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
  ],
})