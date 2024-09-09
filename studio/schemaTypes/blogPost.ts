import {defineField, defineType, defineArrayMember} from 'sanity'
import {table} from './table' // Assurez-vous d'importer le type de table

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
      of: [
        {type: 'block'},
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      of: [
        defineArrayMember({
          name: 'textWithIllustration',
          type: 'textWithIllustration',
        }),
        defineArrayMember({
          name: 'gallery',
          type: 'gallery',
        }),
        defineArrayMember({
          name: 'video',
          type: 'video',
        }),
        defineArrayMember({
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
          options: {
            hotspot: true,
          },
        }),
        defineArrayMember({
          name: 'richText',
          type: 'object',
          title: 'Rich Text',
          fields: [
            {
              name: 'content',
              type: 'array',
              of: [{type: 'block'}]
            }
          ]
        }),
        defineArrayMember({
          type: 'table'
        }),
      ],
    }),
  ],
})