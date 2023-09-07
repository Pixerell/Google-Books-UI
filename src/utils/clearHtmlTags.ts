export function stripHtmlTags(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    if (div.textContent == "undefined") {
        return "";
    }
    return div.textContent || div.innerText || '';
}