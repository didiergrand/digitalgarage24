import {defineField, defineType} from 'sanity'

export const about = defineType({
    name: 'about',
    title: 'About',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        type: 'string',
        title: 'Title',
      }),
      defineField({
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        options: {source: 'title'},
        validation: (rule) => rule
          .required()
          .error('Required to generate a page on the website'),
      }),
      defineField({
        name: 'content',
        type: 'array',
        title: 'Content',
        of: [{type: 'block'}],
      }),
      defineField({
        name: 'image1',
        type: 'image',
        title: 'Image',
        options: {
          hotspot: true, // Permettre le recadrage des images
        },
      }),
    ],
  });
  