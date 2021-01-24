import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import {
  Visit,
  Visitor,
  Mourner,
  MournerId,
  Role,
} from '../../store/shiva/types';
import CheckedIcon from '../../assets/img/checkbox-round-checked.svg';
import UncheckedIcon from '../../assets/img/checkbox-round-unchecked.svg';
import { VerticalSpace } from '../../components/common';

const Wrapper = styled.div`
  display: block;
  width: 250px;
  text-align: left;
  padding: 13px 25px 20px 25px;
  font-family: 'Lato';
  font-size: 13px;
  /* line-height: 25px; */
  cursor: pointer;
  .title {
    font-size: 15px;
    font-weight: 600;
    color: ${props => props.theme.colors.heavyMetal};
  }
  .mourner {
    display: flex;
    overflow: hidden;
    &.editor {
      margin-top: 10px;
      min-height: 20px;
      span {
        line-height: 20px;
      }
    }
    img {
      margin-right: 5px;
    }
    .name {
      display: inline;
      margin-right: 14px;
      font-weight: normal;
      color: ${props => props.theme.colors.doveGray};
      white-space: nowrap;
    }
    .relationship {
      display: inline;
      font-style: italic;
      font-weight: 100;
      color: ${props => props.theme.colors.doveGray};
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .visitor {
    color: ${props => props.theme.colors.doveGray};
  }
  button {
    width: 100%;
    padding: 8px;
    border-radius: 16.5px;
    background-color: ${props => props.theme.colors.richGold};
    color: white;
  }
`;

interface MournerRowProps extends Mourner {
  attending: boolean;
  role: Role;
  onCheckChanged: (identifier: string, attending: boolean) => void;
}
const MournerRow = ({
  name,
  relationship,
  attending,
  role,
  onCheckChanged,
}: MournerRowProps) => {
  const [checked, setChecked] = useState(attending);
  const handleChange = () => {
    if (onCheckChanged) onCheckChanged(name + relationship, !checked);
    setChecked(!checked);
  };
  if (role === 'Visitor' && !attending) return null;
  return (
    <div className={`mourner ${role === 'Visitor' ? '' : 'editor'}`}>
      {role !== 'Visitor' ? (
        <img
          src={checked ? CheckedIcon : UncheckedIcon}
          onClick={handleChange}
          alt="checkbox"
        />
      ) : null}
      <span className="name">{name}</span>
      <span className="relationship">{relationship}</span>
    </div>
  );
};

const VisitorRow = ({ name, time }: Visitor) => (
  <div className="visitor">
    {name} ({time ? format(time, 'p') : null})
  </div>
);

interface Props extends Visit {
  role: Role;
  mournersList: Mourner[];
  onAddVisitor: () => void;
  onToggleMournerParticipation: (
    mourner: MournerId,
    attending: boolean
  ) => void;
}

const VisitData = ({
  role,
  mournersList,
  visitors,
  missingMourners,
  onAddVisitor,
  onToggleMournerParticipation,
}: Props) => {
  missingMourners = missingMourners || [];
  const renderMourners = () => {
    return mournersList.map((m, i) => (
      <MournerRow
        key={i}
        role={role}
        attending={!missingMourners.includes(m.name + m.relationship)}
        {...m}
        onCheckChanged={onToggleMournerParticipation}
      />
    ));
  };
  return (
    <Wrapper>
      <div className="title">Mourners</div>
      {renderMourners()}
      <VerticalSpace height={10} />
      <div className="title">Visitors</div>
      {visitors.map((v, i) => (
        <VisitorRow key={i} {...v} />
      ))}
      <VerticalSpace height={15} />
      <button onClick={onAddVisitor}>Plan to visit</button>
    </Wrapper>
  );
};

export default VisitData;
