import { useState } from 'react';
import axios from "axios" ;
import ReactApexChart from 'react-apexcharts';
// material
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Box, 
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack,
  Container,
  Modal,
  AlertTitle,
  Grid
} from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function User() {

  const [fn, setfn] = useState(null);
  const [tableData, setTableData] = useState({ c1: 0.2 , c2:0.3, w:0.9, dim:2, npart:10, iters:10});
  const [result, setResult] = useState(null);
  const [openCost, setOpenCost] = useState(false);
  const [openPos, setOpenPos] = useState(false);
  const [series, setSeries] = useState(null);
  const [seriesh, setSeriesh] = useState(null);
  const [options, setOptions] = useState(null);
  const [optionsh, setOptionsh] = useState(null);
  const [series1, setSeries1] = useState(null);
  const [options1, setOptions1] = useState(null);
  const [series1h, setSeries1h] = useState(null);
  const [options1h, setOptions1h] = useState(null);
  
  const handleOpenCost = () => setOpenCost(true);
  const handleCloseCost = () => setOpenCost(false);
  const handleOpenPos = () => setOpenPos(true);
  const handleClosePos = () => setOpenPos(false);
  
  
    
  const handleChange = (event) => {
    const data = tableData
    data.fx= event.target.value
    axios
      .post('http://127.0.0.1:5000/send', data)
      .then((res)=>{

          setResult(res.data)
          const a=JSON.parse(res.data.cost_history)
          const ah=JSON.parse(res.data.cost_h_history)
         
              setSeries([{
                name: "Cost",
                data: a
            }])
              setSeriesh([{
                name: "Cost",
                data: ah
            }])
  
            setOptions(
              {
              chart: {
                height: 350,
                type: 'line',
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight'
              },
              title: {
                text: 'Cost History without inertia decay',
                align: 'left'
              },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              xaxis: {
                categories: Array.from(Array(a.length).keys()),
              },
              yaxis:{
                decimalsInFloat: 2
              }
            },
          )
            setOptionsh(
              {
              chart: {
                height: 350,
                type: 'line',
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight'
              },
              title: {
                text: 'Cost History with inertia decay',
                align: 'left'
              },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              xaxis: {
                categories: Array.from(Array(a.length).keys()),
              },
              yaxis:{
                decimalsInFloat: 2
              }
            },
          )
  
          setSeries1([{
            name: "position",
            data: JSON.parse( res.data.pos_history)
          }])
  
          setOptions1({
            chart: {
              height: 350,
              type: 'scatter',
              zoom: {
                enabled: true,
                type: 'xy'
              }
            },
            xaxis: { 
              floating: true,
            },
            yaxis: { 
              decimalsInFloat: 2
            },
            title: {
              text: 'Animating swarms without inertia decay',
              align: 'left'
            },
          })
  
          setSeries1h([{
            name: "position",
            data: JSON.parse( res.data.pos_h_history)
          }])
  
          setOptions1h({
            chart: {
              height: 350,
              type: 'scatter',
              zoom: {
                enabled: true,
                type: 'xy'
              }
            },
            xaxis: { 
              floating: true,
            },
            yaxis: { 
              decimalsInFloat: 2
            },
            title: {
              text: 'Animating swarms with inertia decay ',
              align: 'left'
            },
          })    
      setfn(event.target.value)
      })
      .catch((err)=>{
          console.log(err)
      });
  }
  
  const handleChangeTable = ({ target: { name, value } }) => {
    setTableData({ ...tableData, hasChanged: true, [name]: value });
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%' ,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Benchmark
          </Typography>
          
        </Stack>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Benchmark function</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={fn}
                  label="Benchmark function"
                  onChange={ handleChange}
                >
                  <MenuItem value='fx.ackley'>Ackley’s</MenuItem>
                  <MenuItem value='fx.beale'>Beale</MenuItem>
                  <MenuItem value='fx.booth'>Booth</MenuItem>
                  {/* <MenuItem value='fx.bukin6'>Bukin’s No 6</MenuItem> */}
                  <MenuItem value='fx.crossintray'>Cross-in-Tray</MenuItem>
                  <MenuItem value='fx.easom'>Easom</MenuItem>
                  <MenuItem value='fx.eggholder'>Eggholder</MenuItem>
                  {/* <MenuItem value='fx.goldstein'>Goldstein</MenuItem> */}
                  <MenuItem value='fx.himmelblau'>Himmelblau’s</MenuItem>
                  <MenuItem value='fx.holdertable'>Holder Table</MenuItem>
                  <MenuItem value='fx.levi'>Levi</MenuItem>
                  <MenuItem value='fx.matyas'>Matyas</MenuItem>
                  <MenuItem value='fx.rastrigin'>Rastrigin</MenuItem>
                  <MenuItem value='fx.rosenbrock'>Rosenbrock</MenuItem>
                  <MenuItem value='fx.schaffer2'>Schaffer No 2</MenuItem>
                  <MenuItem value='fx.sphere'>Sphere</MenuItem>
                  <MenuItem value='fx.threehump'>Three Hump Camel</MenuItem>
                </Select>
              </FormControl>
            </Box>
          <TableContainer >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>hyperparameters</TableCell>
                  <TableCell>instance of PSO</TableCell>
                  <TableCell>Iterations</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow>
                    <TableCell style={{width:"40%"}}> 
                      <TextField type='number' value={tableData.c1} onChange={handleChangeTable} id="standard-basic" 
                        name="c1" label="Cognition learning rate(c1)" variant="standard" /> 
                      <TextField type='number' value={tableData.c2} onChange={handleChangeTable} id="standard-basic" 
                      name="c2" label="Social learning rate(c2)" variant="standard" /> 
                      <TextField type='number' value={tableData.w} onChange={handleChangeTable} id="standard-basic" 
                      name="w" label="Inertia weightw(w)" variant="standard" /> 
                    </TableCell>
                    <TableCell>
                      <TextField type='number' value={tableData.npart} onChange={handleChangeTable} id="standard-basic" 
                      name="npart" label="number of particles" variant="standard" /> 
                      <TextField type='number' value={tableData.dim} onChange={handleChangeTable} id="standard-basic" 
                      name="dim" label="dimensions" variant="standard" />  
                    </TableCell>
                    <TableCell>
                      <TextField type='number' value={tableData.iters} onChange={handleChangeTable} id="standard-basic" 
                        name="iters" label="Iterations" variant="standard" />  
                    </TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

            {fn==='fx.ackley'&&(
              <>
                <img width="50%" alt="function" src="/static/ackley.png" style={{ marginLeft: '11rem', marginBottom: '3rem' }}  />
              
              </>
            )}
            {fn==='fx.beale'&&(
              <>
                <img width="50%" alt="function" src="/static/beale.png" style={{ marginLeft: '11rem', marginBottom: '3rem' }}  />
              </>
            )}
            {fn==='fx.booth'&&(
               <>
               <img width="50%" alt="function" src="/static/booth.png" style={{ marginLeft: '11rem', marginBottom: '3rem' }}  />
             </>
            )}
            {fn==='fx.bukin6'&&(
               <>
               <img width="50%" alt="function" src="/static/bukin6.png" style={{ marginLeft: '11rem', marginBottom: '3rem' }}  />
             </>
            )}
            {fn==='fx.crossintray'&&(
               <>
               <img width="50%" alt="function" src="/static/crossintray.png" style={{ marginLeft: '11rem', marginBottom: '3rem' }}  />
             </>
            )}
            {fn==='fx.easom'&&(
               <>
               <img width="50%" alt="function" src="/static/easom.png" style={{ marginLeft: '11rem', marginBottom: '3rem' }}  />
             </>
            )}
            {fn==='fx.eggholder'&&(
               <>
               <img width="50%" alt="function" src="/static/eggholder.png" style={{ marginLeft: '11rem', marginBottom: '3rem' }}  />
             </>
            )}
            {fn==='fx.goldstein'&&(
               <>
               <img width="50%" alt="function" src="/static/goldstrein.png" style={{ marginLeft: '11rem', marginBottom: '3rem' }}  />
             </>
            )}
            {fn==='fx.himmelblau'&&(
               <>
               <img width="50%" alt="function" src="/static/himmelblau.png" style={{ marginLeft: '11rem', marginBottom: '3rem' }}  />
             </>
            )}
            {fn==='fx.holdertable'&&(
               <>
               <img width="50%" alt="function" src="/static/holdertable.png" style={{ marginLeft: '11rem', marginBottom: '3rem' }}  />
             </>
            )}
            {fn==='fx.levi'&&(
               <>
               <img width="50%" alt="function" src="/static/levi.png" style={{ marginLeft: '11rem', marginBottom: '3rem' }}  />
             </>
            )}
            {fn==='fx.matyas'&&( <>
                <img width="50%" alt="function" src="/static/matyas.png" style={{ marginLeft: '11rem', marginBottom: '3rem' }}  />
              </>
            )}
            {fn==='fx.rastrigin'&&(
               <>
               <img width="50%" alt="function" src="/static/rastrigin.png" style={{ marginLeft: '11rem', marginBottom: '3rem' }}  />
             </>
            )}
            {fn==='fx.rosenbrock'&&(
               <>
               <img width="50%" alt="function" src="/static/rosenbrock.png" style={{ marginLeft: '11rem', marginBottom: '3rem' }}  />
             </>
            )}
            {fn==='fx.schaffer2'&&(
               <>
               <img width="50%" alt="function" src="/static/schaffer2.png" style={{ marginLeft: '11rem', marginBottom: '3rem' }}  />
             </>
            )}
            {fn==='fx.sphere'&&(
               <>
               <img width="50%" alt="function" src="/static/sphere.png" style={{ marginLeft: '11rem', marginBottom: '3rem' }}  />
             </>
            )}
            {fn==='fx.threehump'&&(
               <>
               <img width="50%" alt="function" src="/static/threehump.png" style={{ marginLeft: '11rem', marginBottom: '3rem' }}  />
             </>
            )}
            {fn!== null&&(
              
              <>

                <InputLabel>Cost = {result.cost}</InputLabel>
                <Button onClick={handleOpenCost}>Open Cost history</Button>
                <Modal style={{ overflow: 'scroll' }}
                  open={openCost}
                  onClose={handleCloseCost}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Cost history
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {result.cost_history}
                    </Typography>
                  </Box>
                </Modal>

                <InputLabel>Pos = {result.pos}</InputLabel>
                <Button onClick={handleOpenPos}>Open Pos history</Button>
                <Modal
                  open={openPos}
                  onClose={handleClosePos}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Pos history
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {result.pos_history}
                    </Typography>
                  </Box>
                </Modal>
                <Grid container spacing={3}>  
                <Grid item xs={12} md={6} lg={6}>
                  <h2>Comparing the cost history</h2>
                    <div id="chart">
                    <ReactApexChart options={options} series={series} type="line" height={350} />
                    </div> 
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                <br/>
                    <div id="chart">
                    <ReactApexChart options={optionsh} series={seriesh} type="line" height={350} />
                    </div>  
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <h2>Comparing the convergence</h2>
                  <div id="chart">
                    <ReactApexChart options={options1} series={series1} type="scatter" height={350} />
                  </div>                    
                 </Grid>
                <Grid item xs={12} md={6} lg={6}>
                <br/>
                  <div id="chart">
                    <ReactApexChart options={options1h} series={series1h} type="scatter" height={350} />
                  </div>                    
                </Grid>
              </Grid>
                

         </>
            )}
      </Container>
    </Page>
  );
  
}
