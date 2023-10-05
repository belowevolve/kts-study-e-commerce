///<reference types="webpack-env" />

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const content: React.FC<React.SVGAttributes<SVGElement>>;
  export default content;
}
