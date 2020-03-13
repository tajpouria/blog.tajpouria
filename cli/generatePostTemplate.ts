import fs from 'fs';
import { render } from 'mustache';
import path from 'path';
import prompts, { PromptObject } from 'prompts';

const questions = [
  {
    message: 'What is your post title?',
    name: 'title',
    type: 'text',
    validate: title => (!title.trim() ? 'Title is required!' : true),
  },
  {
    message: 'What is your post description?',
    name: 'description',
    type: 'text',
  },
  {
    format: date => date.toISOString(),
    initial: new Date(),
    message: 'What is your posting date?',
    name: 'date',
    type: 'date',
  },
  {
    message:
      'Wanna include a cover image? (e.g. https://source.unsplash.com/collection/190727/1600x900)',
    name: 'imageSrc',
    type: 'text',
  },
] as Array<PromptObject<string>>;

((templatePath: string, pathToWriteBlogOn: string) => {
  fs.readFile(templatePath, 'UTF-8', async (readErr, rawTemplate) => {
    if (readErr) {
      throw readErr;
    }

    const response = await prompts(questions);

    Object.keys(response).forEach(key => {
      if (!response[key]) {
        delete response[key];
      }
    });

    const postTemp = render(rawTemplate, response);

    fs.mkdir(`${pathToWriteBlogOn}/${response.title}`, mkdirErr => {
      if (mkdirErr) {
        throw mkdirErr;
      }

      fs.writeFile(
        `${pathToWriteBlogOn}/${response.title}/index.md`,
        postTemp,
        writeErr => {
          if (writeErr) {
            throw writeErr;
          }
        },
      );
    });
  });
})(
  path.resolve(__dirname, 'postTemplate.mustache'),
  path.resolve(__dirname, '../content/blog'),
);
