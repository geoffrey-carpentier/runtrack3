function jsonValueKey(jsonString, key) {
    try {
        const jsonObj = JSON.parse(jsonString);
        return jsonObj[key];
    } catch (error) {
        console.error("Invalid JSON string:", error);
        return null;
    }