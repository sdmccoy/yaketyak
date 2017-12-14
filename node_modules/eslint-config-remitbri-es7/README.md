### eslint-config-remitbri

Additional configuration set to be used with [ESLint](http://eslint.org/) and [eslint-config-remitbri](https://github.com/remitbri/eslint-config-remitbri).

# Installation
```shell
npm install --save-dev eslint-config-remitbri-es7
```

# Default usage
This specifies [babel-eslint](https://npmjs.com/package/babel-eslint) as a replacement [parser](http://eslint.org/docs/user-guide/configuring#specifying-parser), so that ES7 experimental features don't flag as errors. It's not meant to be used on its own.

E.g. add the following line to the `.eslintrc` file or to the `eslintConfig` field of the `package.json` of your project
```json
{
  "extends" : ["remitbri/react", "remitbri-es7"]
}
```

Consult the ESLint documentation for more information about [extending configuration files](http://eslint.org/docs/user-guide/configuring#extending-configuration-files).
