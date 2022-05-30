export function sliceString(input: string, numberOfLetter: number) {
    if (input.length <= numberOfLetter) {
        return input;
    }
    return input.slice(0, numberOfLetter) + "...";
}