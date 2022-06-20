declare module "*.png";
declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "uuid/v4" {
  export { v4 as default } from "@types/uuid";
}
