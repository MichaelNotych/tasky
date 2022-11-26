import {Editor, EditorState, convertToRaw} from 'draft-js';
import { useState } from 'react';
import { request, gql } from 'graphql-request';

import styles from './task-template.module.sass'



const query = gql`
    query Tasks {
        tasks {
            createdAt
            desc
            id
            publishedAt
            title
            updatedAt
        }
    }
`;

const createTask = function(title, desc) {
    return ( 
        gql`
        mutation MyMutation {
            createTask(data: {title: ${title}, desc: ${desc}}) {
                id
            }
        }
    `);
}

const publishTask = function(id) {
    return (
        gql`
        mutation MyMutation {
            publishTask(where: {id: ${id}}) {
                id
            }
        }
    `);
}

const deleteTask = function(id) {
    return (
        gql`
        mutation MyMutation {
            deleteTask(where: {id: "clabj6i3kfxu30amf35b2bg0s"}) {
                id
            }
        }
    `);
}

const updateTask = function(id, title = '', desc = '') {
    if (title === '' && desc === '') return false

    return (
        gql`
        mutation MyMutation {
            updateTask(data: {${title ? ('title: "' + title + '"') : ''} ${desc ? (', desc: "' + desc + '"') : ''}"}, where: {id: ${id}})
        }
    `);
}

// //publish
// mutation MyMutation {
//   publishTask(where: {id: "clabj04jmford0bmka4673uv2"}) {
//     id
//   }
// }

// //create
// mutation MyMutation {
//   createTask(data: {title: "llll", desc: "kkk"}) {
//     id
//   }
// }

// //delete
// mutation MyMutation {
//   deleteTask(where: {id: "clabj6i3kfxu30amf35b2bg0s"}) {
//     id
//   }
// }

// //update
// mutation MyMutation {
//   updateTask(data: {title: "mkmkmk"}, where: {id: "clabj6i3kfxu30amf35b2bg0s"})
// }


const getData = async (query, variables) => {
    const response = await fetch(
        `https://api-eu-west-2.hygraph.com/v2/clabidu8i46te01um6fvw91mt/master`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjgxOTc0OTQsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2xhYmlkdThpNDZ0ZTAxdW02ZnZ3OTFtdC9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiM2VjZWU2YWYtOTJkYy00OGNhLThhNjUtZTIwMjc2OGIxN2YwIiwianRpIjoiY2xhY3hwc2R2MHB0NTAxdDdjZGd5OHcxcyJ9.IqUBHaIwUNE0ovRwrdr-fW8y-_JqyA13wJhb1H8kj29r0k6h2O22uX_vT0gqp6obASMQz5efe1Gz2IJWP7RHtRYWwjFL8oXgA35AgXLvJ_yUI2wLfj43woVGlAE9kxLNeqSOxvY4eBhf5yIVmLjH_NIukM5-8TOKHupKFxSENzpFNVRKAE-TSrzrTzGj21oTPFxBcbnR03-GIb75Ijl3L5-VCor49pZ90W3SLEgaZkDpTApYGmiIwFYQpTnXJn5_2M86f7pe6T52WZUDvuJkLeZRyw0IgTlfU7OgokP0MBU-GergFroqj6TpGatWkBIpHtQz5O9rk5AZPKAbSaWLUmf33mceuhksXa1mMBY6eySra0X1nyED2LjevKUqe35Jq8fOXvJdUVuidzzC4F202WBNhUdWA9Qdmum2vEuxlsobkcJH0vjzjJ8NB3FL_exruP9tyKZoe1-9X3B7-X3VWVF1ejKrKvotqeQv-Ssa5XbQE7oXEFIpviv3FGSJFldH0YJ5aUk6VaMIV_tc8kA3lnYvioYd346Ky538JqtNTCilvIvcr_alivKaPmjLSgepy4SukpSZTmFjfzobWq6oj0ndiS_TyyjP1_XSVdYnm1EL1stCRU6sgvl-_VBkkFoTEiOA7FF1l9fZTr9Ca5waepm7gH5ezl18seN4ajB3PPA`,
            "content-type": "application/json",
          },
          body: JSON.stringify({ query, variables }),
        },
      ).then((response) => {
            console.log(response.json())
    });

};

function TaskTemplate({id, title, tags, desc}) {
        
    const clickHandler = async (e) => {
        const template = e.target.closest('.template');

        const title = template.querySelector('.title').value;
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const desc = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');

        console.log(title, desc)

        const query = gql`
        mutation createTask($title: String!, $desc: String!) {
            createTask(data: {title: $title, desc: $desc}) {
                id
            }
        }`;

        const variables = { title: title, desc: desc};

       // getData(query, variables);

        const response = await fetch(
            `https://api-eu-west-2.hygraph.com/v2/clabidu8i46te01um6fvw91mt/master`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjgxOTc0OTQsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2xhYmlkdThpNDZ0ZTAxdW02ZnZ3OTFtdC9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiM2VjZWU2YWYtOTJkYy00OGNhLThhNjUtZTIwMjc2OGIxN2YwIiwianRpIjoiY2xhY3hwc2R2MHB0NTAxdDdjZGd5OHcxcyJ9.IqUBHaIwUNE0ovRwrdr-fW8y-_JqyA13wJhb1H8kj29r0k6h2O22uX_vT0gqp6obASMQz5efe1Gz2IJWP7RHtRYWwjFL8oXgA35AgXLvJ_yUI2wLfj43woVGlAE9kxLNeqSOxvY4eBhf5yIVmLjH_NIukM5-8TOKHupKFxSENzpFNVRKAE-TSrzrTzGj21oTPFxBcbnR03-GIb75Ijl3L5-VCor49pZ90W3SLEgaZkDpTApYGmiIwFYQpTnXJn5_2M86f7pe6T52WZUDvuJkLeZRyw0IgTlfU7OgokP0MBU-GergFroqj6TpGatWkBIpHtQz5O9rk5AZPKAbSaWLUmf33mceuhksXa1mMBY6eySra0X1nyED2LjevKUqe35Jq8fOXvJdUVuidzzC4F202WBNhUdWA9Qdmum2vEuxlsobkcJH0vjzjJ8NB3FL_exruP9tyKZoe1-9X3B7-X3VWVF1ejKrKvotqeQv-Ssa5XbQE7oXEFIpviv3FGSJFldH0YJ5aUk6VaMIV_tc8kA3lnYvioYd346Ky538JqtNTCilvIvcr_alivKaPmjLSgepy4SukpSZTmFjfzobWq6oj0ndiS_TyyjP1_XSVdYnm1EL1stCRU6sgvl-_VBkkFoTEiOA7FF1l9fZTr9Ca5waepm7gH5ezl18seN4ajB3PPA`,
                "content-type": "application/json",
              },
              body: JSON.stringify({ query, variables }),
            },
          ).then((response) => {
                console.log(response.json())
        });
    }
    
    //getData()
    


    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    return (
        <div className={`${styles.template} template`}>
            <input className={`${styles.template__title} title`} type="text" value={title || ''} placeholder="Task title" onChange={() => 'hello'}/>
            <div className={styles.template__desc}>
                <Editor editorState={editorState} onChange={setEditorState} />
            </div>
            <button className={styles.template__btn} onClick={clickHandler}>Add Task</button>
        </div>
    )
}

export default TaskTemplate