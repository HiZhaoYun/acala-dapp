import React from 'react';
import { Grid, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

import Card from '@/components/card';
import { useTranslate } from '@/hooks/i18n';
import { getAssetName } from '@/utils';
import { createTypography } from '@/theme';
import { dark } from '@material-ui/core/styles/createPalette';


const useListItemStyles = makeStyles((theme: Theme) =>
    createStyles({
        primary: {
            ...createTypography(15, 22, 600),
            color: theme.palette.secondary.main,
        },
        secondary: {
            ...createTypography(22, 32, 600),
            color: theme.palette.grey[900],
        }
    }),
);

const useButtonStyle = makeStyles((theme: Theme) =>
createStyles({
    root: {
        width: 114,
        height: 48,
        background: theme.palette.primary.light
    }
}));

interface Props {
    asset: number
}

const VaultPanel: React.FC<Props> = ({ asset }) => {
    const { t } = useTranslate();
    const listItemClasses = useListItemStyles();
    const buttonClasses = useButtonStyle();
    return (
        <Grid container spacing={5}>
            <Grid item xs={6}>
                <Card size="large" elevation={1} header={<Typography variant="subtitle1">{t('Borrowed aUSD')}</Typography>}>
                    <List>
                        <ListItem disableGutters>
                            <ListItemText classes={listItemClasses} primary={t('Can Pay Back')} secondary={t('{{number}} {{asset}}', { number: 100, asset: 'aUSD' })} />
                            <Button classes={buttonClasses} variant="contained" color="primary">{t('Payback')}</Button>
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText classes={listItemClasses} primary={t('Can Generate')} secondary={t('{{number}} {{asset}}', { number: 100, asset: 'aUSD' })} />
                            <Button classes={buttonClasses}variant="contained" color="primary">{t('Generate')}</Button>
                        </ListItem>
                    </List>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card size="large" elevation={1} header={<Typography variant="subtitle1">{t('Collateral {{asset}}', { asset: getAssetName(asset) })}</Typography>}>
                    <List>
                        <ListItem disableGutters>
                            <ListItemText classes={listItemClasses} primary={t('Required for Safety')} secondary={t('{{number}} {{asset}}', { number: 100, asset: 'ETH' })} />
                            <Button classes={buttonClasses} variant="contained" color="primary">{t('Deposit')}</Button>
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText classes={listItemClasses} primary={t('Able to Withdraw')} secondary={t('{{number}} {{asset}}', { number: 100, asset: 'ETH' })} />
                            <Button classes={buttonClasses} variant="contained" color="primary">{t('Withdraw')}</Button>
                        </ListItem>
                    </List>
                </Card>
            </Grid>
        </Grid>
    );
};

export default VaultPanel;