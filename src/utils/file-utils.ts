import * as fs from 'fs';
import * as pathLib from 'path';

export function readFile(path: string, options: { json?: boolean } = {}) {
  const content = fs.readFileSync(path).toString();
  if (options.json) {
    return JSON.parse(content);
  } else {
    return content;
  }
}

export function fileExists(path: string) {
  return fs.existsSync(path);
}

export async function saveFile(path: string, content: any, options: { json?: boolean } = {}) {
  const dirName = pathLib.dirname(path);
  if (!fileExists(dirName)) {
    await makeDir(dirName);
  }

  if (options.json) {
    content = JSON.stringify(content, null, 2);
  }

  return fs.writeFileSync(path, content);
}

export async function makeDir(dirPath: string) {
  return fs.promises.mkdir(dirPath, { recursive: true });
}

export function isDirectory(path: string) {
  return fs.existsSync(path) && fs.lstatSync(path).isDirectory();
}

export function isFile(path: string) {
  return fs.existsSync(path) && fs.lstatSync(path).isFile();
}
