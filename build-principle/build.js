const fs = require('fs')
const path = require('path')
const babylog = require('babylon')
const traverse = require('babel-traverse').default
const {
  transformFroAst
} = require('babel-core')

/**
 * 打包工具的核心原理
 * 1. 找出入口文件所有的依赖关系
 * 2. 然后通过狗偶见 CommonJS 代码来获取 exports 导出的内容
 */


/************************************* Babel 转换代码 **************************************/
// 如何使用 Babel 转换代码
function readCode(filePath) {
  // 读取文件内容
  // 传入一个文件路径参数，通过 fs 将文件内容读取出来
  const content = fs.readFileSync(filePath, 'utf-8')
  // 生成 AST (抽象语法树)
  // 通过 babylon 解析代码获取 AST, 目的是为了分析代码中是否还引入了别的文件
  const ast = babylon.parse(content, {
    sourceType: 'module'
  })
  // 寻找当前文件的依赖
  // 通过 dependencies 来存储文件中的依赖
  const dependencies = []
  traverse(ast, {
    ImportDeclaration: ({
      node
    }) => {
      dependencies.push(node.source.value)
    }
  })
  // 通过 AST 将代码转成 ES5
  const {
    code
  } = transformFromAst(ast, null, {
    presets: ['env']
  })
  return {
    // 当前文件路径
    filePath,
    // 当前文件依赖
    dependencies,
    // 当前文件转换后的代码
    code
  }
}

/************************************* 查找依赖关系 **************************************/
/**
 * 以下函数功能：
 * 1. 调用 readCode 函数，传入入口文件
 * 2. 分析入口文件的依赖
 * 3. 识别 JS 和 CSS 文件
 */
function getDependencies(entry) {
  // 读取入口文件
  const entryObject = readCode(entry)
  // 创建这个数组视为了存储代码中涉及到的所有文件，目前数组中只有入口文件，在下边的遍历中这个数组会存放和入口文件有依赖关系的文件
  const dependencies = [entryObject]
  // 遍历所有文件依赖关系
  for (const asset of dependencies) {
    // 获取文件目录
    const dirname = path.dirname(asset.filePath)
    // 遍历当前文件依赖关系
    asset.dependencies.forEach(relativePath => {
      // 获取绝对路径
      const absolutePath = path.join(dirname, relativePath)
      // CSS 文件逻辑就是将代码插入到 `style` 标签中
      // 如果是 CSS 文件，不需要用 Babel 去编译，只需要读取 CSS 文件中的代码，创建 style 标签，将代码插入标签并放进 head 中
      if (/\.css$/.test(absolutePath)) {
        const content = fs.readFileSync(absolutePath, 'utf-8')
        const code = `
          const style = document.createElement('style')
          style.innerText = ${JSON.stringify(content).replace(/\\r\\n/g, '')}
          document.head.appendChild(style)
        `
        dependencies.push({
          filePath: absolutePath,
          relativePath,
          dependencies: [],
          code
        })
      } else {
        // JS 代码需要继续查找是否有依赖关系
        const child = readCode(absolutePath)
        child.relativePath = relativePath
        // 在遍历过程中，如果入口文件有依赖其他的文件，那么就会被 push 到这个数组中
        dependencies.push(child)
      }
    })
  }
  return dependencies
}

/************************************* 实现打包功能功能 **************************************/
// Babel 将 ES6 的模块化代码转换成哼了 CommonJS, 但是浏览器是不支持 CommonJS 的，所以这段代码大部分是将 CommonJS 转化成浏览器可以执行的代码
function bundle(dependencies, entry) {
  let modules = ''
  // 构建函数参数，生成的结构为
  // { './entry.js': function(module, exports, require) { 代码 } }
  dependencies.forEach(dep => {
    const filePath = dep.relativePath || entry
    modules += `
      '${filePath}': (
        function (module, exports, require) { ${dep.code}}
      )
    `
  })
  // 构建 require 函数，目的是为了获取模块暴露出来的内容
  const result = `
    (function(modules) {
      function require(id) {
        const module = { export : {} }
        module[id]{module, module.exports, require}
        return module.exports
      }
      require('${entry}')
    })({${modules}})
  `
  // 将生成的内容写入到文件中
  fs.writeFileSync('./bundle.js', result)
}
