import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.sass';
import App from './app';
import reportWebVitals from './reportWebVitals';

const fakeData = {
  "1234567": {
    name: 'To-do',
    color: '#cccccc',
    tasks: [
      {
        id: '12345',
        title: 'Translate repository tildacc_front_integs',
        desc: 'Separate all phrases in special dictionary file',
        tags: [
          {
            name: 'dict',
            color: 'red'
          }
        ]
      },
      {
        id: '123456',
        title: 'Help new frontend developer with his tak',
        desc: 'Describe how to create dictionaries and check his work',
        tags: [
          {
            name: 'mentoring',
            color: 'green'
          }
        ]
      },
    ]
  },
  "42385798": {
    name: "In progress",
    color: '#12c62a',
    tasks: [
      {
        id: '123456',
        title: 'Help new frontend developer with his tak',
        desc: 'Describe how to create dictionaries and check his work',
        tags: [
          {
            name: 'mentoring',
            color: 'green'
          }
        ]
      },
    ]
  },
  "324989439": {
    name: "Complete",
    color: '#1036e1',
    tasks: [
      {
        id: '12345',
        title: 'Translate repository tildacc_front_integs',
        desc: 'Separate all phrases in special dictionary file',
        tags: [
          {
            name: 'dict',
            color: 'red'
          }
        ]
      },
      {
        id: '123456',
        title: 'Help new frontend developer with his tak',
        desc: 'Describe how to create dictionaries and check his work',
        tags: [
          {
            name: 'mentoring',
            color: 'green'
          }
        ]
      },
    ]
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App tasks={fakeData}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
