const API_URL = import.meta.env.VITE_API_URL;
export const request = async (method, url, data) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) || undefined,
    };
    
    try {
        const response = await fetch(`${API_URL}${url}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};