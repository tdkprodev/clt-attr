# Dependencies 

#### tsconfig-paths
Use to load modules whose location is specified in the paths section of tsconfig.json.

Without this dependency, node will look in the node_modules folders all the way up to the 
root of the filesystem and thus will not find the modules specified by the paths in tsconfig.

#### debug
Use to log relevant information to ease the pain of debugging.

#### joi
Validation

#### ramda
Utilities