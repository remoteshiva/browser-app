import React, { useCallback, useState } from 'react'
import firebase from 'firebase/app';
import 'firebase/storage';
import { useDropzone } from 'react-dropzone'

interface Props {
  active: boolean
  onImageUploading: () => void
  onImageUploaded: (url: string) => void
}
const PhotoDropzone = ({ active, onImageUploading, onImageUploaded }: Props) => {
  const [, setUploading] = useState(0)
  const onDrop = useCallback((files: File[]) => {
    onImageUploading()
    files.map(file => {
      const reader = new FileReader()
      reader.onload = () => {
        const task = firebase.storage().ref().child(`user_images/${1}/${file.name}`).put(file)
        task.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          snapshot => {
            if (snapshot.state === firebase.storage.TaskState.SUCCESS || snapshot.state === firebase.storage.TaskState.ERROR) {
              setUploading(0)
            } else if (snapshot.state === firebase.storage.TaskState.RUNNING) {
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
  }, [onImageUploaded, onImageUploading])
  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false, accept: 'image/*' })
  return (
    <div style={{ width: '100%', height: '100%' }} {...getRootProps()}>
      <input {...getInputProps()} disabled={!active} />
    </div>
  )
}

export default PhotoDropzone
