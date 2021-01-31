import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { patchShiva } from '../../services/shiva';
import { ShivaPanel, withPanel } from './Panel';
import Editable from '../../components/Editable';
import { isValidURL } from '../../utils';

const VideoLink = ({ shiva, editing, save }: ShivaPanel) => {
  const instructions = `Add link here`;
  const [videoLink, setVideoLink] = useState(
    shiva.videoLink ? shiva.videoLink.toString() : ''
  );
  const [validURL, setValidURL] = useState(isValidURL(videoLink));
  const dispatch = useDispatch();
  useEffect(() => {
    if (save && save > 0) {
      if (isValidURL(videoLink)) {
        setValidURL(true);
        const partialShiva = { videoLink: new URL(videoLink) };
        dispatch(patchShiva(shiva.id, partialShiva));
      } else {
        setValidURL(false);
      }
    }
  }, [dispatch, save, shiva.id, videoLink]);
  const link = videoLink?.toString() || '';

  return (
    <>
      <h2>Video link</h2>
      <Editable
        tagName="a"
        href={link}
        className={
          'video-link ' + (editing ? 'active' : validURL ? '' : 'invalid')
        }
        html={link ? link : editing ? '' : instructions}
        active={editing || false}
        onInput={(html: string) => setVideoLink(html)}
      />
    </>
  );
};
export default withPanel(VideoLink);
