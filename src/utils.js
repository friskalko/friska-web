export function convertToCapitalWordsString(text) {
    // Split the string by any spaces
    if (typeof text !== "string") {
        throw new Error("The argument must be a string");
    }

    const words = text.trim().split(/\s+/);

    // Capitalize the first letter of each word and convert the rest to lowercase
    const capitalizedWords = words.map((word) => {
        const firstLetter = word.charAt(0).toUpperCase();
        const restOfWord = word.slice(1).toLowerCase();
        return firstLetter + restOfWord;
    });

    // Join the words using a single space
    const result = capitalizedWords.join(" ").trim();

    return result;
}
