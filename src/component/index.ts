import { strings } from '@angular-devkit/core'
import {
  Rule,
  SchematicContext,
  Tree,
  SchematicsException,
  apply,
  filter,
  template,
  noop,
  move,
  url,
  chain,
  branchAndMerge,
  mergeWith
} from '@angular-devkit/schematics'

// You don't have to export the function as default. You can also have more than one rule factory
// per file.

function buildSelector(options: any) {
  return options.prefix ?
    `${options.prefix}-${options.name}` : `app-${options.name}`
}

export function component(options: any): Rule {

  options.selector = options.selector || buildSelector(options)

  const sourceDir = options.sourceDir

  if (!sourceDir) {
    throw new SchematicsException(`sourceDir option is required.`)
  }

  return (tree: Tree, context: SchematicContext) => {

    // options.module = findModuleFromOptions(tree, options)

    const templateSource = apply(url('./files'), [
      options.spec ? noop() : filter(path => !path.endsWith('.spec.ts')),
      template({
        ...strings,
        'if-flat': (str: string) => options.flat ? '' : str,
        ...options,
      }),
      move(sourceDir),
    ])

    return chain([
      branchAndMerge(chain([
        mergeWith(templateSource),
      ])),
    ])(tree, context)
  }

}
