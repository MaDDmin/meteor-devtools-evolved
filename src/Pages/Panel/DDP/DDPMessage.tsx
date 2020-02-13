import React, { FunctionComponent, useState } from 'react';
import moment from 'moment';
import { Classes, Icon, Tag } from '@blueprintjs/core';
import classnames from 'classnames';

const MAX_PREVIEW_LENGTH = 64;

interface Props {
  message: MeteorMessage;
}

export const DDPMessage: FunctionComponent<Props> = ({ message }) => {
  const [isNew, setIsNew] = useState(true);

  const { content, timestamp, isOutbound, isInbound, hash } = message;

  const direction = (isOutbound?: boolean, isInbound?: boolean) => {
    if (isOutbound && isInbound) {
      return <Icon icon='full-circle' />;
    }

    if (isOutbound) {
      return <Icon icon='arrow-top-right' intent='danger' />;
    }

    if (isInbound) {
      return <Icon icon='arrow-bottom-left' intent='success' />;
    }

    return <Icon icon='warning-sign' intent='warning' />;
  };

  const preview = (content: string) => {
    return content.length > MAX_PREVIEW_LENGTH
      ? content.slice(0, MAX_PREVIEW_LENGTH).concat('...')
      : content;
  };

  const time = (timestamp?: number) =>
    timestamp ? moment(timestamp).format('HH:mm:ss.SSS') : 'Unknown';

  const classes = classnames('mde-ddp__log-row', {
    'mde-ddp__log-row--new': isNew,
  });

  setTimeout(() => {
    setIsNew(false);
  }, 1000);

  return (
    <div className={classes}>
      <div className='time'>
        <Tag minimal>{time(timestamp)}</Tag>
      </div>
      <div className='direction'>{direction(isOutbound, isInbound)}</div>
      <div className='content'>
        <code className={Classes.CODE}>{preview(content)}</code>
      </div>
      <div className='hash'>
        <Tag minimal>{hash?.slice(0, 6)}</Tag>
      </div>
      <div className='interactions'>
        <Icon icon='star-empty' />
      </div>
    </div>
  );
};
