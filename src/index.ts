import { Octokit } from '@octokit/core';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { Repo } from './models';
import notAllowedReposList from './notAllowedReposList';

dotenv.config();
const PORT = process.env.PORT || 3010;
const octokit = new Octokit({ auth: process.env.GITHUB_AUTH_TOKEN });

const server = express();
server.use(cors());
server.use(bodyParser.json());

server.get('/', async (req, resp) => {
  const githubResp = await octokit.request('GET /user/repos', {
    type: 'owner',
    sort: 'pushed',
    per_page: 100,
  });
  const filteredData: Repo[] = githubResp.data
    .filter((data) => !notAllowedReposList.includes(data.name))
    .map((data) => ({
      url: data.html_url,
      name: data.name,
      updatedAt: data.updated_at,
      description: data.description,
      user: {
        avatarUrl: data.owner.avatar_url,
        login: data.owner.login,
        url: data.owner.html_url,
      },
    }));
  resp.json(filteredData);
});

console.log(`Server listening on port ${PORT}`);
server.listen(PORT);
