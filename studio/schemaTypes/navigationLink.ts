import {defineField, defineType} from 'sanity'

export const navigationLink = defineType({
  name: 'navigationLink',
  title: 'NavigationLink',
  type: 'document',
  fields: [
    defineField({
      name: 'linkName',
      type: 'string',
    }),
    defineField({
      name: 'linkUrl',
      type: 'string',
    }),
  ],
})