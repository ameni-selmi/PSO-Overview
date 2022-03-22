// material
import {  Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function Blog() {
  
  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Variants
          </Typography>
          
        </Stack>
          <Box justifyContent="space-between" mb={5}>
            <h4 id="h-variants-of-pso">
              <strong>Variants of PSO</strong>
            </h4>
            <img width="30%" alt="function" src="/static/pso.png"   style={{ marginLeft: '17rem', marginBottom: '5.8rem' }} />

            <p>
              Even a simple PSO algorithm can have a lot of different variations. There
              are various ways to initialize the particles and velocities (for example,
              start with zero velocities), only update P<sub>i</sub> and G after the
              entire swarm has been updated, and so on.
            </p>
            <h6 id="h-gradient-pso">
              <strong>
                <em>Gradient PSO</em>
              </strong>
            </h6>
            <p>
              To construct gradient-based PSO algorithms, the ability of the PSO algorithm
              to efficiently explore many local minimums can be combined with the ability
              of gradient-based local search algorithms to effectively calculate an
              accurate local minimum.&nbsp;
            </p>
            <p>
              The PSO algorithm is used in gradient-based PSO algorithms to explore
              several local minima and discover a location in the basin of attraction of a
              deep local minimum. The deep local minimum is then properly located using
              efficient gradient-based local search techniques.
            </p>
            <h6 id="h-hybrid-pso">
              <strong>
                <em>Hybrid PSO</em>
              </strong>
            </h6>
            <p>
              In order to increase optimization performance, new and more advanced PSO
              variations are being introduced. There are certain developments in that
              study, such as developing a hybrid optimization approach that combines PSO
              with other optimizers, such as combining PSO with biogeography-based
              optimization and including an effective learning mechanism.
            </p>
          </Box>
      </Container>
    </Page>
  );
}
