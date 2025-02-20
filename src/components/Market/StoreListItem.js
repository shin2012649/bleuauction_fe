import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './StoreListItem.module.css';
import { Link } from 'react-router-dom';
import { isOpenNow, sendAxiosRequest, startEndTimeInfo } from '../utility/common';
import { useUser } from '../Auth/UserContext';

function StoreListItem(props) {
  // const {user, login} = useUser();
  let [store, setStore] = useState(props.data);
  let [open, setOpen] = useState('O');

  useEffect(() => {
    let startEndTime = startEndTimeInfo(store);
    let openStatus = isOpenNow(startEndTime[0], startEndTime[1]);
    setOpen(openStatus);
  }, []);
  return (
    <div className={styles.storeListItemBox}>


    {store.storeAttaches && store.storeAttaches[0] ? (
                  <img  className={styles.storeListItemBoss}
                    src={`https:kr.object.ncloudstorage.com/bleuauction-bucket/store/${store.storeAttaches[0].saveFilename}`}
                    alt={store.storeAttaches[0].originFilename}
                  />
                ) : (
                  <img src="/images/boss.png" alt="store" />
                )}

      <div className={styles.storeListItemDetailTop}>
        <div className={styles.storeListItemHeader}>
          <strong className={styles.storeListItemDetailName}>{store.storeName}</strong>
          <span className={styles.storeListItemDetailMarket}>{store.marketName}</span>
          <span className={styles.storeListItemDetailIntroduce}>{store.storeAddr}</span>
        </div>
        
        <p className={styles.storeListItemBoxReview}>
          <img className={styles.storeListItemFresh} src='/images/fresh.png' />5.0 (1024)
        </p>
        <p className={styles.storeListItemBoxState}>
          <img className={styles.storeListItemStateIcon} src='/images/heart.png' />
          {open == 'O' ? '영업중' : '영업종료'}
        </p>

        <div className={styles.storeListItemDetailBoxMore}>
          <Link to="/market/detail" state={store}>더보기&gt;</Link>
        </div>
      </div>

    </div>
  );
}

export default StoreListItem;