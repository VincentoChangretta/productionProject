import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { RuleSetRule } from "webpack";
import { BuildOptions } from "./types/config";

export const buildLoaders = ({ isDev }: BuildOptions): RuleSetRule[] => {

  // если не используем ts нужен babel loader
  const typescriptLoaders = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const fileLoader = {
    //если захочешь добавить шрифты то добавляем в регулярку
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  }

  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  }


  const cssLoaders = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes(".module.")),
            // (auto) помогает автоматически определить, являются ли файлы module стилями
            localIdentName: isDev
              ? "[path][name]__[local]--[hash:base64:5]"
              : "[hash:base64:8]",
            //  (localIdentName) управляет тем, как будут названы локальные классы в зависимости от режима разработки или продакшена, что важно для поддержки читаемости и управления стилями в проекте.
          },
        },
      },
      "sass-loader",
    ],
  };
  return [fileLoader, svgLoader, typescriptLoaders, cssLoaders];
};
