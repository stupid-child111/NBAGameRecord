let chunkSize = 1024 * 256;
let totalChunks = 0;
const handleFileUpload = (file) => {
    totalChunks = Math.ceil(file.length / chunkSize);
}
const handleFileSlice = (file) => {
    const chunks = [];
    handleFileUpload(file);
    for (let i = 0; i < totalChunks; i++) {
        chunks.push(file.slice(i * chunkSize, (i + 1) * chunkSize));
    }
    return {
        chunks,
        totalChunks
    };
}
export default handleFileSlice;