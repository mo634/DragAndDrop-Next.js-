"use client"
import Image from "next/image";
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"


const DropZone = () => {

    const [files, setFiles] = useState<any[]>([]);
    const onDrop = useCallback((acceptedFiles: any) => {
        // If there are any accepted files
        if (acceptedFiles.length > 0) {
            // Update the state with the new files
            setFiles(prev => [
                // Keep the existing files
                ...prev,
                // Add the new files with a preview URL
                ...acceptedFiles.map((file: any) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })

                )
            ])
        }
    }, [])

    const removeImage = (name: string) => {
        setFiles(prev => prev.filter(file => file.name !== name))
    }
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    console.log("files", files)
    return (
        <>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop files here</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>

            {/* render the images uploaded  */}

            <div className=" bg-blue-700 rounded-md p-2 mt-2">
                {files.map((file, index) => (
                    <div key={index}>
                        <p>{file.name}</p>
                        <Image
                            width={100}
                            height={100}
                            src={file.preview} alt={file.name} />
                        <button
                            onClick={() => removeImage(file.name)}
                            className="my-2 bg-red-500 text-white p-1 rounded-md">Delete</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default DropZone