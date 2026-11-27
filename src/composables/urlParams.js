import {
  ref,
  watch
} from 'vue';

import { categories } from '@/helpers/categories.js';
import {
  urlDecode,
  urlEncode
} from '@/helpers/textCompression.js';

const defaultInput = `
.foo {
  color: rebeccapurple;
}
.foo:hover {
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
}
`.trim();

export const useUrlParams = function () {
  const input = ref(defaultInput);
  const expected = ref('');
  const alt1 = ref('');
  const showDiffs = ref(false);
  const showExpected = ref(false);
  const showAlt1 = ref(false);
  const showGZip = ref(false);
  const showTestDescription = ref(false);
  const testCategory = ref('');
  const testTitle = ref('');
  const testDescription = ref('');

  function encodeCategory () {
    return categories.findIndex((category) => {
      return category === testCategory.value;
    });
  }

  function setUrlParams () {
    const url = new URL(window.location);
    let value = '';
    const encodedCategory = encodeCategory();

    if (input.value) {
      value = urlEncode(input.value);
    }

    if (showDiffs.value) {
      url.searchParams.set('f', '1');
    } else {
      url.searchParams.delete('f');
    }
    if (showGZip.value) {
      url.searchParams.set('z', '1');
    } else {
      url.searchParams.delete('z');
    }
    if (showExpected.value) {
      url.searchParams.set('x', urlEncode(expected.value));
    } else {
      url.searchParams.delete('x');
    }
    if (showAlt1.value) {
      url.searchParams.set('a1', urlEncode(alt1.value));
    } else {
      url.searchParams.delete('a1');
    }

    if (showTestDescription.value) {
      if (encodedCategory > 0) {
        url.searchParams.set('c', String(encodedCategory));
      }
      url.searchParams.set('t', urlEncode(testTitle.value));
      url.searchParams.set('d', urlEncode(testDescription.value));
    } else {
      url.searchParams.delete('c');
      url.searchParams.delete('t');
      url.searchParams.delete('d');
    }

    url.searchParams.set('v', value);
    history.replaceState({}, '', url);
  }

  function loadUrlParams () {
    const url = new URL(window.location);
    const paramValue = url.searchParams.get('v');
    const paramInput = url.searchParams.get('i');
    const paramExpected = url.searchParams.get('e');
    const paramAlt1 = url.searchParams.get('a1');
    const paramExpectation = url.searchParams.get('x');
    const paramCategoryIndex = url.searchParams.get('c');
    const paramTitle = url.searchParams.get('t');
    const paramDescription = url.searchParams.get('d');
    const paramShowDiffs = url.searchParams.get('f');
    const paramShowGZip = url.searchParams.get('z');

    showDiffs.value = (paramShowDiffs === '1');
    showGZip.value = (paramShowGZip === '1');

    if (typeof(paramExpected) === 'string') {
      url.searchParams.delete('e');
      history.replaceState({}, '', url);
      showExpected.value = true;
      expected.value = paramExpected;
    } else if (typeof(paramExpectation) === 'string') {
      showExpected.value = true;
      expected.value = urlDecode(paramExpectation);
    }
    if (typeof(paramAlt1) === 'string') {
      showAlt1.value = true;
      alt1.value = urlDecode(paramAlt1);
    }

    if (typeof(paramCategoryIndex) === 'string') {
      testCategory.value = categories[paramCategoryIndex] || '';
    }
    if (typeof(paramTitle) === 'string') {
      showTestDescription.value = true;
      testTitle.value = urlDecode(paramTitle);
    }
    if (typeof(paramDescription) === 'string') {
      showTestDescription.value = true;
      testDescription.value = urlDecode(paramDescription);
    }

    if (paramInput?.length) {
      url.searchParams.delete('i');
      history.replaceState({}, '', url);
      input.value = paramInput;
    } else if (paramValue) {
      input.value = urlDecode(paramValue);
    }
  }

  const stateToStoreInUrlParams = [
    input,
    expected,
    alt1,
    showDiffs,
    showExpected,
    showAlt1,
    showGZip,
    showTestDescription,
    testCategory,
    testTitle,
    testDescription
  ];
  for (const state of stateToStoreInUrlParams) {
    watch(state, setUrlParams);
  }

  return {
    input,
    expected,
    alt1,
    showDiffs,
    showExpected,
    showAlt1,
    showGZip,
    showTestDescription,
    testCategory,
    testTitle,
    testDescription,
    setUrlParams,
    loadUrlParams
  };
};
