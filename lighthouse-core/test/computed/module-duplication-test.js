/**
 * @license Copyright 2020 The Lighthouse Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

/* eslint-env jest */

const fs = require('fs');
const ModuleDuplication = require('../../computed/module-duplication.js');

function load(name) {
  const mapJson = fs.readFileSync(`${__dirname}/../fixtures/source-maps/${name}.js.map`, 'utf-8');
  const content = fs.readFileSync(`${__dirname}/../fixtures/source-maps/${name}.js`, 'utf-8');
  return {map: JSON.parse(mapJson), content};
}

describe('ModuleDuplication computed artifact', () => {
  it('works (simple)', async () => {
    const context = {computedCache: new Map()};
    const {map, content} = load('foo.min');
    const artifacts = {
      SourceMaps: [
        {scriptUrl: 'https://example.com/foo1.min.js', map},
        {scriptUrl: 'https://example.com/foo2.min.js', map},
      ],
      ScriptElements: [
        {src: 'https://example.com/foo1.min.js', content},
        {src: 'https://example.com/foo2.min.js', content},
      ],
    };
    const results = await ModuleDuplication.request(artifacts, context);
    expect(results).toMatchInlineSnapshot(`
      Map {
        "node_modules/browser-pack/_prelude.js" => Array [],
        "src/bar.js" => Array [],
        "src/foo.js" => Array [],
      }
    `);
  });

  it('works (complex)', async () => {
    const context = {computedCache: new Map()};
    const bundleData1 = load('coursehero-bundle-1');
    const bundleData2 = load('coursehero-bundle-2');
    const artifacts = {
      SourceMaps: [
        {scriptUrl: 'https://example.com/coursehero-bundle-1.js', map: bundleData1.map},
        {scriptUrl: 'https://example.com/coursehero-bundle-2.js', map: bundleData2.map},
      ],
      ScriptElements: [
        {src: 'https://example.com/coursehero-bundle-1.js', content: bundleData1.content},
        {src: 'https://example.com/coursehero-bundle-2.js', content: bundleData2.content},
      ],
    };
    const results = await ModuleDuplication.request(artifacts, context);
    expect(results).toMatchInlineSnapshot(`
      Map {
        "Control/assets/js/vendor/ng/select/select.js" => Array [
          Object {
            "resourceSize": 48513,
            "scriptUrl": "https://example.com/coursehero-bundle-1.js",
          },
          Object {
            "resourceSize": 48513,
            "scriptUrl": "https://example.com/coursehero-bundle-2.js",
          },
        ],
        "Control/assets/js/vendor/ng/select/angular-sanitize.js" => Array [
          Object {
            "resourceSize": 9135,
            "scriptUrl": "https://example.com/coursehero-bundle-1.js",
          },
          Object {
            "resourceSize": 9135,
            "scriptUrl": "https://example.com/coursehero-bundle-2.js",
          },
        ],
        "node_modules/@babel/runtime/helpers/classCallCheck.js" => Array [],
        "node_modules/@babel/runtime/helpers/assertThisInitialized.js" => Array [],
        "node_modules/@babel/runtime/helpers/possibleConstructorReturn.js" => Array [],
        "node_modules/@babel/runtime/helpers/getPrototypeOf.js" => Array [],
        "node_modules/@babel/runtime/helpers/inherits.js" => Array [
          Object {
            "resourceSize": 528,
            "scriptUrl": "https://example.com/coursehero-bundle-1.js",
          },
          Object {
            "resourceSize": 528,
            "scriptUrl": "https://example.com/coursehero-bundle-2.js",
          },
        ],
        "node_modules/@babel/runtime/helpers/defineProperty.js" => Array [],
        "node_modules/@babel/runtime/helpers/extends.js" => Array [],
        "node_modules/@babel/runtime/helpers/typeof.js" => Array [
          Object {
            "resourceSize": 992,
            "scriptUrl": "https://example.com/coursehero-bundle-1.js",
          },
          Object {
            "resourceSize": 992,
            "scriptUrl": "https://example.com/coursehero-bundle-2.js",
          },
        ],
        "node_modules/@babel/runtime/helpers/setPrototypeOf.js" => Array [],
        "js/src/common/base-component.ts" => Array [],
        "js/src/utils/service/amplitude-service.ts" => Array [
          Object {
            "resourceSize": 1348,
            "scriptUrl": "https://example.com/coursehero-bundle-1.js",
          },
          Object {
            "resourceSize": 1325,
            "scriptUrl": "https://example.com/coursehero-bundle-2.js",
          },
        ],
        "js/src/aged-beef.ts" => Array [],
        "js/src/utils/service/api-service.ts" => Array [],
        "js/src/common/decorators/throttle.ts" => Array [],
        "js/src/utils/service/gsa-inmeta-tags.ts" => Array [
          Object {
            "resourceSize": 591,
            "scriptUrl": "https://example.com/coursehero-bundle-1.js",
          },
          Object {
            "resourceSize": 563,
            "scriptUrl": "https://example.com/coursehero-bundle-2.js",
          },
        ],
        "js/src/utils/service/global-service.ts" => Array [],
        "js/src/search/results/store/filter-actions.ts" => Array [
          Object {
            "resourceSize": 956,
            "scriptUrl": "https://example.com/coursehero-bundle-2.js",
          },
          Object {
            "resourceSize": 946,
            "scriptUrl": "https://example.com/coursehero-bundle-1.js",
          },
        ],
        "js/src/search/results/store/item/resource-types.ts" => Array [
          Object {
            "resourceSize": 783,
            "scriptUrl": "https://example.com/coursehero-bundle-1.js",
          },
          Object {
            "resourceSize": 775,
            "scriptUrl": "https://example.com/coursehero-bundle-2.js",
          },
        ],
        "js/src/common/input/keycode.ts" => Array [],
        "js/src/search/results/store/filter-store.ts" => Array [
          Object {
            "resourceSize": 12717,
            "scriptUrl": "https://example.com/coursehero-bundle-1.js",
          },
          Object {
            "resourceSize": 12650,
            "scriptUrl": "https://example.com/coursehero-bundle-2.js",
          },
        ],
        "js/src/search/results/view/filter/autocomplete-list.tsx" => Array [
          Object {
            "resourceSize": 1143,
            "scriptUrl": "https://example.com/coursehero-bundle-2.js",
          },
          Object {
            "resourceSize": 1134,
            "scriptUrl": "https://example.com/coursehero-bundle-1.js",
          },
        ],
        "js/src/search/results/view/filter/autocomplete-filter.tsx" => Array [
          Object {
            "resourceSize": 3823,
            "scriptUrl": "https://example.com/coursehero-bundle-1.js",
          },
          Object {
            "resourceSize": 3812,
            "scriptUrl": "https://example.com/coursehero-bundle-2.js",
          },
        ],
        "js/src/search/results/view/filter/autocomplete-filter-with-icon.tsx" => Array [
          Object {
            "resourceSize": 2696,
            "scriptUrl": "https://example.com/coursehero-bundle-1.js",
          },
          Object {
            "resourceSize": 2693,
            "scriptUrl": "https://example.com/coursehero-bundle-2.js",
          },
        ],
        "js/src/search/results/service/api/filter-api-service.ts" => Array [
          Object {
            "resourceSize": 554,
            "scriptUrl": "https://example.com/coursehero-bundle-1.js",
          },
          Object {
            "resourceSize": 534,
            "scriptUrl": "https://example.com/coursehero-bundle-2.js",
          },
        ],
        "js/src/common/component/school-search.tsx" => Array [
          Object {
            "resourceSize": 5840,
            "scriptUrl": "https://example.com/coursehero-bundle-2.js",
          },
          Object {
            "resourceSize": 5316,
            "scriptUrl": "https://example.com/coursehero-bundle-1.js",
          },
        ],
        "js/src/common/component/search/abstract-taxonomy-search.tsx" => Array [
          Object {
            "resourceSize": 3103,
            "scriptUrl": "https://example.com/coursehero-bundle-1.js",
          },
          Object {
            "resourceSize": 3098,
            "scriptUrl": "https://example.com/coursehero-bundle-2.js",
          },
        ],
        "js/src/common/component/search/course-search.tsx" => Array [
          Object {
            "resourceSize": 545,
            "scriptUrl": "https://example.com/coursehero-bundle-2.js",
          },
          Object {
            "resourceSize": 544,
            "scriptUrl": "https://example.com/coursehero-bundle-1.js",
          },
        ],
        "node_modules/lodash-es/_freeGlobal.js" => Array [],
        "node_modules/lodash-es/_root.js" => Array [],
        "node_modules/lodash-es/_Symbol.js" => Array [],
        "node_modules/lodash-es/_arrayMap.js" => Array [],
        "node_modules/lodash-es/isArray.js" => Array [],
        "node_modules/lodash-es/_getRawTag.js" => Array [],
        "node_modules/lodash-es/_objectToString.js" => Array [],
        "node_modules/lodash-es/_baseGetTag.js" => Array [],
        "node_modules/lodash-es/isObjectLike.js" => Array [],
        "node_modules/lodash-es/isSymbol.js" => Array [],
        "node_modules/lodash-es/_baseToString.js" => Array [],
        "node_modules/lodash-es/isObject.js" => Array [],
        "node_modules/lodash-es/toNumber.js" => Array [],
        "node_modules/lodash-es/toFinite.js" => Array [],
        "node_modules/lodash-es/toInteger.js" => Array [],
        "node_modules/lodash-es/toString.js" => Array [],
      }
    `);
  });

  it('_normalizeSource', () => {
    const testCases = [
      ['test.js', 'test.js'],
      ['node_modules/othermodule.js', 'node_modules/othermodule.js'],
      ['node_modules/somemodule/node_modules/othermodule.js', 'node_modules/othermodule.js'],
      [
        'node_modules/somemodule/node_modules/somemodule2/node_modules/othermodule.js',
        'node_modules/othermodule.js',
      ],
      ['webpack.js?', 'webpack.js'],
    ];
    for (const [input, expected] of testCases) {
      expect(ModuleDuplication._normalizeSource(input)).toBe(expected);
    }
  });

  describe('_normalizeAggregatedData', () => {
    it('removes entries with just one value', () => {
      const data = new Map([['a.js', [{resourceSize: 100}]]]);
      ModuleDuplication._normalizeAggregatedData(data);
      expect(data).toMatchInlineSnapshot(`Map {}`);
    });

    it('sorts entries based on resource size', () => {
      const data = new Map([
        ['a.js', [{resourceSize: 250}, {resourceSize: 200}]],
        ['b.js', [{resourceSize: 200}, {resourceSize: 250}]],
      ]);
      ModuleDuplication._normalizeAggregatedData(data);
      expect(data).toMatchInlineSnapshot(`
        Map {
          "a.js" => Array [],
          "b.js" => Array [],
        }
      `);
    });

    it('removes data if size is much smaller than the largest', () => {
      const data = new Map([
        ['a.js', [{resourceSize: 200}, {resourceSize: 1}, {resourceSize: 250}]],
        ['b.js', [{resourceSize: 250}, {resourceSize: 1}]],
      ]);
      ModuleDuplication._normalizeAggregatedData(data);
      expect(data).toMatchInlineSnapshot(`
        Map {
          "a.js" => Array [],
        }
      `);
    });
  });
});
