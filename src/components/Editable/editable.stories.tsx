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
  width: 200px;
  background-color: #ddd;
  .edit {
    color: purple;
  }
`

const EditableContainer = () => {
  const [content, setContent] = useState('')
  const [editable, setEditable] = useState<boolean>(true)
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }
  return (
    <>
      <div>This is the content: {content}</div>
      <input type="checkbox" checked={editable} onChange={() => setEditable(!editable)} />
      <br />
      <Wrapper>
        <Editable html={content} className="edit" active={editable} onInput={handleInput} style={{ color: 'red' }} />
      </Wrapper>
    </>
  )
}

export const Default = () => <EditableContainer />
