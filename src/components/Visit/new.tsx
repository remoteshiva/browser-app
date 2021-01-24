import React, { forwardRef } from 'react';
import { VisitWrapper } from './styles';

interface NewVisitProps {
  start: string;
  end: string;
}
// this is a temporary event meant for drawing only
const NewVisit = forwardRef(
  ({ start, end }: NewVisitProps, ref: React.Ref<HTMLDivElement>) => {
    return (
      <VisitWrapper ref={ref}>
        {start} - {end}
      </VisitWrapper>
    );
  }
);

export default NewVisit;
