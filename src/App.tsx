import React from "react";
import { Dropzone } from "./Dropzone";
import { ImagePreview } from "./ImagePreview";
import { Image } from "./Image"
import { PartiallyControls } from "./PartiallyControls";

import './App.scss'

interface AppState {
    sourceImage?: Image
    previewImage?: Image
}


export class App extends React.PureComponent<{}, AppState> {

    public render() {
        return (
            <>
                <h1>Progressive Image Viewer - Online Tool</h1>

                <h2>1. Load source image</h2>
                <Dropzone onLoad={this.setSource} />

                <br />
                <h2>2. Test partially loaded image</h2>

                <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
                    <PartiallyControls
                        maxSize={this.state.sourceImage?.buffer.byteLength ?? 0}
                        loadPartially={this.loadPartially}
                    />
                    <ImagePreview image={this.state.previewImage} />
                </div>

                <br />
                {/* <h2>3. Compare with other image file formats</h2> */}
                {/* re-compressing  */}
            </>
        )
    }

    private setSource = ({ name, buffer }: { name: string, buffer: ArrayBuffer }) => {
        this.state.sourceImage?.dispose()
        this.state.previewImage?.dispose()
        const image = new Image(name, buffer)
        this.setState({ sourceImage: image, previewImage: image });
    }

    private loadPartially = async (size: number): Promise<void> => {
        if (!this.state.sourceImage) {
            return
        }
        let { name, buffer } = this.state.sourceImage
        this.state.previewImage?.dispose()
        let previewImage = new Image(name, buffer.slice(0, size))
        this.setState({ previewImage })
    }
}

