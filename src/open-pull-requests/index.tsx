import React, { FC, ReactElement, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { RefreshOutlined } from '@mui/icons-material';
import {
  Avatar,
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  colors,
  Container,
  darken,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';

import { IPullRequestView } from '../types/PullRequest.interface';
import { getPullRequests } from '../utils/api';

const OpenPullRequests: FC = () => {
  const [loading, setLoading] = useState(true);
  const [prs, setPrs] = useState<IPullRequestView[]>([]);

  const loadPRs = async (): Promise<void> => {
    setLoading(true);

    const response = await getPullRequests({});

    setPrs(response);
    setLoading(false);
  };

  useEffect(() => {
    void loadPRs();
  }, []);

  return (
    <Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container alignItems="stretch" justifyContent="space-between">
        <Grid item xs={10} sx={{ padding: '2rem 1rem 1rem 1rem' }}>
          <Typography variant="h2">Pull Requests</Typography>
        </Grid>
        <Grid item alignSelf="center">
          <IconButton onClick={loadPRs}>
            <RefreshOutlined sx={{ fontSize: 40 }} />
          </IconButton>
        </Grid>
        {prs.map((pr) => (
          <Grid item xs={4} sx={{ padding: 1 }} key={pr.title}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardHeader
                avatar={<Avatar alt={pr.user.login} src={pr.user.avatar} />}
                title={<Typography variant="subtitle1">{pr.title}</Typography>}
                subheader={pr.created_at}
              />
              <CardContent
                sx={{
                  flex: 1,
                  backgroundColor: darken(colors.grey['900'], 0.3),
                }}
              >
                <ReactMarkdown
                  children={pr.body}
                  components={{
                    h1: ({ children }): ReactElement => (
                      <Typography variant="h4">{children}</Typography>
                    ),
                    h2: ({ children }): ReactElement => (
                      <Typography variant="h5">{children}</Typography>
                    ),
                    h3: ({ children }): ReactElement => (
                      <Typography variant="h6">{children}</Typography>
                    ),
                    p: ({ children }): ReactElement => (
                      <Typography variant="body1">{children}</Typography>
                    ),
                    ul: ({ children }): ReactElement => <List>{children}</List>,
                    li: ({ children }): ReactElement => {
                      const text: string = `${children[0]}`;

                      if (text[0] === '[')
                        return (
                          <ListItem>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={text[1] !== ' '}
                                  disableRipple
                                />
                              }
                              label={text.slice(3)}
                            />
                          </ListItem>
                        );
                      else return <ListItem>{text}</ListItem>;
                    },
                    a: ({ children, href }): ReactElement => (
                      <Button href={href || '#'} target="_blank">
                        {children}
                      </Button>
                    ),
                  }}
                />
              </CardContent>
              <CardActions disableSpacing sx={{ marginTop: 'auto' }}>
                <Button href={pr.url} target="_blank">
                  Revisar Pull Request
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OpenPullRequests;
