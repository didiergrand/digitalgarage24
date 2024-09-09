import {defineType, defineField} from 'sanity'

export const table = defineType({
  name: 'table',
  type: 'object',
  title: 'Table',
  fields: [
    defineField({
      name: 'rows',
      type: 'array',
      title: 'Rows',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'cells', type: 'array', of: [{type: 'string'}]}
          ]
        }
      ]
    })
  ]
})