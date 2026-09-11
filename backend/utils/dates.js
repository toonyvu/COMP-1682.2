export function convertToDate(dateString) {
    const date = new Date(dateString);
    const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return formatted;
}
//# sourceMappingURL=dates.js.map