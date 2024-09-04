"use client"
import Image from "next/image";
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"


const DropZone = () => {

    const [files, setFiles] = useState<any[]>([]);
    const [error, setError] = useState<any[]>([])
    // catch rejected files to show the error message
    const onDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {
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
        console.log("rejectedFiles", rejectedFiles[0].errors[0].message)
        setError(prev => [...prev, rejectedFiles])
    }, [])

    const removeImage = (name: string) => {
        setFiles(prev => prev.filter(file => file.name !== name))
    }

    // add restriction to the file type
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            // accept all image types
            'image/*': []
        }
    })
    console.log("files", files)
    console.log("rejected files", error)
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
            {/* render the error message */}
            {
                error.length > 0 && (
                    <div className="bg-red-500 text-white p-2 rounded-md mt-2">
                        {
                            error.map((element: any, index: number) => (
                                element.map(({ file, errors }: { file: any, errors: any[] }, index: number) => (
                                    errors.map((err: any, index: number) => (
                                        <p key={index}>
                                            {file.name}
                                            {err.message}
                                        </p>
                                    ))
                                ))
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}

export default DropZone