export interface SendEmailEndpointPayload extends ContactFormRequest {
  email: string;
  name: string;
  phone: string;
  message: string;
  lang: 'es' | 'en';
}
