export function sliceString(input: string | undefined, numberOfLetter: number) {
    if (!input) {
        return "No description";
    }
    if (input.length <= numberOfLetter) {
        return input;
    }
    return input.slice(0, numberOfLetter) + "...";
}
