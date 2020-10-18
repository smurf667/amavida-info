import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Translation } from 'react-i18next';

export interface Link {
  link: string;
  standby?: boolean;
}

export interface InfoProps {
  titleKey: string;
  address: string[];
  links: Link[];
}

function print(link: string): string {
  const stripped = link.replace(/tel:|href:|mailto:|https?:\/\//, '');
  const match = stripped.match(/\+41([0-9]{2})([0-9]{3})([0-9]{2})([0-9]{2})/);
  if (match) {
    match.shift();
    return `☎ 0${match.join(' ')}`;
  } else if (link.indexOf('mailto:') === 0) {
    return `✉ ${stripped}`;
  }
  return stripped;
}

export class InfoCard extends React.Component<InfoProps> {
  render() {
    return (
      <Card style={{
        width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'column',
      }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2"><Translation>{(t) => t(this.props.titleKey)}</Translation></Typography>
          <Typography gutterBottom component="div">
            {
              this.props.address.map((line, index) => (<div key={`${this.props.titleKey}-adr-${index}`}>{line}</div>))
            }
          </Typography>
          <Typography gutterBottom component="div">
            {
              this.props.links.map((item, index) => (
                <div key={`${this.props.titleKey}-lnk-${index}`}>
                  <a href={item.link}>{print(item.link)}</a>
                  {item.standby ? <Translation>{(t) => t('standby')}</Translation> : ''}
                </div>
              ))
            }
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default InfoCard;
