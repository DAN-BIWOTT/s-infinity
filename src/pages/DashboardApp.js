// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const userData = useSelector((state)=>state.userData);
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Welcome back, {userData.firstName}</Typography>
        </Box>
        <Grid container spacing={3}>
        
          <Grid item xs={12} md={12} lg={12}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppTasks />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
