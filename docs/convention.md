## File Architecture
.vscode
docs
public
src
  media
  modules
  routers
  sass
  server
    entities                - entities for typeorm
    
    server.ts               - main entry point for Express (Server)
  shared                    - interfaces, configurations, logger, misc
  store

  index.tsx                 - main entry point for React (Front-end)

.env                        - environment variables
.gitignore                  - ignore specified files/directories
images.d.ts                 - declaration file for images
nodemon.json                - nodemon configuration 
ormconfig.json              - typeorm configuration (gets imported and use as option parameter for createConnection())
package.json                
README.md
tsconfig.json               - typescript configuration
tsconfig.prod.json
tsconfig.test.json
tslint.json                 - typescript linter configuration
typeorm.json                - typeorm configuration (typeorm will use if call to createConnection() is passed nothing)
yarn.lock







## Style Guide

TypeDocs can be initialized with `npm run typedoc`; this will pull data from the application using TypeDoc notation similar to JSDoc notation). Ideally, use this style to document your work. You should omit fields that aren't applicable to your function/class. If you're only using a description to define your variables, you should use single line notation: `/** This variable stores X for Y. */`.

``` TS
/**
 * Description of the application goes here.
 * @param parameterName description of parameter.
 * @returns description of what's being returned.
*/
```