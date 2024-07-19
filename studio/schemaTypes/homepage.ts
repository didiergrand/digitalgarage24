import {defineField, defineType} from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title1',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
    }),
    defineField({
      name: 'title2',
      type: 'string',
    }),
    defineField({
      name: 'title3',
      type: 'string',
    }),
    defineField({
      name: 'line1',
      type: 'number'
    }),
    defineField({
      name: 'line2',
      type: 'number'
    }),
    defineField({
      name: 'line3',
      type: 'number'
    }),
    defineField({
      name: 'slogan1',
      type: 'string',
    }),
    defineField({
      name: 'slogan2',
      type: 'string',
    }),
    defineField({
      name: 'slogan3',
      type: 'string',
    }),
    defineField({
      name: 'image1',
      type: 'image',
    }),
  ],
})