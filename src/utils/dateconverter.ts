export const zuluToDateTime = (zulu: string) => {
    const date = new Date(zulu);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};