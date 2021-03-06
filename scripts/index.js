let languageData = 'eng';

if (sessionStorage.getItem('language') == null) {
    sessionStorage.setItem('language', languageData);
} else {
    languageData = sessionStorage.getItem('language');
}

const container = document.createElement('div');
container.classList.add('container');
document.body.appendChild(container);

const textarea = document.createElement('textarea');
textarea.rows = '10';
textarea.cols = '100';
container.appendChild(textarea);

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
container.appendChild(keyboard);

const row0 = document.createElement('div');
row0.classList.add('row');
keyboard.appendChild(row0);
const row1 = document.createElement('div');
row1.classList.add('row');
keyboard.appendChild(row1);
const row2 = document.createElement('div');
row2.classList.add('row');
keyboard.appendChild(row2);
const row3 = document.createElement('div');
row3.classList.add('row');
keyboard.appendChild(row3);
const row4 = document.createElement('div');
row4.classList.add('row');
keyboard.appendChild(row4);

textarea.autofocus = true;
textarea.onblur = () => textarea.focus();

// buttonsEng from data.js
buttonsEng.forEach((button) => {
    const buttonElement = document.createElement('button');
    let counterSpans = 0;
    button.content.forEach((spanContent) => {
        const span = document.createElement('span');
        span.textContent = spanContent;
        if (button.classNames.includes('changeable') && counterSpans === 0) {
            span.classList.add('down');
            counterSpans += 1;
        } else if (button.classNames.includes('changeable') && counterSpans === 1) {
            span.classList.add('up');
        }
        buttonElement.appendChild(span);
    });
    button.classNames.forEach((classElementName) => {
        buttonElement.classList.add(classElementName);
        if (languageData === 'eng') {
            buttonElement.classList.add('lang');
        } else {
            buttonElement.classList.add('change-lang');
        }
    });
    buttonElement.dataset.keyCode = button.keyCode;
    switch (button.row) {
    case 0:
        row0.appendChild(buttonElement);
        break;
    case 1:
        row1.appendChild(buttonElement);
        break;
    case 2:
        row2.appendChild(buttonElement);
        break;
    case 3:
        row3.appendChild(buttonElement);
        break;
    case 4:
        row4.appendChild(buttonElement);
        break;
    default:
        break;
    }
});

// buttonsRus from data.js
buttonsRus.forEach((button) => {
    const buttonElement = document.createElement('button');
    let counterSpans = 0;
    button.content.forEach((spanContent) => {
        const span = document.createElement('span');
        span.textContent = spanContent;
        if (button.classNames.includes('changeable') && counterSpans === 0) {
            span.classList.add('down');
            counterSpans += 1;
        } else if (button.classNames.includes('changeable') && counterSpans === 1) {
            span.classList.add('up');
        }
        buttonElement.appendChild(span);
    });
    button.classNames.forEach((classElementName) => {
        buttonElement.classList.add(classElementName);
        if (languageData === 'rus') {
            buttonElement.classList.add('lang');
        } else {
            buttonElement.classList.add('change-lang');
        }
    });
    buttonElement.dataset.keyCode = button.keyCode;
    switch (button.row) {
    case 0:
        row0.appendChild(buttonElement);
        break;
    case 1:
        row1.appendChild(buttonElement);
        break;
    case 2:
        row2.appendChild(buttonElement);
        break;
    case 3:
        row3.appendChild(buttonElement);
        break;
    case 4:
        row4.appendChild(buttonElement);
        break;
    default:
        break;
    }
});

keyboard.addEventListener('click', (event) => {
    const currentButton = event.target;
    if (currentButton.tagName === 'BUTTON') {
        const spans = currentButton.children;
        if (currentButton.classList.contains('changeable')) {
            const span = currentButton.querySelector('span.down');
            textarea.value += span.textContent;
        } else if (currentButton.classList.value.includes('arrow')) {
            textarea.value += spans[0].textContent;
        } else if (currentButton.classList.contains('tab')) {
            textarea.value += '\t';
        } else if (currentButton.classList.contains('space')) {
            textarea.value += spans[0].textContent;
        } else if (currentButton.classList.contains('backspace')) {
            textarea.value = textarea.value.slice(0, -1);
        } else if (currentButton.classList.contains('enter')) {
            textarea.value += '\n';
        }
    } else if (currentButton.tagName === 'SPAN' && currentButton.parentElement.classList.contains('changeable')) {
        textarea.value += currentButton.textContent;
    } else if (currentButton.tagName === 'SPAN' && currentButton.parentElement.classList.value.includes('arrow')) {
        textarea.value += currentButton.textContent;
    } else if (currentButton.tagName === 'SPAN' && currentButton.parentElement.classList.contains('tab')) {
        textarea.value += '\t';
    } else if (currentButton.tagName === 'SPAN' && currentButton.parentElement.classList.contains('space')) {
        textarea.value += currentButton.textContent;
    } else if (currentButton.tagName === 'SPAN' && currentButton.parentElement.classList.contains('backspace')) {
        textarea.value = textarea.value.slice(0, -1);
    } else if (currentButton.tagName === 'SPAN' && currentButton.parentElement.classList.contains('enter')) {
        textarea.value += '\n';
    }
});

const pressed = new Set();

document.addEventListener('keydown', (event) => {
    const rowElements = [...keyboard.children];
    rowElements.forEach((rowElement) => {
        const buttonElements = [...rowElement.querySelectorAll('.lang')];
        let buttonFound = buttonElements
            .find((button) => event.keyCode === +button.dataset.keyCode);
        if (buttonFound) {
            if (event.code === 'ShiftRight') {
                buttonFound = buttonElements.find((button) => button.classList.contains('shift-right'));
            } else if (event.code === 'AltRight') {
                buttonFound = buttonElements.find((button) => button.classList.contains('alt-right'));
            } else if (event.code === 'ControlRight') {
                buttonFound = buttonElements.find((button) => button.classList.contains('ctrl-right'));
            }
            buttonFound.classList.add('active');
            if (buttonFound.dataset.keyCode === '16' || buttonFound.dataset.keyCode === '20') {
                const rowElementsInside = [...keyboard.children];
                rowElementsInside.forEach((rowElementInside) => {
                    const buttonElementsInside = [...rowElementInside.querySelectorAll('.lang')];
                    buttonElementsInside.forEach((buttonElement) => {
                        if (buttonElement.classList.contains('changeable')) {
                            const spans = [...buttonElement.children];
                            let temp = null;
                            temp = spans[0].classList.value;
                            spans[0].classList.remove(spans[0].classList.value);
                            spans[0].classList.add(spans[1].classList);
                            spans[1].classList.remove(spans[1].classList);
                            spans[1].classList.add(temp);
                        }
                    });
                });
            }
            if (buttonFound.classList.contains('changeable')) {
                if (buttonFound.classList.contains('lang')) {
                    const span = buttonFound.querySelector('span.down');
                    textarea.value += span.textContent;
                }
            }
            if (buttonFound.classList.contains('tab')) {
                textarea.value += '\t';
            }
        }
    });

    pressed.add(event.key);
    if (!pressed.has('Control') || !pressed.has('Alt')) {
        return;
    }
    pressed.clear();

    languageData = (languageData === 'rus') ? 'eng' : 'rus';
    sessionStorage.setItem('language', languageData);
    rowElements.forEach((rowElement) => {
        const buttonElements = [...rowElement.children];
        buttonElements.forEach((buttonElement) => {
            if (buttonElement.classList.contains('change-lang')) {
                buttonElement.classList.remove('change-lang');
                buttonElement.classList.add('lang');
            } else {
                buttonElement.classList.remove('lang');
                buttonElement.classList.add('change-lang');
            }
        });
    });
});

document.addEventListener('keyup', (event) => {
    const rowElements = [...keyboard.children];
    rowElements.forEach((rowElement) => {
        const buttonElements = [...rowElement.querySelectorAll('.lang')];
        let buttonFound = buttonElements
            .find((button) => event.keyCode === +button.dataset.keyCode);
        if (buttonFound) {
            if (event.code === 'ShiftRight') {
                buttonFound = buttonElements.find((button) => button.classList.contains('shift-right'));
            } else if (event.code === 'AltRight') {
                buttonFound = buttonElements.find((button) => button.classList.contains('alt-right'));
            } else if (event.code === 'ControlRight') {
                buttonFound = buttonElements.find((button) => button.classList.contains('ctrl-right'));
            }
            buttonFound.classList.remove('active');
            if (buttonFound.dataset.keyCode === '16') {
                const rowElementsInside = [...keyboard.children];
                rowElementsInside.forEach((rowElementInside) => {
                    const buttonElementsInside = [...rowElementInside.querySelectorAll('.lang')];
                    buttonElementsInside.forEach((buttonElement) => {
                        if (buttonElement.classList.contains('changeable')) {
                            const spans = [...buttonElement.children];
                            let temp = null;
                            temp = spans[0].classList.value;
                            spans[0].classList.remove(spans[0].classList.value);
                            spans[0].classList.add(spans[1].classList);
                            spans[1].classList.remove(spans[1].classList);
                            spans[1].classList.add(temp);
                        }
                    });
                });
            }
        }
    });

    pressed.delete(event.key);
});

textarea.onkeypress = (event) => {
    if (!(event.keyCode === 32 || event.keyCode === 13)) {
        return false;
    }
    return true;
};
