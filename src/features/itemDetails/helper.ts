export const swapDateAndMonth = (stringDate: string) => {
    if (!stringDate) return stringDate;
    const splitDate = stringDate.split("/");
    const temp = splitDate[0];
    splitDate[0] = splitDate[1];
    splitDate[1] = temp;
    return splitDate.join("/");
};

export const isBidding = (stringDate: string | undefined): boolean => {
    if (stringDate)
        return new Date(Date.now()) < new Date(swapDateAndMonth(stringDate));
    else return false;
};
