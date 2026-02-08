declare module "subdomain-generator" {
  export interface GenerateSubdomainOptions {
    suffixLength?: number;
    separator?: string;
  }

  export default function generateSubdomain(
    options?: GenerateSubdomainOptions,
  ): string;
}
