export interface SnackbarServiceInterface {
    /**
     * Open and show the snackbar
     * @param content content shown by snackbar
     * @param action action available in the snackbar
     * @param duration duration of the snackbar
     */
    open(content: string, action: string, duration: number): void
}