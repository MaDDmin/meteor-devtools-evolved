import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import { Hideable } from '../../../Utils/Hideable';
import { usePanelStore } from '../../../Stores/PanelStore';
import { DDPLog } from '../DDP/DDPLog';
import { Travolta } from '../../../Utils/Travolta';
import { DDPStatus } from '../DDP/DDPStatus/DDPStatus';

interface Props {
  isVisible: boolean;
}

export const Bookmarks: FunctionComponent<Props> = observer(({ isVisible }) => {
  const store = usePanelStore();
  const pageStore = store.bookmarkStore;

  const logs = pageStore.paginated.map(({ log }) => (
    <DDPLog
      key={log.id}
      store={store}
      log={log}
      isNew={false}
      isStarred={pageStore.bookmarkIds.includes(log.id)}
      {...log}
    />
  ));

  return (
    <Hideable isVisible={isVisible}>
      <div className='mde-ddp'>{logs?.length ? logs : <Travolta />}</div>

      <DDPStatus
        activeFilters={pageStore.activeFilters}
        collectionLength={pageStore.collection.length}
        isLoading={pageStore.isLoading}
        pagination={pageStore.pagination}
        setFilter={pageStore.setFilter.bind(pageStore)}
        setSearch={pageStore.setSearch.bind(pageStore)}
      />
    </Hideable>
  );
});