import {defineField, defineType} from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule
        .required()
        .error(`Required to generate a page on the website`),
    }),
    defineField({
      name: 'blogCategory',
      type: 'reference',      
      to: [{type: 'blogCategory'}],
    }),   
    defineField({
      name: 'blogAuthor',
      type: 'reference',
      to: [{type: 'blogAuthor'}],
    }),    
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
  ],
})