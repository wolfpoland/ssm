import { v4 } from 'node-uuid';
import debounce from 'lodash.debounce';
import memomize from 'fast-memoize';

const expandAndHideExpander = targetSection => {
  const expanderItem = targetSection.querySelector('#expander-item');

  if (!!expanderItem) {
    expanderItem.click();
    expanderItem.setAttribute('style', 'display: none;');
  }
};

const getContainerElement = targetSection => {
  const containerElement = document.createElement('div');
  containerElement.setAttribute(
    'style',
    `   width: 100%;
        display: flex;
        justify-content: center;
        padding: 0 24px;
        box-sizing: border-box;
        align-items: center;
    `
  );

  const containerLocation = targetSection.querySelector('h3');
  containerLocation.parentNode.insertBefore(
    containerElement,
    containerLocation
  );

  return containerElement;
};

const getInputWithSpan = () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Search');
  input.setAttribute(
    'style',
    `
  font-family: "Roboto", "Droid Sans", sans-serif;
  width:90%;
  font-size: 16px;
  margin: 0;
  padding: 8px 8px 6px 8px;
  position: relative;
  display: block;
  outline: none;
  border: none;
  background: none;
  color: var(--yt-primary-color);
  border-bottom: 1px solid #e0e0e0;
  border-radius: 0;
 `
  );

  const span = document.createElement('span');
  span.setAttribute(
    'style',
    'position: absolute;  left: 50%; width: 0; height: 2px; background-color: #3399FF; transition: 0.4s;'
  );

  return {
    input,
    span
  };
};

const getWrapperElement = () => {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute(
    'style',
    `
  width: 100%;
  position: relative;
  margin-bottom: 14px;
`
  );

  return wrapperElement;
};

const assemblyInputElement = targetSection => {
  const containerElement = getContainerElement(targetSection);
  const wrapperElement = getWrapperElement();
  const inputWithSpan = getInputWithSpan();

  const { input, span } = inputWithSpan;

  wrapperElement.append(input);
  wrapperElement.append(span);
  containerElement.append(wrapperElement);

  return inputWithSpan;
};

const collectSubscribtions = targetSection => {
  const elements = targetSection.getElementsByTagName(
    'ytd-guide-entry-renderer'
  );

  return [].slice.call(elements).map(element => {
    const id = v4();
    element.setAttribute('id', id);
    return {
      text: element.childNodes[1].innerText.trim().toLowerCase(),
      id
    };
  });
};

const hideOrNot = (value, subs) => {
  const toDisplay = [];
  const toHide = [];
  subs.forEach(elm => {
    if (elm.text.indexOf(value) === -1) {
      toHide.push(document.getElementById(elm.id));
    } else {
      toDisplay.push(document.getElementById(elm.id));
    }
  });

  return {
    toDisplay,
    toHide
  };
};

const searchLogic = (subs, input) => {
  const mHideOrNot = memomize(hideOrNot);
  const { toDisplay, toHide } = mHideOrNot(
    input.value.trim().toLowerCase(),
    subs
  );

  toDisplay.forEach(elm => (elm.style.display = 'block'));
  toHide.forEach(elm => (elm.style.display = 'none'));
};

const addInputListeners = (inputWitSpan, subs) => {
  const { input, span } = inputWitSpan;
  input.addEventListener('focus', () => {
    span.setAttribute(
      'style',
      `position: absolute;
        height: 2px;
        background-color: #3399FF;
        width: 100%;
        transition: 0.4s;
        left: 0;`
    );
  });
  input.addEventListener('focusout', () => {
    span.setAttribute(
      'style',
      'position: absolute;  left: 50%; width: 0; height: 2px; background-color: #3399FF; transition: 0.4s;'
    );
  });
  input.addEventListener(
    'keyup',
    debounce(searchLogic.bind(this, subs, input), 100)
  );
};

const predicteSectionsPlacment = chileNodes => {
  if (chileNodes.length - 1 < 4) {
    return 1;
  } else {
    return 2;
  }
};

const programLoop = setInterval(() => {
  try {
    const guidesChildNodes = document.querySelector(
      '#guide-renderer #sections'
    );
    if (!!guidesChildNodes) {
      const targetSection =
        guidesChildNodes.childNodes[
          predicteSectionsPlacment(guidesChildNodes.childNodes)
        ];

      if (!!targetSection) {
        try {
          expandAndHideExpander(targetSection);
          const subs = collectSubscribtions(targetSection);
          const inputWitSpan = assemblyInputElement(targetSection);
          addInputListeners(inputWitSpan, subs);
          clearInterval(programLoop);
        } catch (err) {
          console.log(
            '[Simple Subscription Managment] Error, please raport it!: \n',
            err
          );
          clearInterval(programLoop);
        }
      }
    }
  } catch (err) {}
}, 500);
