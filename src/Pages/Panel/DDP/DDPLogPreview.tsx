import React, { FunctionComponent } from 'react';
import { PanelStoreConstructor } from '../../../Stores/PanelStore';
import { Icon, IconName, Tag, Tooltip } from '@blueprintjs/core';

interface Props {
  log: DDPLog;
  store: PanelStoreConstructor;
}

const getTag = (icon: IconName, title: string) => (
  <Tooltip content={title} hoverOpenDelay={800} position='top'>
    <Icon
      icon={icon}
      style={{
        marginRight: 10,
        marginBottom: 1,

        color: '#8a9ba8',
      }}
      iconSize={12}
    />
  </Tooltip>
);

const getTypeTag = (filterType?: FilterType | null) => {
  switch (filterType) {
    case 'heartbeat':
      return getTag('heart', 'Heartbeat');
    case 'connection':
      return getTag('globe-network', 'Connection');
    case 'collection':
      return getTag('database', 'Collection');
    case 'subscription':
      return getTag('feed-subscribed', 'Subscription');
    case 'method':
      return getTag('derive-column', 'Method');
    default:
      return getTag('warning-sign', 'Unknown');
  }
};

export const DDPLogPreview: FunctionComponent<Props> = ({ log, store }) => {
  return (
    <>
      {getTypeTag(log.filterType)}
      <Tag
        interactive
        minimal
        onClick={() => {
          store.setActiveLog(log);
        }}
      >
        <small>
          <code>{log.preview}</code>
        </small>
      </Tag>
    </>
  );
};
