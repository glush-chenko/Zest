import { TodoistApi } from "@doist/todoist-api-typescript"
import axios from "axios";

export const api = new TodoistApi("987419bef49851141a05a4e5e28878f91489c0b4");

// export async function getTodoistProjects(apiToken: string): Promise<any[]> {
//     const response = await fetch('https://api.todoist.com/sync/v9/sync', {
//         headers: {
//             // 'Content-Type': 'application/json',
//             'Authorization': `Bearer ${apiToken}`,
//         },
//     });
//     return await response.json();
// }

fetch('https://api.todoist.com/rest/v2/projects', {
    headers: {
        'Authorization': 'Bearer 987419bef49851141a05a4e5e28878f91489c0b4'
    }
})
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log('Response:', data);
    })


const config = {
    url: 'https://api.todoist.com/sync/v9/sync',
    method: 'post',
    headers: {
        'Authorization': 'Bearer 987419bef49851141a05a4e5e28878f91489c0b4'
    },
    data: {
        sync_token: '*',
        resource_types: '["all"]'
    }
};

axios(config)
    .then(response => {
        console.log('Status:', response.status);
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });