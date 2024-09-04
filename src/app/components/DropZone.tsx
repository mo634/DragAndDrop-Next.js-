"use client"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"


const DropZone = ({ className }: { className: string }) => {
    const onDrop = useCallback((acceptedFiles: any) => {
        console.log(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps({ className })}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop files here</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}

export default DropZone