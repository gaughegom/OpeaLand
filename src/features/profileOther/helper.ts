 export function validateEmail(input: string) {
    var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.match(validRegex) || input === "") {
        return true;
    } else {
        return false;
    }
}
export function validateUserName (input: string) {
    var validRegex =
        /^[a-zA-Z0-9.\-\_]+$/;

    if (input.match(validRegex) || input === "") {
        return true;
    } else {
        return false;
    }
}
