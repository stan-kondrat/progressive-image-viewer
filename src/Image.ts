import rust from '../crate/Cargo.toml'

export class Image {
    public width?: number
    public height?: number

    private rustImage?: typeof rust.RustImage.prototype

    constructor(public readonly name: string, public readonly buffer: ArrayBuffer) {
        // try {
        //     this.rustImage = rust.RustImage.new(new Uint8Array(buffer))
        //     this.width = this.rustImage.width
        //     this.height = this.rustImage.height
        // } catch (error) {
        //     console.error('RustImage Error')
        //     // console.error(error)
        // }
    }

    public dispose() {
        this.rustImage?.free()
    }
}