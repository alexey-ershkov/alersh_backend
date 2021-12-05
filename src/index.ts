import { Octokit } from '@octokit/core';
import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { Repo } from './models';
import { Message } from './models/declarations/message';
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

server.post('/message', (req, resp) => {
  const { name, message }: Message = req.body;

  const htmlMessageString = `\n\n🗿 ${name}\n📝 <pre>${message}</pre>\n\n`;

  const url = encodeURI(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}&parse_mode=html&text=${htmlMessageString}`,
  );

  axios
    .post(url, {})
    .then(() => {
      resp.sendStatus(200);
    })
    .catch((e) => {
      console.log(e);
      resp.send(e);
    });
});

console.log(`Server listening on port ${PORT}`);
server.listen(PORT);
