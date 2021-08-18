export class SocialAuthResponse {
  id: string;
  name: string;
  email: string;

  constructor(rawData: { [key in string]: any }) {
    this.id = rawData.id ?? rawData.uid ?? '';
    this.name = rawData.name ?? rawData.displayName ?? '';
    this.email = rawData?.email;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }
}
