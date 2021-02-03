import React from 'react'
import styled from 'styled-components'
import { useNotify } from '../../components/common/hooks'
import ClipboardJS from 'clipboard';

const Wrapper = styled.div`
  display: flex;
  .linktext {
    display: inline-block;
    background-color: white;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    width: 280px;
    line-height: 47px;
    color: ${props => props.theme.colors.heavyMetal};
    opacity: 0.6;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-left: 15px;
  }
  .linkcopy {
    display: inline-block;
    background-color: ${props => props.theme.colors.richGold};
    color: white;
    padding: 0 18px;
    line-height: 47px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`

interface Props {
  text: string
}
const LinkWithCopy = ({text}: Props) => {
  const notify = useNotify()

  const handleCopyLink = async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text)
        notify('Link copied', 'The link for visitors has been added to your clipboard.')
      } catch (error) {
        console.log(error) // we should show a message
      }
    } else {
      new ClipboardJS(text);
      // this is a polyfill
      document.execCommand('copy', true)
    }
  }
  return <Wrapper>
    <div className="linktext">{text}</div>
    <button className="linkcopy" onClick={handleCopyLink}>copy</button>
  </Wrapper>
}

export default LinkWithCopy
