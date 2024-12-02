import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
    const theme = useTheme();
    const [numTickets, setNumTickets] = useState(0);
    const [numUsers, setNumUsers] = useState(0);
    const [numCategories, setNumCategories] = useState(0);
    const [numCompanies, setNumCompanies] = useState(0);

    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    useEffect(() => {
        fetch("http://localhost:8080/dashboard/app/users", { headers })
            .then((response) => response.json())
            .then((data) => setNumUsers(data || "0"));
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/dashboard/app/tickets", { headers })
            .then((response) => response.json())
            .then((data) => setNumTickets(data || "0"));
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/dashboard/app/categories", { headers })
            .then((response) => response.json())
            .then((data) => setNumCategories(data || "0"));
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/dashboard/app/companies", { headers })
            .then((response) => response.json())
            .then((data) => setNumCompanies(data || "0"));
    }, []);

  return (
    <>
      <Helmet>
        <title> Strona główna | MailZen </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Witaj ponownie {localStorage.getItem('email')}!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Zgłoszenia" total={numTickets} icon={'ant-design:mail-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Użytkownicy" total={numUsers} color="info" icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Kategorie" total={numCategories} color="warning" icon={'ant-design:tags-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Firmy" total={numCompanies} color="error" icon={'ant-design:team-outlined'} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
