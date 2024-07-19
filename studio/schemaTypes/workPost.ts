import {defineField, defineType} from 'sanity'

export const workPost = defineType({
  name: 'workPost',
  title: 'Work Post',
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
      name: 'workCategory',
      type: 'reference',      
      to: [{type: 'workCategory'}],
    }),   
    defineField({
      name: 'workAuthor',
      type: 'reference',
      to: [{type: 'workAuthor'}],
    }),    
    defineField({
      name: 'thumbnail',
      type: 'image',
    }), 
    defineField({
      name: 'mainimage',
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