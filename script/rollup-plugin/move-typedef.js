// rework for rollup-plugin-typescript2 bug🐛 (declarationDir not being respected)
// https://github.com/ezolenko/rollup-plugin-typescript2/issues/101
import { watch } from 'chokidar';
import { ls, mkdir, rm, mv } from 'shelljs';
import { parse, dirname } from 'path';
import { argv } from 'yargs';

/** Move all types definition files to `types` folder
 * @returns only Rollup Plugin Properties `name` 😋
 */
export default function moveDts() {
  const watcher = watch('src');

  mkdir('types');
  rm('types/*');

  watcher.on('add', path => {
    if (/\.d\.ts$/.test(path) && parse(parse(path).name).name !== 'shim') {
      const typesPath = 'types' + dirname(path).replace('src', '');
      mkdir('-p', typesPath);
      mv(path, typesPath);
    }
    if (ls('types').length === ls('src/**!(shim*.d).ts').length && !argv.watch)
      setTimeout(() => watcher.close(), 500);
  });
  return { name: 'moveDts' };
}
