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
    const handleSubmit = async (e: any) => {
        console.log("submite clicked ")

        e.preventDefault()

        if (!files?.length) return



        const formData = new FormData()
        files.forEach(file => formData.append('file', file))
        formData.append('upload_preset', 'exy2m2qn')




        console.log("files", files)

        const url: string = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string
        if (!url) {
            console.error("Cloudinary URL is not defined");
            return;
        }

        const data = await fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.json())

        console.log(data)







    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop files here</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                </div>
                <button
                    className="bg-blue-500 text-white p-2 rounded-md mt-2"
                >
                    click to upload on cloudinary
                </button>
            </form>

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