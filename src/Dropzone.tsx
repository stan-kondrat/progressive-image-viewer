import { useCallback, useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bbb',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer',
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export function Dropzone({ onLoad }: {
  onLoad: (params: { name: string, buffer: ArrayBuffer }) => void
}) {
  const [loading, setLoading] = useState(false);

  const urlRef = useRef<HTMLInputElement>();

  const onDrop = useCallback((acceptedFiles) => {

    acceptedFiles.forEach((file: any) => {
      setLoading(true)
      const reader = new FileReader()
      reader.onabort = () => {
        console.info('file reading was aborted');
        setLoading(false)
      }
      reader.onerror = () => {
        console.error('file reading has failed'); setLoading(false)
      }
      reader.onload = () => {
        setLoading(false)
        if (reader.result instanceof ArrayBuffer && typeof file.name === "string") {
          onLoad({ name: file.name, buffer: reader.result })
        }
      }

      reader.readAsArrayBuffer(file)
    })

  }, [])

  const onUrlClick = (event: any) => {
    event.preventDefault();
    setLoading(true)

    let url = urlRef.current?.value;
    if (!url) {
      return
    }

    fetch(url)
      .then(async (response) => {
        const name = response?.headers?.get('Content-Disposition')?.split('filename=')[1] ?? "";
        const blob = await response.blob()
        const buffer = await blob.arrayBuffer()
        onLoad({ name, buffer })
        setLoading(false)
      }).catch(() => {
        setLoading(false)
      })
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop, multiple: false })

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]) as any;

  const rootProps = getRootProps({ style }) as any
  const inputProps = getInputProps() as any
  return (
    <div className={`load-source ${loading ? 'has-loading' : ''}`}>
      <div className="load-source-url">
        Upload From URL Link
            <input ref={urlRef as any} value="https://source.unsplash.com/user/surface/800x600" />
        <button onClick={onUrlClick}>Load</button>
      </div>
      <div {...rootProps}>
        <input {...inputProps} />
        <p>Or Drag 'n' drop image file here, or click to select files</p>
      </div>
    </div>
  )
}
