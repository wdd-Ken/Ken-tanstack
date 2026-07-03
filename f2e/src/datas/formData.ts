import type { Step } from "#/types";

export const templateData: Step[] = [
  {
    step: 1,
    fields: [
      {
        id: 'input1',
        type: 'input',
        name: 'name',
        content: 'Name:',
        required: true,
      },
      {
        id: 'input2',
        type: 'input',
        name: 'email',
        content: 'Email:',
        required: true,
      },
      {
        id: 'input3',
        type: 'input',
        name: 'phone',
        content: 'Phone:',
        required: true,
      },
      {
        id: 'text1',
        type: 'textarea',
        name: 'text',
        content: 'Content:',
        defaultValue: '',
        required: true,
      },
      {
        type: 'checkbox-group', // form欄位種類判斷
        id: 'hobbyId', // checkbox group id 
        content: 'Hobbies:', // UI名稱
        name: 'hobbies',  // 資料欄位
        options: [
          {
            id: 'design', 
            name: 'design',
            content: 'Design',
            checkedValue: 'Y',
            uncheckedValue: 'N',
            defaultChecked: false,
          },
          {
            id: 'frontend',
            name: 'frontend',
            content: 'Frontend',
            checkedValue: '1',
            uncheckedValue: '0',
            defaultChecked: false,
          },
        ]
      },
    ]
  },
  {
    step: 2,
    fields: [
      {
        id: 'select1',
        type: 'select',
        name: 'fruits',
        content: 'Choose a fruit',
        defaultValue: '香蕉',
        options: [
          { value: 'banana', text: 'banana', },
          { value: 'apple', text: 'apple', },
          { value: 'orange', text: 'orange', },
        ],
        required: true,
      },
      {
        id: 'radio1',
        type: 'radio',
        content: 'Gender',
        name: 'gender',
        options: [
          { content: '男', value: 'male', defaultChecked: false },
          { content: '女', value: 'female' },
        ],
      },
    ]
  },
  {
    step: 3,
    fields: [
      {
        type: 'file',
        content: 'File',
        name: 'uploadFile',
        id: '',
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