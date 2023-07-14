/**
 * Babel v7+ TypeScript 推荐使用，目前官方仓库的编写风格
 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
 */
import { BabelAPI, declare } from "@babel/helper-plugin-utils";
import {
  BabelFile,
  PluginObj,
  PluginPass,
  types as t,
} from "@babel/core";

export default declare(
  (api: BabelAPI, options: Record<string, any>, dirname: string) => {
    api.assertVersion(7);

    return {
      name: "import-to-string",
      pre(this: PluginPass, file: BabelFile) {
        // TODO eg：Initialize data usage before conversion
      },
      visitor: {
        ImportDeclaration(path) {
          const source = path.node.source.value;
          const value = t.stringLiteral(source);
          for (let specifier of path.node.specifiers) {
            const name = specifier.local.name;
            const declaration = t.variableDeclaration("const", [
              t.variableDeclarator(t.identifier(name), value),
            ]);
            path.insertBefore(declaration);
          }
          path.remove();
        },
        ArrowFunctionExpression(path) {
          if (
            t.isCallExpression(path.node.body) &&
            t.isImport(path.node.body.callee) &&
            t.isStringLiteral(path.node.body.arguments?.[0])
          ) {
            const source = path.node.body.arguments[0].value;
            path.replaceWith(t.stringLiteral(source));
          }
        },
      },
      post(this: PluginPass, file: BabelFile) {
      },
    } as PluginObj<PluginPass>;
  }
);
