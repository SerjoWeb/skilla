export interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}
