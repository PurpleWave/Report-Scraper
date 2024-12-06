/**
 * Cleans up a URL to remove query parameters and ensure it is safe for file names.
 * @param url - The URL string.
 * @returns A sanitized string for use in file names.
 */
export function sanitizeUrlForFileName(url: string): string {
    const sanitizedUrl = url.split('?')[0]; // Remove query parameters
    const urlParts = sanitizedUrl.split('/').filter(Boolean); // Split by '/' and remove empty parts
    return urlParts[urlParts.length - 1] || 'unknown'; // Use the last part of the URL or 'unknown'
  }
  
  /**
   * Generates a file path for a PDF based on the current date, report name, and sanitized URL.
   * @param reportName - The name of the report (e.g., 'InvoicesSummary').
   * @param url - The URL being processed.
   * @returns A string representing the file path in the format "MM-DD-REPORTNAME-URL.pdf".
   */
  export function generateFilePath(reportName: string): string {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `../reports/${month}-${day}-${reportName}.pdf`;
  }
  