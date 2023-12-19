/**
 * Used at the start of the projet to remove unused fields in the JSON taken from the devtools of the browser,
 * to keep only the fields that are used in the code.
 * 
 * Not used any more, but kept just in case.
 * 
 * @param obj WAM2 GUI JSON 
 * @param unusedFields List of fields we want to remove
 */
function removeUnusedFields(obj: any, unusedFields: string[]): any {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
            obj[index] = removeUnusedFields(item, unusedFields);
        });
    } else {
        Object.keys(obj).forEach((key) => {
            if (unusedFields.includes(key)) {
                delete obj[key];
            } else {
                obj[key] = removeUnusedFields(obj[key], unusedFields);
            }
        });
    }

    return obj;
}
/**
 * Function to fill hole in the code when we want to do something, but we don't know what yet.
 * 
 * @param s Message to display
 */
export function todo(s: string) {
    console.log("TODO" + s);
}
