import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import {
  Menu, MenuItem, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import TranslateIcon from '@material-ui/icons/Translate';

interface Language {
  title: string,
  code: string,
}
// non-translated language list - each entry in it's own language!
const LANGUAGES: Language[] = [
  {
    title: 'Deutsch',
    code: 'de',
  },
  {
    title: 'English',
    code: 'en-GB',
  },
];

const Header = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang: string) => i18n.changeLanguage(lang);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showInfo, setShowInfo] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setAnchorEl(null);
    const code = e.currentTarget?.getAttribute('data-code');
    if (code) {
      changeLanguage(code);
    }
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={() => setShowInfo(true)}>
            <InfoIcon />
          </IconButton>
          <Typography variant="h5" color="inherit" style={{ width: '75%' }}>{t('title')}</Typography>
          <Box style={{
            width: '25%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'row',
          }}
          >
            <IconButton color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <TranslateIcon />
            </IconButton>
            <IconButton color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={() => {
              window.open('about:blank', '_self');
              window.close();
            }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {
              LANGUAGES.map((l) => (
                <MenuItem onClick={handleClose} key={l.code} data-code={l.code}>{l.title}</MenuItem>
              ))
            }
          </Menu>
        </Toolbar>
      </AppBar>
      <Dialog
        open={showInfo}
        aria-labelledby="alert-mod-title"
        aria-describedby="alert-mod-desc"
      >
        <DialogTitle id="alert-mod-title">{t('data')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-mod-desc">
            <div>{new Date(localStorage.getItem('modified') as string).toLocaleString(i18n.language)}</div>
            <div>{t('author')}</div>
            <div><a href="https://github.com/smurf667/amavida-info/">{t('website')}</a></div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" autoFocus onClick={() => setShowInfo(false)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Header;
