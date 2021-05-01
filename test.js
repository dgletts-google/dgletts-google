// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
const { describe, it } = require('mocha');
const assert = require('assert');

const { chartData } = require('./');

describe('profile-interests', () => {
  it('break down of interests must be 100%', () => {
    const data = chartData();
    let sum = 0;
    for (const percent of data.datasets[0].data) {
      sum += percent;
    }
    assert.strictEqual(sum, 100);
  });
  it("must only list Ben's interests", () => {
    const expected = [
      'Rock climbing 🧗',
      'Coding 🤓',
      'Dinner with friends 🍕',
      'Making fancy drinks 🍹'
    ];
    const data = chartData();
    assert.deepStrictEqual(data.labels, expected);
  });
});
