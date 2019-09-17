// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the specific language governing permissions and limitations
// under the License.

import { codeExport as exporter } from '@seleniumhq/side-utils'

const emitters = {
  afterAll: empty,
  afterEach: empty,
  beforeAll: empty,
  beforeEach: empty,
  declareDependencies,
  declareMethods: empty,
  declareVariables,
  inEachBegin: empty,
  inEachEnd: empty,
}

function generate(hookName) {
  return new exporter.hook(emitters[hookName]())
}

export function generateHooks() {
  let result = {}
  Object.keys(emitters).forEach(hookName => {
    result[hookName] = generate(hookName)
  })
  return result
}

function declareDependencies() {
  const params = {
    startingSyntax: {
      commands: [
        {
          level: 0,
          statement: `const AslWebDriver = require('../webdriver');`,
        },
        {
          level: 0,
          statement: `const { By, Key, until } = require('selenium-webdriver');`,
        },
        {
          level: 0,
          statement: `const assert = require('assert');`,
        },
        {
          level: 0,
          statement: '',
        },
        {
          level: 0,
          statement: 'const aslWebDriver = new AslWebDriver({',
        },
        {
          level: 1,
          statement: 'isHeadless: true,',
        },
        {
          level: 1,
          statement: 'windowSize: { width: 1440, height: 1080 },',
        },
        {
          level: 0,
          statement: '});',
        },
        {
          level: 0,
          statement: '',
        },
        {
          level: 0,
          statement: 'const { userId } = aslWebDriver;',
        },
        {
          level: 0,
          statement: '',
        },
      ],
    },
  }
  return params
}

function declareVariables() {
  const params = {
    startingSyntax: {
      commands: [
        {
          level: 1,
          statement: 'const driver = await aslWebDriver.loadBrowserAsync();',
        },
        { level: 1, statement: '' },
        { level: 1, statement: 'await driver.manage().setTimeouts({' },
        { level: 2, statement: 'implicit: 3000,' },
        { level: 2, statement: 'pageLoad: 30000,' },
        { level: 2, statement: 'script: 60000,' },
        { level: 1, statement: '});' },
        { level: 1, statement: '' },
        { level: 1, statement: 'const vars = { userId };' },
      ],
    },
  }
  return params
}

function empty() {
  return {}
}
