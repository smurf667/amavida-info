import React, { useEffect, useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { InfoCard, InfoProps } from './InfoCard';
import Header from './Header';
import { ReactComponent as QRCode } from './share-code.svg';
import { Decompressor } from './Decompressor';

function App() {
  const { t } = useTranslation();
  const [cardInfo, setCardInfo] = useState([] as InfoProps[]);
  const [showAccept, setShowAccept] = useState(false);

  useEffect(() => {
    fetch('/jan/ai/data.json')
      .then((res) => {
        const time = res.headers.get('last-modified');
        if (time) {
          localStorage.setItem('modified', time);
        }
        return res.json();
      })
      .then(
        (raw) => {
          const result = Decompressor.decompress(raw);
          setCardInfo(result);
          localStorage.setItem('data', JSON.stringify(result));
        },
        (error) => {
          const local = localStorage.getItem('data');
          if (local) {
            setCardInfo(JSON.parse(local));
            if (!localStorage.getItem('modified')) {
              localStorage.setItem('modified', new Date().toUTCString());
            }
          }
        },
      );
  }, []);

  const closeDisclaimer = (accepted: boolean) => {
    setShowAccept(false);
    if (accepted) {
      localStorage.setItem('accepted', 'true');
    } else {
      window.open('about:blank', '_self');
      window.close();
    }
  };

  useEffect(() => {
    if (localStorage.getItem('accepted') !== 'true') {
      const timeout = setTimeout(() => setShowAccept(true), 2000);
      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <div>
      <Header />
      <Grid container component="div" spacing={2} style={{ padding: 24, width: '100%' }} alignItems="stretch">
        {
          cardInfo.map((info, index) => (
            <Grid key={`card-${index}`} item xs={12} sm={6} lg={3} xl={2} style={{ display: 'flex' }}>
              <InfoCard {...info} />
            </Grid>
          ))
        }
        <Grid key="qr" item xs={12} sm={6} lg={3} xl={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <QRCode viewBox="0 0 200 200" height="100%" preserveAspectRatio="xMinYMin slice" />
        </Grid>
      </Grid>
      <Dialog
        open={showAccept}
        aria-labelledby="alert-accept-title"
        aria-describedby="alert-accept-desc"
      >
        <DialogTitle id="alert-accepet-title">{t('disclaimer')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-accept-desc">{t('warranty')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" autoFocus onClick={() => closeDisclaimer(true)}>
            {t('agree')}
          </Button>
          <Button color="primary" autoFocus onClick={() => closeDisclaimer(false)}>
            {t('disagree')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
