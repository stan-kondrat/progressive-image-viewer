
declare module "*.toml" {
    const content: typeof import('../crate/pkg/progressive_image_viewer');
    export default content;
}
