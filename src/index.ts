/**
 * @author zfitness
 * @description 将 import 语句转换为字符串
 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
 */
import { BabelAPI, declare } from "@babel/helper-plugin-utils";
import { PluginObj, PluginPass, types as t } from "@babel/core";

export default declare(
  (api: BabelAPI, options: Record<string, any>, dirname: string) => {
    api.assertVersion(7);
    const ignoreImport: string[] = options.ignoreImport || [];

    return {
      name: "import-to-string",
      visitor: {
        ImportDeclaration(path) {
          const source = path.node.source.value;
          const value = t.stringLiteral(source);
          // TODO eg：Determine whether to ignore the conversion of this import statement
          if (ignoreImport.includes(source)) return;
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
            // TODO eg：Determine whether to ignore the conversion of this import statement
            if (ignoreImport.includes(source)) return;
            path.replaceWith(t.stringLiteral(source));
          }
        },
      },
    } as PluginObj<PluginPass>;
  }
);
