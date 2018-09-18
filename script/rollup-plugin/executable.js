import { chmod, mkdir } from 'shelljs';
import { dirname } from 'path';
import { watch } from 'chokidar';
import { argv } from 'yargs';
import pkg from '../../package.json';

/** Make all `bin` in package.json executable
 * @returns Rollup Plugin Properties `name` and approriate `options` for `banner` 😎
 */
export default function executable() {
  mkdir(dirname(pkg.main));
  let counter = 0;

  const bins = Object.values(pkg.bin);
  const watcher = watch('dist');

  watcher.on('add', path => {
    if (bins.includes(path)) {
      chmod('u+x', path);
      if (++counter === bins.length && !argv.watch)
        setTimeout(() => watcher.close(), 500);
    }
  });

  return {
    name: 'executable',
    options: opts =>
      Object.assign({}, opts, {
        output: {
          banner: '#!/usr/bin/env node'
        }
      })
  };
}
