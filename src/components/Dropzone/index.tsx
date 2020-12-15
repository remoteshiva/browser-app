import React, { useCallback, useState } from 'react'
import { storage } from 'firebase'
import { useDropzone } from 'react-dropzone'

interface Props {
  active: boolean
  onImageUploading: () => void
  onImageUploaded: (url: string) => void
}
const PhotoDropzone = ({ active, onImageUploading, onImageUploaded }: Props) => {
  const [uploading, setUploading] = useState(0)
  const onDrop = useCallback((files: File[]) => {
    onImageUploading()
    files.map(file => {
      const reader = new FileReader()
      reader.onload = () => {
        const task = storage().ref().child(`user_images/${1}/${file.name}`).put(file)
        task.on(
          storage.TaskEvent.STATE_CHANGED,
          snapshot => {
            if (snapshot.state === storage.TaskState.SUCCESS || snapshot.state === storage.TaskState.ERROR) {
              setUploading(0)
            } else if (snapshot.state === storage.TaskState.RUNNING) {
              setUploading(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
            }
          },
          error => {
            console.log('Error uploading', error)
          },
          () => {
            task.snapshot.ref.getDownloadURL().then(url => {
              // send the file url up
              onImageUploaded(url)
              setUploading(0)
            })
          }
        )
      }
      reader.readAsArrayBuffer(file)
      return file
    })
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false, accept: 'image/*' })
  return (
    <div style={{ width: '100%', height: '100%' }} {...getRootProps()}>
      <input {...getInputProps()} disabled={!active} />
    </div>
  )
}

export default PhotoDropzone
