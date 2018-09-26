// rework for rollup-plugin-typescript2 bug🐛 (declarationDir not being respected)
// https://github.com/ezolenko/rollup-plugin-typescript2/issues/101
import { watch } from 'chokidar';
import { ls, mkdir, rm, mv, cp } from 'shelljs';
import { basename, dirname } from 'path';
import { argv } from 'yargs';

/** Move all types definition files to `types` folder
 * @returns only Rollup Plugin Properties `name` 😋
 */
export default function moveDts() {
  const watcher = watch('src');

  mkdir('types');
  rm('types/*');

  watcher.on('add', path => {
    const filename = basename(path);
    if (/\.d\.ts$/.test(filename)) {
      const typesPath = 'types' + dirname(path).replace('src', '');
      mkdir('-p', typesPath);

      //#region ⚠️ enable this if using (shim|global).d.ts inside src folder
      // if (/^_*(shim|global).*/.test(filename)) cp(path, typesPath);
      // else mv(path, typesPath);
      //#endregion 👇 also don't forget to remove it
      mv(path, typesPath);
    }

    if (
      ls('-R', 'types').length === ls('-R', 'src/**/*?(.d).ts').length &&
      !argv.watch
    )
      setTimeout(() => watcher.close(), 500); // break;
  });
  return { name: 'moveDts' };
}
