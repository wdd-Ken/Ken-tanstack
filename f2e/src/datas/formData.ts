import type { Step } from "#/types";

export const templateData: Step[] = [
  {
    step: 1,
    fields: [
      {
        id: '1',
        type: 'input',
        name: 'name',
        content: 'Name:',
        required: true,
      },
      {
        id: '2',
        type: 'input',
        name: 'email',
        content: 'Email:',
        required: true,
      },
      {
        id: '3',
        type: 'input',
        name: 'phone',
        content: 'Phone:',
        required: true,
      },
    ]
  },
  {
    step: 2,
    fields: [
      {
        id: '4',
        type: 'input',
        name: 'location',
        content: 'Location:',
        required: true,
      },
      {
        id: '5',
        type: 'input',
        name: 'company',
        content: 'Company:',
        required: true,
      },
    ]
  },
]

// 資料
// const stepData: Step[] = [
//   {
//     step: 1,
//     fields: [
//       {
//         type: 'input',
//         name: 'name',
//         content: 'Name:',
//         required: true,
//       },
//       {
//         type: 'input',
//         name: 'email',
//         content: 'Email:',
//         required: true,
//       },
//       {
//         type: 'input',
//         name: 'phone',
//         content: 'Phone:',
//         required: true,
//       },
//       {
//         type: 'checkbox',
//         name: 'checkbox1',
//         content: 'checkbox1',
//         defaultChecked: true,
//         required: true,
//       },
//       {
//         type: 'checkbox',
//         name: 'checkbox2',
//         content: 'checkbox2',
//         defaultChecked: true,
//         required: true,
//       },
//       {
//         type: 'checkbox',
//         name: 'checkbox3',
//         content: 'checkbox3',
//         defaultChecked: true,
//         required: true,
//       },
//     ],
//   },
//   {
//     step: 2,
//     fields: [
//       {
//         type: 'textarea',
//         name: 'postContent',
//         content: 'Content',
//         defaultValue: '',
//         required: true,
//         id: '',
//       },
//       {
//         type: 'select',
//         name: 'fruits',
//         content: 'choose a fruit',
//         defaultValue: '香蕉',
//         options: [
//           { value: 'banana', text: 'banana', },
//           { value: 'apple', text: 'apple', },
//           { value: 'orange', text: 'orange', },
//         ],
//         required: true,
//       },
//     ],
//   },
//   {
//     step: 3,
//     fields: [
//       {
//         type: 'file',
//         content: 'File',
//         id: '',
//         required: true,
//       },
//       {
//         type: 'radio',
//         content: 'Gender',
//         name: 'gender',
//         options: [
//           { content: '男', value: 'male', defaultChecked: false },
//           { content: '女', value: 'female' },
//         ],
//         required: true,
//       }
//     ],
//   },
//   {
//     step: 4,
//     fields: [
//       {
//         type: 'input',
//         name: 'name',
//         content: 'Name:',
//         required: true,
//       },
//       {
//         type: 'textarea',
//         name: 'postContent',
//         content: 'demo',
//         defaultValue: '',
//         required: true,
//         id: '',
//       },
//     ],
//   },
// ]  