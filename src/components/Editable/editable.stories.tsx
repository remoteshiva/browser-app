import React, { useState } from 'react'
import styled from 'styled-components'
import Editable from './'

export default {
  title: 'Editable Element',
  component: Editable,
}

const Wrapper = styled.div`
  display: inline-block;
  padding: 10px;
  width: 400px;
  height: 300px;
  background-color: #ddd;
  overflow: auto;
  /* .editable {
    color: purple;
  } */
`

const EditableContainer = () => {
  const [content, setContent] = useState('')
  const [editable, setEditable] = useState<boolean>(true)
  const handleInput = (html: string) => {
    setContent(html)
  }
  return (
    <>
      <div>This is the content: {content}</div>
      <input type="checkbox" checked={editable} onChange={() => setEditable(!editable)} />
      <br />
      {/* <Wrapper> */}
      <Editable html={content} active={editable} onInput={handleInput} />
      {/* </Wrapper> */}
    </>
  )
}

export const Default = () => <EditableContainer />
