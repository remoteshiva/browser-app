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
  const linkFromStore = shiva.videoLink?.href;
  const [validURL, setValidURL] = useState(isValidURL(videoLink));
  const dispatch = useDispatch();
  useEffect(() => {
    if (save && save > 0) {
      if (linkFromStore && isValidURL(linkFromStore) && isValidURL(videoLink)) {
        setValidURL(true);
        const partialShiva = {
          videoLink: new URL(videoLink),
        };
        dispatch(patchShiva(shiva.id, partialShiva));
        return;
      } else if (!isValidURL(videoLink)) {
        // TODO: wow, I'm really sorry
        const newURL = videoLink.split('</a>')[1];
        const currentHref = videoLink.split('href="')[1]
          ? videoLink.split('href="')[1].split('"')[0]
          : '';
        if (newURL !== undefined) {
          setVideoLink(currentHref + newURL);
          setValidURL(true);
          const partialShiva = {
            videoLink: new URL(currentHref + newURL),
          };
          dispatch(patchShiva(shiva.id, partialShiva));
        }
      } else {
        setValidURL(false);
      }
    }
  }, [dispatch, linkFromStore, save, shiva.id, videoLink]);
  const link = videoLink?.toString() || '';

  return (
    <>
      <h2>Video link</h2>
      <Editable
        tagName="a"
        href={videoLink}
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
