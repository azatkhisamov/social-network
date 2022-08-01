export const required = (value) => {
    if (value) {
        return undefined;
    }
    return "Поле обязательно для ввода"
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value && value.length > maxLength) {
        return `Максимальное число знаков ${maxLength}`;
    }
    return undefined;
}