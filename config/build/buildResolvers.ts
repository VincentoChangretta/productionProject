import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

export const buildResolvers = (options: BuildOptions): ResolveOptions => ({
  extensions: ['.tsx', '.ts', '.js'],
  preferAbsolute: true, // абсолютные пути в приоритете 10/video-1
  modules: [options.paths.src, 'node_modules'], // из этих путей можно импортировать абсолютно
  mainFiles: ['index'], // главный файл для каждого модуля
  alias: {},
});
